import { defaultState } from '../reducers/user';

export const getState = state => state.user;

// 详情
export const getDetails = state => getState(state).detail;
export const getDetail = (state, id) =>
  getDetails(state)[id] || defaultState.detail;
export const getDetailError = (state, id) => getDetail(state, id).error;
export const isDetailLoading = (state, id) => getDetail(state, id).loading;

// 登录会话
export const getSession = state =>
  getState(state).session || defaultState.session;
export const getSessionUserId = state => getSession(state).id;
export const isSessionLogon = state => !!getSessionUserId(state);
export const isSessionLogining = state => getSession(state).logining;
export const getSessionLoginError = state => getSession(state).loginError;
