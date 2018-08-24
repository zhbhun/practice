"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getState = exports.getState = function getState(state) {
  return state.entities;
};

// 用户
var getUsers = exports.getUsers = function getUsers(state) {
  return getState(state).users || {};
};
var getUser = exports.getUser = function getUser(state, id) {
  return getUsers(state)[id];
};

// 话题
var getTopics = exports.getTopics = function getTopics(state) {
  return getState(state).topics || {};
};
var getTopic = exports.getTopic = function getTopic(state, id) {
  return getTopics(state)[id];
};

// 回复
var getReplies = exports.getReplies = function getReplies(state) {
  return getState(state).replies || {};
};
var getReply = exports.getReply = function getReply(state, id) {
  return getReplies(state)[id];
};

// 消息
var getMessages = exports.getMessages = function getMessages(state) {
  return getState(state).messages || {};
};
var getMessage = exports.getMessage = function getMessage(state, id) {
  var message = getMessages(state)[id];
  if (message) {
    return _extends({}, message, {
      topic: getTopic(state, message.topic),
      reply: getReply(state, message.reply)
    });
  }
  return null;
};