'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UserDetailContainer = require('../containers/UserDetailContainer');

var _UserDetailContainer2 = _interopRequireDefault(_UserDetailContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var User = function User(_ref) {
  var match = _ref.match,
      props = _objectWithoutProperties(_ref, ['match']);

  return _react2.default.createElement(_UserDetailContainer2.default, _extends({}, props, { id: match.params.id }));
};

exports.default = User;