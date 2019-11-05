import { format } from 'timeago.js';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { Ionicons } from '@expo/vector-icons';
import HTMLView from 'react-native-htmlview';
import Colors from '../constants/Colors';
import * as apis from '../services/apis';
import useDetail from '../hooks/useDetail';

const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md';

const DetailScreen = ({ navigation }) => {
  const id = navigation.getParam('id');
  const api = useCallback(() => apis.loadTopicDetail(id), [id]);
  const [state, setState, refresh, refreshControl] = useDetail(api);
  const handeCollect = useCallback(async () => {
    try {
      await apis.collectTopic(state.data.id, !state.data.is_collect);
      setState({
        ...state,
        data: {
          ...state.data,
          is_collect: !state.data.is_collect,
        },
      });
    } catch (error) {
      Toast.show(`${state.data.is_collect ? '取消' : ''}收藏失败～`);
    }
  }, [state]);
  const handeReplyLike = useCallback(async (item, index) => {
    try {
      await apis.likeReply(item.id);
      const newReplies = state.data.replies.slice(0);
      newReplies[index] = {
        ...item,
        is_uped: !item.is_uped,
        ups: [
          ...item.ups,
          Date.now(),
        ],
      };
      setState({
        ...state,
        data: {
          ...state.data,
          replies: newReplies,
        },
      });
    } catch (error) {
      Toast.show(`${state.data.is_collect ? '取消' : ''}点赞失败～`);
    }
  }, [state]);

  let body = null;
  if (state.data) {
    const {
      title,
      author,
      create_at,
      visit_count,
      is_collect,
      content,
      reply_count,
      replies,
    } = state.data;
    let reply = null;
    if (replies && replies.length > 0) {
      reply = (
        <View style={styles.replyLists}>
          <View style={styles.replyListsHeader}>
            <Text style={styles.replyListsTitle}>
              {`${replies.length}条回复`}
            </Text>
          </View>
          {replies.map((item, index) => (
            <View key={item.id} style={styles.replyItem}>
              <View style={styles.replyItemHeader}>
                <View style={styles.replyItemAuthor}>
                  <Image
                    source={{ uri: item.author.avatar_url }}
                    style={styles.replyItemAvatar}
                  />
                  <View style={styles.replyItemInfo}>
                    <Text style={styles.replyItemName}>
                      {item.author.loginname}
                    </Text>
                    <Text style={styles.replyItemTime}>
                      <Text style={styles.replyItemFloor}>
                        {`${index + 1}楼`}
                      </Text>
                      <Text>.</Text>
                      <Text>{format(item.create_at, 'zh_CN')}</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.replyItemAction}>
                  <TouchableOpacity
                    onPress={() => handeReplyLike(item, index)}
                    style={styles.replyItemActionBtn}
                  >
                    <Text>
                      <Ionicons
                        name={`${iconPrefix}-thumbs-up`}
                        size={26}
                        color={
                          item.is_uped ?
                            Colors.accentColor :
                            Colors.secondaryTextColor
                        }
                      />
                      {
                        item.ups && item.ups.length > 0 ?
                          <Text style={styles.replyItemUpCount}>
                            {` ${item.ups.length}`}
                          </Text> :
                          null
                      }
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.replyItemActionBtn}>
                    <Ionicons
                      name={Platform.OS === 'ios' ? 'ios-share-alt' : 'md-share-alt'}
                      size={26}
                      color={Colors.secondaryTextColor}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <HTMLView addLineBreaks={false} value={item.content} />
            </View>
          ))}
        </View>
      );
    }
    body = (
      <Fragment>
        <View style={styles.main}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.authorWrapper}>
            <View style={styles.author}>
              <Image
                source={{ uri: author.avatar_url }}
                style={styles.authorAvatar}
              />
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{author.loginname}</Text>
                <Text style={styles.authorTime}>
                  <Text>{`${format(create_at, 'zh_CN')}创建`}</Text>
                  <Text>・</Text>
                  <Text>{`${visit_count}次浏览`}</Text>
                </Text>
              </View>
            </View>
            <TouchableHighlight
              onPress={handeCollect}
              style={styles.collectBtn}
              underlayColor="#ddd"
            >
              <Ionicons
                name={
                  is_collect ?
                    `${iconPrefix}-heart` :
                    `${iconPrefix}-heart-empty`
                }
                size={26}
                color={
                  is_collect ? Colors.accentColor : Colors.secondaryTextColor
                }
              />
            </TouchableHighlight>
          </View>
          <HTMLView value={content} />
        </View>
        {reply}
        <View></View>
      </Fragment>
    );
  }

  return (
    <ScrollView
      refreshControl={refreshControl}
      style={styles.container}
    >
      {body}

    </ScrollView>
  );
}

DetailScreen.navigationOptions = {
  title: '话题',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  main: {
    elevation: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 10,
    color: Colors.primaryTextColor,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  authorWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorInfo: {
    justifyContent: 'center',
  },
  authorName: {
    marginBottom: 4,
    color: Colors.primaryTextColor,
  },
  authorTime: {
    color: Colors.secondaryTextColor,
  },
  collectBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  content: {
    color: Colors.primaryTextColor,
    fontSize: 16,
  },
  replyLists: {
    marginBottom: 10,
    elevation: 6,
    backgroundColor: '#fff',
  },
  replyListsHeader: {
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 15,
  },
  replyListsTitle: {
    color: Colors.primaryTextColor,
    lineHeight: 50,
  },
  replyItem: {
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  replyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  replyItemAuthor: {
    flexDirection: 'row',
  },
  replyItemAvatar: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 22,
  },
  replyItemInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  replyItemName: {
    marginBottom: 5,
    color: Colors.primaryTextColor,
    fontSize: 13,
  },
  replyItemTime: {
    color: Colors.secondaryTextColor,
    fontSize: 13,
  },
  replyItemFloor: {
    color: Colors.accentColor,
  },
  replyItemAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyItemActionBtn: {
    paddingHorizontal: 3,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  replyItemUpCount: {
    color: Colors.secondaryTextColor,
    lineHeight: 26,
    textAlignVertical: 'center',
  },
});

export default DetailScreen;
