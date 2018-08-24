'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSessionLoginError = exports.isSessionLogining = exports.isSessionLogon = exports.getSessionUserId = exports.getSession = exports.isDetailLoading = exports.getDetailError = exports.getDetail = exports.getDetails = exports.getState = undefined;

var _user = require('../reducers/user');

var getState = exports.getState = function getState(state) {
  return state.user;
};

// 详情
var getDetails = exports.getDetails = function getDetails(state) {
  return getState(state).detail;
};
var getDetail = exports.getDetail = function getDetail(state, id) {
  return getDetails(state)[id] || _user.defaultState.detail;
};
var getDetailError = exports.getDetailError = function getDetailError(state, id) {
  return getDetail(state, id).error;
};
var isDetailLoading = exports.isDetailLoading = function isDetailLoading(state, id) {
  return getDetail(state, id).loading;
};

// 登录会话
var getSession = exports.getSession = function getSession(state) {
  return getState(state).session || _user.defaultState.session;
};
var getSessionUserId = exports.getSessionUserId = function getSessionUserId(state) {
  return getSession(state).id;
};
var isSessionLogon = exports.isSessionLogon = function isSessionLogon(state) {
  return !!getSessionUserId(state);
};
var isSessionLogining = exports.isSessionLogining = function isSessionLogining(state) {
  return getSession(state).logining;
};
var getSessionLoginError = exports.getSessionLoginError = function getSessionLoginError(state) {
  return getSession(state).loginError;
};