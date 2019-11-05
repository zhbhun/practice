import dayjs from 'dayjs';
import { format } from 'timeago.js';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as apis from '../services/apis';
import useLists from '../hooks/useLists';

const TouchableNativie = Platform.OS === 'ios' ? TouchableOpacity : TouchableHighlight;
const keyExtractor = (item, index) => item.id;
const ListItem = ({ data, onOpenDetail, onOpenAuthor }) => (
  <View style={styles.listItem}>
    <TouchableWithoutFeedback onPress={onOpenDetail}>
      <View style={styles.listItemMain}>
        <View style={styles.listItemHeader}>
          <View style={styles.listItemBadge}>
            <Text style={styles.listItemBadgeText}>置顶</Text>
          </View>
          <Text style={styles.listItemStat}>
            <Text style={styles.listItemStatReply}>{data.reply_count || 0}</Text>
            <Text>{' / '}</Text>
            <Text>{data.visit_count || 0}</Text>
            <Text>{` . ${format(data.last_reply_at, 'zh_CN')}`}</Text>
          </Text>
        </View>
        <Text style={styles.listItemTitle}>{data.title}</Text>
        <Text
          numberOfLines={4}
          style={styles.listItemContent}
        >
          {(data.content || '').replace(/<[^>]+>/gi, '').replace(/\n/g, ' ')}
        </Text>
      </View>
    </TouchableWithoutFeedback>
    <View style={styles.listItemDivider} />
    <TouchableWithoutFeedback onPress={onOpenAuthor}>
      <View style={styles.listItemAuthor}>
        <View style={styles.listItemAuthorInfo}>
          <Image
            source={{ uri: data.author.avatar_url }}
            style={styles.listItemAuthorAvatar}
          />
          <Text style={styles.listItemAuthorName}>{data.author.loginname}</Text>
        </View>
        <Text style={styles.listItemAuthorTime}>
          {`创建于：${dayjs(data.create_at).format('YYYY-MM-DD HH:mm:ss')}`}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  </View>
);
const HomeScreen = ({ navigation }) => {
  const tab = navigation.getParam('tab') || 'all';

  const flatList = useRef(null);

  useEffect(() => {
    flatList.current.scrollToOffset({ offset: 0, animated: false });
  }, [tab]);

  const [
    listState,
    refresh,
    refreshControl,
    loadMore,
    loader,
  ] = useLists(useCallback(
    (page) => {
      return apis.loadTopicList(tab, page, 15);
    },
    [tab],
  ));

  const renderItem = useCallback(({ item }) => (
    <ListItem
      data={item}
      onOpenDetail={() => navigation.push('Detail', { id: item.id })}
      onOpenAuthor={() => navigation.push('User', { id: item.author.loginname })}
    />
  ), []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatList}
        data={listState.data}
        keyExtractor={keyExtractor}
        initialNumToRender={5}
        onEndReached={loadMore}
        ListFooterComponent={loader}
        refreshControl={refreshControl}
        refreshing={listState.refreshing}
        removeClippedSubviews
        renderItem={renderItem}
        style={styles.flatList}
      />
    </View>
  );
};
HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'CNode 社区',
    headerLeft: () => (
      <View style={{ marginHorizontal: 8, width: 30, borderRadius: 15, overflow: 'hidden', justifyContent: 'center' }}>
        <TouchableNativie onPress={() => navigation.openDrawer()} style={[{ alignItems: 'center' }]} underlayColor="#eee">
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
            size={26}
          />
        </TouchableNativie>
      </View>
    ),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  flatList: {
    flex: 1,
  },
  listItem: {
    elevation: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  listItemMain: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemBadge: {
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: Colors.accentColor,
  },
  listItemBadgeText: {
    color: Colors.textPrimaryColor,
    fontSize: 13,
  },
  listItemStat: {
    color: Colors.secondaryTextColor,
    fontSize: 12,
  },
  listItemStatReply: {
    color: Colors.accentColor,
  },
  listItemTitle: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 24,
    color: Colors.primaryTextColor,
  },
  listItemContent: {
    color: Colors.secondaryTextColor,
  },
  listItemDivider: {
    marginHorizontal: 15,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.dividerColor,
  },
  listItemAuthor: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemAuthorAvatar: {
    marginRight: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  listItemAuthorName: {
    color: Colors.primaryTextColor,
  },
  listItemAuthorTime: {
    color: Colors.secondaryTextColor,
    fontSize: 12,
  },
});

export default HomeScreen;
