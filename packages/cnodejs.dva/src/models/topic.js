import * as api from 'cnodejs.api';
import * as schemas from '../constants/schemas';

const defaultState = {
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

const app = {
  namespace: 'topic',
  state: {
    list: {},
    detail: {},
    collect: {},
    replyLike: {}
  },
  reducers: {
    loadList: (state, { payload: { tab, page } }) => ({
      ...state,
      list: {
        ...state.list,
        [tab]: {
          ...(state.list[tab] || defaultState.list),
          error: null,
          loading: true,
          loadingPage: page
        }
      }
    }),
    loadListFailure: (state, { payload: error, meta: { tab } }) => {
      const listState = state.list[tab] || defaultState.list;
      return {
        ...state,
        list: {
          ...state.list,
          [tab]: {
            ...listState,
            error: null,
            loading: false,
            loadingPage: 0
          }
        }
      };
    },
    loadListSuccess: (
      state,
      { payload: { result }, meta: { tab, page, hasMore } }
    ) => {
      const listState = state.list[tab] || defaultState.list;
      return {
        ...state,
        list: {
          ...state.list,
          [tab]: {
            ...listState,
            error: null,
            loading: false,
            loadingPage: 0,
            page: page,
            data: [...(page === 1 ? [] : listState.data || []), ...result],
            hasMore
          }
        }
      };
    },
    loadDetail: state => state
  },
  effects: {
    *loadList(
      {
        payload: { tab, page }
      },
      { call, put }
    ) {
      try {
        const data = yield call(api.loadTopicList, tab, page, 15);
        yield put({
          type: 'loadListSuccess',
          payload: schemas.createTopics(data),
          meta: {
            tab,
            page,
            hasMore: true
          }
        });
      } catch (error) {
        yield put({
          type: 'loadListFailure',
          payload: error,
          meta: { tab }
        });
        yield put({
          type: 'app/toast',
          payload: error.message
        });
      }
    },
    *loadListIfNeed({ payload: tab }, { put, select }) {
      const topics = yield select(selectors.getListData, tab);
      if (!topics || topics.length === 0) {
        yield put({
          type: 'loadList',
          payload: { tab, page: 1 }
        });
      }
    },
    *refreshList({ payload: tab }, { put }) {
      yield put({
        type: 'loadList',
        payload: { tab, page: 1 }
      });
    },
    *loadListMore({ payload: tab }, { put, select }) {
      const page = yield select(selectors.getListPage, tab);
      yield put({
        type: 'loadList',
        payload: { tab, page: page + 1 }
      });
    },
    *loadDetail({ payload: id }) {
      // try {
      // } catch (error) {}
    }
  }
};

export const selectors = {
  getState: state => state.topic,
  getListState: state => selectors.getState(state).list,
  getList: (state, tab) =>
    selectors.getListState(state)[tab] || defaultState.list,
  hasListMore: (state, tab) => selectors.getList(state, tab).hasMore,
  getListError: (state, tab) => selectors.getList(state, tab).error,
  isListLoading: (state, tab) => selectors.getList(state, tab).loading,
  getListLoadingPage: (state, tab) => selectors.getList(state, tab).loadingPage,
  getListPage: (state, tab) => selectors.getList(state, tab).page,
  getListData: (state, tab) => selectors.getList(state, tab).data
};

export default app;
