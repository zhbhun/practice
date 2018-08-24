'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getData = exports.getError = exports.isLoading = exports.getState = undefined;

var _message = require('../reducers/message');

var getState = exports.getState = function getState(state) {
  return state.message || _message.defaultState;
};
var isLoading = exports.isLoading = function isLoading(state) {
  return getState(state).loading;
};
var getError = exports.getError = function getError(state) {
  return getState(state).error;
};
var getData = exports.getData = function getData(state) {
  return getState(state).data;
};