'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cnodejs = require('cnodejs.react-material');

var _MainDrawerContainer = require('../containers/MainDrawerContainer');

var _MainDrawerContainer2 = _interopRequireDefault(_MainDrawerContainer);

var _TopicListContainer = require('../containers/TopicListContainer');

var _TopicListContainer2 = _interopRequireDefault(_TopicListContainer);

var _TopicEditButton = require('../containers/TopicEditButton');

var _TopicEditButton2 = _interopRequireDefault(_TopicEditButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  MainDrawer: _MainDrawerContainer2.default,
  TopicList: _TopicListContainer2.default,
  TopicEditButton: _TopicEditButton2.default
};

exports.default = function (props) {
  return _react2.default.createElement(_cnodejs.Home, _extends({}, props, { components: components }));
};