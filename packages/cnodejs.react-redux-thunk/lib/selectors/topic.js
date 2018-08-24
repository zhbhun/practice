'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isReplyLiking = exports.getReplyLike = exports.getReplyLikeState = exports.isCollecting = exports.getCollect = exports.getCollectState = exports.isDetailLoading = exports.getDetailError = exports.getDetail = exports.getDetailState = exports.getListData = exports.getListPage = exports.getListLoadingPage = exports.isListLoading = exports.getListError = exports.hasListMore = exports.getList = exports.getLists = exports.getState = undefined;

var _topic = require('../reducers/topic');

var getState = exports.getState = function getState(state) {
  return state.topic;
};

// 列表
var getLists = exports.getLists = function getLists(state) {
  return getState(state).list;
};
var getList = exports.getList = function getList(state, tab) {
  return getLists(state)[tab] || _topic.defaultState.list;
};
var hasListMore = exports.hasListMore = function hasListMore(state, tab) {
  return getList(state, tab).hasMore;
};
var getListError = exports.getListError = function getListError(state, tab) {
  return getList(state, tab).error;
};
var isListLoading = exports.isListLoading = function isListLoading(state, tab) {
  return getList(state, tab).loading;
};
var getListLoadingPage = exports.getListLoadingPage = function getListLoadingPage(state, tab) {
  return getList(state, tab).loadingPage;
};
var getListPage = exports.getListPage = function getListPage(state, tab) {
  return getList(state, tab).page;
};
var getListData = exports.getListData = function getListData(state, tab) {
  return getList(state, tab).data;
};

// 详情
var getDetailState = exports.getDetailState = function getDetailState(state) {
  return getState(state).detail;
};
var getDetail = exports.getDetail = function getDetail(state, id) {
  return getDetailState(state)[id] || _topic.defaultState.detail;
};
var getDetailError = exports.getDetailError = function getDetailError(state, id) {
  return getDetail(state, id).error;
};
var isDetailLoading = exports.isDetailLoading = function isDetailLoading(state, id) {
  return getDetail(state, id).loading;
};

// 收藏
var getCollectState = exports.getCollectState = function getCollectState(state) {
  return getState(state).collect;
};
var getCollect = exports.getCollect = function getCollect(state, id) {
  return getCollectState(state)[id] || _topic.defaultState.collect;
};
var isCollecting = exports.isCollecting = function isCollecting(state, id) {
  return getCollect(state, id).loading;
};

// 评论点赞
var getReplyLikeState = exports.getReplyLikeState = function getReplyLikeState(state) {
  return getState(state).replyLike;
};
var getReplyLike = exports.getReplyLike = function getReplyLike(state, id) {
  return getReplyLikeState(state)[id] || _topic.defaultState.replyLike;
};
var isReplyLiking = exports.isReplyLiking = function isReplyLiking(state, id) {
  return getReplyLike(state, id).loading;
};