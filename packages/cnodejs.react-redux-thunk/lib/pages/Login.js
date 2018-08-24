'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cnodejs = require('cnodejs.react-material');

var _LoginFormContainer = require('../containers/LoginFormContainer');

var _LoginFormContainer2 = _interopRequireDefault(_LoginFormContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = {
  LoginForm: _LoginFormContainer2.default
};

exports.default = function (props) {
  return _react2.default.createElement(_cnodejs.Login, _extends({}, props, { components: components }));
};