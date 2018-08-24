'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.likeReply = exports.collect = exports.loadListMore = exports.refreshList = exports.loadListIfNeed = exports.loadList = exports.loadDetailIfNeed = exports.refreshDetail = exports.loadDetail = undefined;

var _cnodejs = require('cnodejs.api');

var api = _interopRequireWildcard(_cnodejs);

var _schemas = require('../constants/schemas');

var schemas = _interopRequireWildcard(_schemas);

var _ActionTypes = require('../constants/ActionTypes');

var ActionTypes = _interopRequireWildcard(_ActionTypes);

var _entities = require('../selectors/entities');

var entitiesSelectors = _interopRequireWildcard(_entities);

var _topic = require('../selectors/topic');

var topicSelectors = _interopRequireWildcard(_topic);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var loadDetail = exports.loadDetail = function loadDetail(id) {
  return function (dispatch, getState) {
    if (!topicSelectors.isDetailLoading(getState(), id)) {
      dispatch({ type: ActionTypes.TOPIC_LOAD_REQUEST, meta: { id: id } });
      api.loadTopicDetail(id).then(function (data) {
        dispatch({
          type: ActionTypes.TOPIC_LOAD_SUCCESS,
          payload: schemas.createTopic(data),
          meta: { id: id }
        });
      }).catch(function (error) {
        dispatch({
          type: ActionTypes.TOPIC_LOAD_FAILURE,
          payload: error,
          meta: {
            id: id,
            toast: error.message
          }
        });
      });
    }
  };
};

var refreshDetail = exports.refreshDetail = loadDetail;

var loadDetailIfNeed = exports.loadDetailIfNeed = function loadDetailIfNeed(id) {
  return function (dispatch, getState) {
    var topic = entitiesSelectors.getTopic(getState(), id);
    if (!topic || !topic.replies) {
      dispatch(loadDetail(id));
    }
  };
};

var loadList = exports.loadList = function loadList() {
  var tab = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
  var page = arguments[1];
  return function (dispatch, getState) {
    // 下拉刷新或者分页加载
    if (page === 1 || !topicSelectors.isListLoading(getState(), tab)) {
      dispatch({ type: ActionTypes.TOPICS_LOAD_REQUEST, meta: { tab: tab, page: page } });
      api.loadTopicList(tab, page, 15).then(function (data) {
        var loadingPage = topicSelectors.getListLoadingPage(getState(), tab);
        if (loadingPage === page) {
          if (!data || data.length === 0) {
            dispatch({
              type: ActionTypes.TOPICS_LOAD_SUCCESS,
              payload: schemas.createTopics([]),
              meta: {
                tab: tab,
                page: page,
                hasMore: false
              }
            });
          } else {
            dispatch({
              type: ActionTypes.TOPICS_LOAD_SUCCESS,
              payload: schemas.createTopics(data),
              meta: {
                tab: tab,
                page: page,
                hasMore: true
              }
            });
          }
        }
      }).catch(function (error) {
        var loadingPage = topicSelectors.getListLoadingPage(getState(), tab);
        if (loadingPage === page) {
          dispatch({
            type: ActionTypes.TOPICS_LOAD_FAILURE,
            payload: error,
            meta: {
              tab: tab,
              toast: error.message
            }
          });
        }
      });
    }
  };
};

var loadListIfNeed = exports.loadListIfNeed = function loadListIfNeed(tab) {
  return function (dispatch, getState) {
    var topics = topicSelectors.getListData(getState(), tab);
    if (!topics || topics.length === 0) {
      dispatch(loadList(tab, 1));
    }
  };
};

var refreshList = exports.refreshList = function refreshList(tab) {
  return function (dispatch) {
    return dispatch(loadList(tab, 1));
  };
};

var loadListMore = exports.loadListMore = function loadListMore(tab) {
  return function (dispatch, getState) {
    dispatch(loadList(tab, topicSelectors.getListPage(getState(), tab) + 1));
  };
};

var collect = exports.collect = function collect(id) {
  return function (dispatch, getState) {
    if (!topicSelectors.isCollecting(getState(), id)) {
      var topic = entitiesSelectors.getTopic(getState(), id);
      var failMessage = topic.is_collect ? '取消收藏失败' : '收藏失败';
      dispatch({
        type: ActionTypes.TOPIC_COLLECT_REQUEST,
        meta: { id: id }
      });
      api.collectTopic(id, !topic.is_collect).then(function () {
        dispatch({
          type: ActionTypes.TOPIC_COLLECT_SUCCESS,
          payload: schemas.createTopic(Object.assign({}, topic, {
            is_collect: !topic.is_collect
          })),
          meta: {
            id: id
          }
        });
      }).catch(function (error) {
        dispatch({
          type: ActionTypes.TOPIC_COLLECT_FAILURE,
          meta: {
            id: id,
            toast: failMessage
          }
        });
      });
    }
  };
};

var likeReply = exports.likeReply = function likeReply(id) {
  return function (dispatch, getState) {
    if (!topicSelectors.isReplyLiking(getState(), id)) {
      var reply = entitiesSelectors.getReply(getState(), id);
      var failMessage = reply.is_uped ? '取消点赞失败' : '点赞失败';
      dispatch({
        type: ActionTypes.REPLY_LIKE_REQUEST,
        meta: { id: id }
      });
      api.likeReply(id).then(function (action) {
        dispatch({
          type: ActionTypes.REPLY_LIKE_SUCCESS,
          payload: schemas.createReply(Object.assign({}, reply, { is_uped: action === 'up' })),
          meta: {
            id: id
          }
        });
      }).catch(function (error) {
        dispatch({
          type: ActionTypes.REPLY_LIKE_FAILURE,
          meta: {
            id: id,
            toast: failMessage
          }
        });
      });
    }
  };
};