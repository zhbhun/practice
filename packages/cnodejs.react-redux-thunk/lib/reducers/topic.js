'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var _ActionTypes = require('../constants/ActionTypes');

var ActionTypes = _interopRequireWildcard(_ActionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultState = exports.defaultState = {
  list: {
    error: null, // 列表加载失败信息
    loading: false, // 列表加载中
    loadingPage: 0, // 列表加载中的分页信息
    page: 0, // 列表分页
    data: null, // 列表数据
    hasMore: true // 是否有更多
  },
  detail: {
    error: null, // 详情加载失败信息
    loading: false // 主题加载中
  },
  collect: {
    loading: false // 是否收藏中
  },
  replyLike: {
    loading: false // 是否点赞中
  }
};

var _list = function _list() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState.list;
  var action = arguments[1];

  switch (action.type) {
    case ActionTypes.TOPICS_LOAD_REQUEST:
      {
        return _extends({}, state, {
          error: null,
          loading: true,
          loadingPage: action.meta.page
        });
      }
    case ActionTypes.TOPICS_LOAD_FAILURE:
      {
        return _extends({}, state, {
          error: action.payload.message,
          loading: false,
          loadingPage: 0
        });
      }
    case ActionTypes.TOPICS_LOAD_SUCCESS:
      {
        var result = action.payload.result,
            _action$meta = action.meta,
            page = _action$meta.page,
            hasMore = _action$meta.hasMore;

        return _extends({}, state, {
          error: null,
          loading: false,
          loadingPage: 0,
          page: page,
          data: [].concat(_toConsumableArray(page === 1 ? [] : state.data || []), _toConsumableArray(result)),
          hasMore: hasMore
        });
      }
    default:
      break;
  }
};

var _detail = function _detail() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState.detail;
  var action = arguments[1];

  switch (action.type) {
    case ActionTypes.TOPIC_LOAD_REQUEST:
      return _extends({}, state, {
        error: null,
        loading: true
      });
    case ActionTypes.TOPIC_LOAD_FAILURE:
      return _extends({}, state, {
        error: action.payload.message,
        loading: false
      });
    case ActionTypes.TOPIC_LOAD_SUCCESS:
      return _extends({}, state, {
        error: null,
        loading: false
      });
    default:
      break;
  }
  return state;
};

var makeLoadingReducer = function makeLoadingReducer(_ref) {
  var defaultState = _ref.defaultState,
      _ref$actions = _ref.actions,
      request = _ref$actions.request,
      failure = _ref$actions.failure,
      success = _ref$actions.success;

  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    switch (action.type) {
      case [request]:
        return _extends({}, state, {
          loading: true
        });
      case [failure]:
      case [success]:
        return _extends({}, state, {
          loading: false
        });
      default:
        break;
    }
    return state;
  };
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
      case [request]:
      case [failure]:
      case [success]:
        {
          var id = action.meta.id;

          return _extends({}, state, _defineProperty({}, id, reducer(state[id], action)));
        }
      default:
        break;
    }
    return state;
  };
};

exports.default = (0, _redux.combineReducers)({
  list: function list() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
      case ActionTypes.TOPICS_LOAD_REQUEST:
      case ActionTypes.TOPICS_LOAD_FAILURE:
      case ActionTypes.TOPICS_LOAD_SUCCESS:
        var tab = action.meta.tab;

        return _extends({}, state, _defineProperty({}, tab, _list(state[tab], action)));
      default:
        break;
    }
    return state;
  },
  detail: function detail() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
      case ActionTypes.TOPIC_LOAD_REQUEST:
      case ActionTypes.TOPIC_LOAD_FAILURE:
      case ActionTypes.TOPIC_LOAD_SUCCESS:
        {
          var id = action.meta.id;

          return _extends({}, state, _defineProperty({}, id, _detail(state[id], action)));
        }
      default:
        break;
    }
    return state;
  },
  collect: makeLoadingReducer({
    defaultState: defaultState.collect,
    actions: {
      request: ActionTypes.TOPIC_COLLECT_REQUEST,
      failure: ActionTypes.TOPIC_COLLECT_FAILURE,
      success: ActionTypes.TOPIC_COLLECT_SUCCESS
    }
  }),
  replyLike: makeLoadingReducer({
    defaultState: defaultState.replyLike,
    actions: {
      request: ActionTypes.REPLY_LIKE_REQUEST,
      failure: ActionTypes.REPLY_LIKE_FAILURE,
      success: ActionTypes.REPLY_LIKE_SUCCESS
    }
  })
});