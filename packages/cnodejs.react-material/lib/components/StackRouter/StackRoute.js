'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('@material-ui/core/styles');

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = {
  container: {
    display: 'none',
    position: 'fixed',
    zIndex: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch'
  },
  activeContainer: {
    display: 'block'
  }
};

var StackRoute = function StackRoute(_ref) {
  var classes = _ref.classes,
      active = _ref.active,
      Component = _ref.component,
      props = _objectWithoutProperties(_ref, ['classes', 'active', 'component']);

  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(classes.container, _defineProperty({}, classes.activeContainer, active))
    },
    _react2.default.createElement(_reactRouterDom.Route, _extends({}, props, {
      render: function render(routeProps) {
        return _react2.default.createElement(Component, _extends({}, routeProps, { visible: active }));
      }
    }))
  );
};

exports.default = (0, _styles.withStyles)(styles)(StackRoute);