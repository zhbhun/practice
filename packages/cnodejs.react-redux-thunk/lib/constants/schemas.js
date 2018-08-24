'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMessage = exports.createMessages = exports.createTopics = exports.createTopic = exports.createReplies = exports.createReply = exports.createUsers = exports.createUser = exports.message = exports.topic = exports.reply = exports.user = undefined;

var _normalizr = require('normalizr');

var user = exports.user = new _normalizr.schema.Entity('users', {}, {
  idAttribute: 'loginname'
});
var reply = exports.reply = new _normalizr.schema.Entity('replies', {
  author: user
});
var topic = exports.topic = new _normalizr.schema.Entity('topics', {
  author: user,
  replies: [reply]
});
var message = exports.message = new _normalizr.schema.Entity('messages', {
  author: user,
  topic: topic,
  reply: reply
});
user.define({
  recent_replies: [topic],
  recent_topics: [topic],
  collect_topics: [topic]
});

var createUser = exports.createUser = function createUser(data) {
  return (0, _normalizr.normalize)(data, user);
};
var createUsers = exports.createUsers = function createUsers(data) {
  return (0, _normalizr.normalize)(data, [user]);
};
var createReply = exports.createReply = function createReply(data) {
  return (0, _normalizr.normalize)(data, reply);
};
var createReplies = exports.createReplies = function createReplies(data) {
  return (0, _normalizr.normalize)(data, [reply]);
};
var createTopic = exports.createTopic = function createTopic(data) {
  return (0, _normalizr.normalize)(data, topic);
};
var createTopics = exports.createTopics = function createTopics(data) {
  return (0, _normalizr.normalize)(data, [topic]);
};
var createMessages = exports.createMessages = function createMessages(data) {
  return (0, _normalizr.normalize)(data, [message]);
};
var createMessage = exports.createMessage = function createMessage(data) {
  return (0, _normalizr.normalize)(data, message);
};