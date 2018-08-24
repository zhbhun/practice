'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _ArrowBack = require('@material-ui/icons/ArrowBack');

var _ArrowBack2 = _interopRequireDefault(_ArrowBack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

var BackButton = function BackButton(_ref) {
  var classes = _ref.classes,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? 'inherit' : _ref$color,
      location = _ref.location,
      history = _ref.history;
  return _react2.default.createElement(
    _IconButton2.default,
    {
      className: classes.menuButton,
      color: color,
      'aria-label': 'back',
      onClick: function onClick() {
        if (location.state && location.state.root) {
          history.replace('/');
        } else {
          history.goBack();
        }
      }
    },
    _react2.default.createElement(_ArrowBack2.default, null)
  );
};

exports.default = (0, _reactRouterDom.withRouter)((0, _styles.withStyles)(styles)(BackButton));