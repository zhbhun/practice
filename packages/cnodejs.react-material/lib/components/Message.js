'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _AppBar = require('@material-ui/core/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _BackButton = require('./BackButton');

var _BackButton2 = _interopRequireDefault(_BackButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  toolbarTitle: {
    flexGrow: 1
  }
};

var Message = function Message(_ref) {
  var classes = _ref.classes,
      match = _ref.match,
      _ref$components = _ref.components,
      MessagMark = _ref$components.MessagMark,
      MessageList = _ref$components.MessageList;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _AppBar2.default,
      { position: 'sticky' },
      _react2.default.createElement(
        _Toolbar2.default,
        null,
        _react2.default.createElement(_BackButton2.default, null),
        _react2.default.createElement(
          _Typography2.default,
          {
            variant: 'title',
            color: 'inherit',
            className: classes.toolbarTitle
          },
          '\u6D88\u606F'
        ),
        _react2.default.createElement(MessagMark, null)
      )
    ),
    _react2.default.createElement(MessageList, null)
  );
};

Message.propTypes = {
  components: _propTypes2.default.shape({
    MessagMark: _propTypes2.default.func,
    MessageList: _propTypes2.default.func
  })
};

exports.default = (0, _styles.withStyles)(styles)(Message);