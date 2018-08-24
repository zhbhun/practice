import { combineReducers } from 'redux';
import * as ActionTypes from '../constants/ActionTypes';

export const defaultState = {
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

const list = (state = defaultState.list, action) => {
  switch (action.type) {
    case ActionTypes.TOPICS_LOAD_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
        loadingPage: action.meta.page
      };
    }
    case ActionTypes.TOPICS_LOAD_FAILURE: {
      return {
        ...state,
        error: action.payload.message,
        loading: false,
        loadingPage: 0
      };
    }
    case ActionTypes.TOPICS_LOAD_SUCCESS: {
      const {
        payload: { result },
        meta: { page, hasMore }
      } = action;
      return {
        ...state,
        error: null,
        loading: false,
        loadingPage: 0,
        page: page,
        data: [...(page === 1 ? [] : state.data || []), ...result],
        hasMore
      };
    }
    default:
      break;
  }
};

const detail = (state = defaultState.detail, action) => {
  switch (action.type) {
    case ActionTypes.TOPIC_LOAD_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ActionTypes.TOPIC_LOAD_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loading: false
      };
    case ActionTypes.TOPIC_LOAD_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false
      };
    default:
      break;
  }
  return state;
};

const makeLoadingReducer = ({
  defaultState,
  actions: { request, failure, success }
}) => {
  const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case [request]:
        return {
          ...state,
          loading: true
        };
      case [failure]:
      case [success]:
        return {
          ...state,
          loading: false
        };
      default:
        break;
    }
    return state;
  };
  return (state = {}, action) => {
    switch (action.type) {
      case [request]:
      case [failure]:
      case [success]: {
        const {
          meta: { id }
        } = action;
        return {
          ...state,
          [id]: reducer(state[id], action)
        };
      }
      default:
        break;
    }
    return state;
  };
};

export default combineReducers({
  list: (state = {}, action) => {
    switch (action.type) {
      case ActionTypes.TOPICS_LOAD_REQUEST:
      case ActionTypes.TOPICS_LOAD_FAILURE:
      case ActionTypes.TOPICS_LOAD_SUCCESS:
        const {
          meta: { tab }
        } = action;
        return {
          ...state,
          [tab]: list(state[tab], action)
        };
      default:
        break;
    }
    return state;
  },
  detail: (state = {}, action) => {
    switch (action.type) {
      case ActionTypes.TOPIC_LOAD_REQUEST:
      case ActionTypes.TOPIC_LOAD_FAILURE:
      case ActionTypes.TOPIC_LOAD_SUCCESS: {
        const {
          meta: { id }
        } = action;
        return {
          ...state,
          [id]: detail(state[id], action)
        };
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
