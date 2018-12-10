const defaultState = {
  session: {
    id: null,
    logining: false,
    loginError: null
  },
  detail: {
    error: null,
    loading: false
  }
};

const user = {
  namespace: 'user',
  state: {
    session: defaultState.session,
    detail: {}
  },
  reducers: {},
  effects: {}
};

export const selectors = {
  getState: state => state.user,
  // 详情
  getDetailState: state => selectors.getState(state).detail,
  getDetail: (state, id) =>
    selectors.getDetailState(state)[id] || defaultState.detail,
  getDetailError: (state, id) => selectors.getDetail(state, id).error,
  isDetailLoading: (state, id) => selectors.getDetail(state, id).loading,
  // 登录会话
  getSession: state =>
    selectors.getState(state).session || defaultState.session,
  getSessionUserId: state => selectors.getSession(state).id,
  isSessionLogon: state => !!selectors.getSessionUserId(state),
  isSessionLogining: state => selectors.getSession(state).logining,
  getSessionLoginError: state => selectors.getSession(state).loginError
};

export default user;
