import { defaultState } from '../reducers/topic';

export const getState = state => state.topic;

// 列表
export const getLists = state => getState(state).list;
export const getList = (state, tab) =>
  getLists(state)[tab] || defaultState.list;
export const hasListMore = (state, tab) => getList(state, tab).hasMore;
export const getListError = (state, tab) => getList(state, tab).error;
export const isListLoading = (state, tab) => getList(state, tab).loading;
export const getListLoadingPage = (state, tab) =>
  getList(state, tab).loadingPage;
export const getListPage = (state, tab) => getList(state, tab).page;
export const getListData = (state, tab) => getList(state, tab).data;

// 详情
export const getDetailState = state => getState(state).detail;
export const getDetail = (state, id) =>
  getDetailState(state)[id] || defaultState.detail;
export const getDetailError = (state, id) => getDetail(state, id).error;
export const isDetailLoading = (state, id) => getDetail(state, id).loading;

// 收藏
export const getCollectState = state => getState(state).collect;
export const getCollect = (state, id) =>
  getCollectState(state)[id] || defaultState.collect;
export const isCollecting = (state, id) => getCollect(state, id).loading;

// 评论点赞
export const getReplyLikeState = state => getState(state).replyLike;
export const getReplyLike = (state, id) =>
  getReplyLikeState(state)[id] || defaultState.replyLike;
export const isReplyLiking = (state, id) => getReplyLike(state, id).loading;
