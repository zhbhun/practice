import dayjs from 'dayjs';
import { format } from 'timeago.js';
import React, {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import Colors from '../constants/Colors';
import * as apis from '../services/apis';
import useDetail from '../hooks/useDetail';

const headerHeight = 200;
const tabHeight = 46;
const keyExtractor = (item, index) => item.id;
const renderTopic = ({ item }) => (
  <TouchableHighlight underlayColor="#e5e5e5">
    <View style={styles.topic}>
      <Image source={{ uri: item.author.avatar_url }} style={styles.topicAvatar} />
      <View style={styles.topicContent}>
        <Text numberOfLines={1} style={styles.topicTitle}>{item.title}</Text>
        <View style={styles.topicAuthor}>
          <Text style={styles.topicAuthorName}>{item.author.loginname}</Text>
          <Text style={styles.topicAuthorTime}>
            {format(item.last_reply_at, 'zh_CN')}
          </Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

const TopicLists = props => {
  const { edgeHeight, scrollTop, onOpenTopic } = props;
  const propsRef = useRef(props);
  const flatList = useRef(null);
  const activeOffset = useRef(null);
  const currOffset = useRef(null)

  useEffect(() => {
    propsRef.current = props;
  }, [props]);
  useEffect(() => {
    const listener = scrollTop.addListener(({ value }) => {
      if (propsRef.current.index !== propsRef.current.id) {
        const absValue = Math.abs(value);
        if (absValue < edgeHeight) {
          activeOffset.current = absValue;
        } else {
          activeOffset.current = edgeHeight;
        }
      }
    });
    return () => {
      scrollTop.removeListener(listener);
    };
  }, [scrollTop]);
  useEffect(() => {
    if (propsRef.current.index === propsRef.current.id && activeOffset.current !== null) {
      let offset = null;
      if (!currOffset.current && !currOffset.current < edgeHeight) {
        offset = activeOffset.current;
      } else {
        if (activeOffset.current < edgeHeight) {
          offset = activeOffset.current;
        }
      }
      if (offset !== null) {
        flatList.current.scrollToOffset({
          offset: offset,
          animated: false,
        });
      }
    }
  }, [props.index]);
  const renderRow = useCallback(({ item }) => {
    return cloneElement(renderTopic({ item }), {
      onPress: () => onOpenTopic(item.id),
    });
  }, [onOpenTopic]);

  return (
    <FlatList
      {...props}
      ref={flatList}
      bounces={false}
      keyExtractor={keyExtractor}
      initialNumToRender={10}
      removeClippedSubviews
      renderItem={renderRow}
      style={styles.scene}
      contentContainerStyle={styles.sceneContent}
      showsVerticalScrollIndicator={false}
      onScroll={(event) => {
        const {
          contentInset,
          contentOffset,
          contentSize,
          layoutMeasurement,
        } = event.nativeEvent;
        currOffset.current = contentOffset.y;
        if (props.onScroll) {
          props.onScroll(event);
        }
      }}
    />
  );
}

const defaultState = {
  index: 0,
  routes: [
    { key: 'replies', title: '最近回复' },
    { key: 'topics', title: '最新发布' },
    { key: 'collections', title: '话题收藏' },
  ],
  width: Dimensions.get('window').width,
  height: 0,
};

function UserScreen({ navigation }) {
  const id = navigation.getParam('id');
  const navbarHeight = navigation.getParam('navbarHeight') || 66;
  const edgeHeight = headerHeight - navbarHeight;

  // 标签状态管理
  const tabRef = useRef(null);
  const [tab, setTab] = useState(defaultState);
  useEffect(() => {
    tabRef.current = tab;
  });
  const handleLayout = useCallback(event => {
    const { nativeEvent: { layout: { width, height}} } = event;
    setTab({
      ...tabRef.current,
      width,
      height,
    })
  });
  const handleTabIndexChange = useCallback(index => {
    setTab({ ...tabRef.current, index })
  });

  // 业务数据管理
  const dataApi = useCallback(() => {
    return Promise.all([
      apis.loadUserDetail(id),
      apis.loadUserCollections(id),
    ]).then(([data, collectTopics]) => {
      return {
        ...data,
        collect_topics: collectTopics,
      };
    });
  }, [id]);
  const [user] = useDetail(dataApi);

  const [scrollOffset] = useState(new Animated.Value(0));
  const openTopic = useCallback(topic => {
    navigation.push('Detail', { id: topic });
  }, [navigation]);
  const renderTabBar = useCallback(tabBarProps => (
    <Animated.View
      style={[
        styles.tabBar,
        {
          transform: [
            {
              translateY: scrollOffset,
            },
          ],
        },
      ]}
      useNativeDriver
    >
      <TabBar {...tabBarProps}/>
    </Animated.View>
  ), [scrollOffset]);
  const renderScene = useCallback(({ route, jumpTo }) => {
    const data = user.data || {};
    let id = '';
    let topics = [];
    switch (route.key) {
      case 'replies': {
        id = 'replies';
        topics = data.recent_replies;
        break;
      }
      case 'topics': {
        id = 'topics';
        topics = data.recent_topics;
        break;
      }
      case 'collections': {
        id = 'collections';
        topics = data.collect_topics;
        break;
      }
    }
    return (
      <TopicLists
        id={id}
        index={tab.routes[tab.index].key}
        data={topics || []}
        scrollTop={scrollOffset}
        onOpenTopic={openTopic}
        onScroll={(event) => {
          const {
            contentInset,
            contentOffset,
            contentSize,
            layoutMeasurement,
          } = event.nativeEvent;
          scrollOffset.setValue(-Math.min(contentOffset.y, edgeHeight));
        }}
        edgeHeight={edgeHeight}
      />
    );
  }, [openTopic, scrollOffset, tab, user]);
  useEffect(() => {
    navigation.setParams({ scrollTop: scrollOffset });
    const listener = scrollOffset.addListener(({ value }) => {
      const absValue = Math.abs(value);
      if (absValue < edgeHeight / 2) {
        navigation.setParams({ tintColor: '#fff' });
      } else {
        navigation.setParams({ tintColor: Colors.primaryTextColor });
      }
    });
    return () => {
      scrollOffset.removeListener(listener);
    };
  }, []);


  if (!user.data) {
    // TODO 加载中|加载失败...
    return null;
  }

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <TabView
        initialLayout={{
          width: tab.width,
          height: tab.height,
        }}
        navigationState={tab}
        onIndexChange={handleTabIndexChange}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
      />
      <Animated.View
        style={[
          styles.header,
          {
            transform: [
              {
                translateY: scrollOffset,
              },
            ],
          },
        ]}
        useNativeDriver
      >
        <ImageBackground
          source={require('../assets/images/user_bg_header.png')}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <Image
            source={{ uri: user.data.avatar_url }}
            style={styles.headerAvatar}
          />
          <Text style={styles.headerLoginame}>{user.data.loginname}</Text>
          <Text style={styles.headerGithub}>
            {`${user.data.githubUsername}@github.com`}
          </Text>
          <View style={styles.headerOthers}>
            <Text style={styles.headerTime}>
              {`注册时间：${dayjs(user.data.create_at).format('YYYY-MM-DD')}`}
            </Text>
            <Text style={styles.headerScore}>{`积分：${user.data.score}`}</Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: headerHeight,
  },
  headerBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerAvatar: {
    marginBottom: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  headerLoginame: {
    marginBottom: 5,
    fontSize: 16,
    color: '#fff',
  },
  headerGithub: {
    marginBottom: 5,
    fontSize: 16,
    color: Colors.secondaryTextColor,
  },
  headerOthers: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTime: {
    fontSize: 13,
    color: '#fff',
  },
  headerScore: {
    fontSize: 13,
    color: Colors.accentColor,
  },
  tabBar: {
    position: 'absolute',
    zIndex: 1000,
    top: headerHeight,
    left: 0,
    right: 0,
    backgroundColor: '#00f',
    opacity: 1,
  },
  scene: {
    flex: 1,
  },
  sceneContent: {
    minHeight: Dimensions.get('window').height + headerHeight - tabHeight,
    paddingTop: headerHeight + tabHeight,
  },
  topic: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  topicAvatar: {
    marginRight: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    marginBottom: 5,
    fontSize: 14,
    color: Colors.primaryTextColor,
  },
  topicAuthor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topicAuthorName: {
    fontSize: 12,
    color: Colors.secondaryTextColor,
  },
  topicAuthorTime: {
    fontSize: 12,
    color: Colors.secondaryTextColor,
  },
});

const HeaderBackground = ({ height = 66, scrollTop, ...props }) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    let listener = null;
    if (scrollTop !== undefined && scrollTop.addListener) {
      listener = scrollTop.addListener(({ value }) => {
        const absValue = Math.abs(value);
        const realHeight = headerHeight - height;
        if (absValue < realHeight) {
          opacity.setValue(absValue / realHeight);
        } else {
          opacity.setValue(1);
        }
      });
    }
    return () => {
      if (listener && scrollTop !== undefined && scrollTop.removeListener) {
        scrollTop.removeListener(listener);
      }
    };
  }, [height, scrollTop]);

  return (
    <Animated.View
      {...props}
      style={{
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        opacity,
      }}
      useNativeDriver
    />
  );
};

UserScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTintColor: navigation.getParam('tintColor') || '#fff',
    title: '',
    headerBackground: (
      <HeaderBackground
        onLayout={(event) => {
          navigation.setParams({
            navbarHeight: event.nativeEvent.layout.height,
          });
        }}
        height={navigation.getParam('navbarHeight')}
        scrollTop={navigation.getParam('scrollTop')}
      />
    ),
    headerTransparent: true,
  };
};

export default UserScreen;

