'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cnodejs = require('cnodejs.react-material');

var _TopicDetailContainer = require('../containers/TopicDetailContainer');

var _TopicDetailContainer2 = _interopRequireDefault(_TopicDetailContainer);

var _TopicReplyButton = require('../containers/TopicReplyButton');

var _TopicReplyButton2 = _interopRequireDefault(_TopicReplyButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  TopicDetail: _TopicDetailContainer2.default,
  TopicReplyButton: _TopicReplyButton2.default
};

exports.default = function (props) {
  return _react2.default.createElement(_cnodejs.Topic, _extends({}, props, { components: components }));
};