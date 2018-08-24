'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('@material-ui/core/styles');

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Edit = require('@material-ui/icons/Edit');

var _Edit2 = _interopRequireDefault(_Edit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  editButton: {
    position: 'fixed',
    bottom: 16,
    right: 16
  }
};

exports.default = (0, _styles.withStyles)(styles)(function (_ref) {
  var classes = _ref.classes,
      onToast = _ref.onToast;
  return _react2.default.createElement(
    _Button2.default,
    {
      className: classes.editButton,
      variant: 'fab',
      color: 'primary',
      onClick: function onClick() {
        return onToast('暂时不支持发帖');
      }
    },
    _react2.default.createElement(_Edit2.default, null)
  );
});