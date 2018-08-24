'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToast = exports.getState = undefined;

var _app = require('../reducers/app');

var getState = exports.getState = function getState(state) {
  return state.app || _app.defaultState;
};
var getToast = exports.getToast = function getToast(state) {
  return getState(state).toast;
};