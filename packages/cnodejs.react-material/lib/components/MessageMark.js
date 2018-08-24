'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _DoneAll = require('@material-ui/icons/DoneAll');

var _DoneAll2 = _interopRequireDefault(_DoneAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var onClick = _ref.onClick;
  return _react2.default.createElement(
    _IconButton2.default,
    { color: 'inherit', onClick: onClick },
    _react2.default.createElement(_DoneAll2.default, null)
  );
};