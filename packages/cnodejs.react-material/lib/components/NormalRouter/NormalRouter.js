'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NormalRouter = function (_PureComponent) {
  _inherits(NormalRouter, _PureComponent);

  function NormalRouter() {
    _classCallCheck(this, NormalRouter);

    return _possibleConstructorReturn(this, (NormalRouter.__proto__ || Object.getPrototypeOf(NormalRouter)).apply(this, arguments));
  }

  _createClass(NormalRouter, [{
    key: 'render',
    value: function render() {
      var routes = this.props.routes;

      return _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        routes.map(function (_ref) {
          var Component = _ref.component,
              route = _objectWithoutProperties(_ref, ['component']);

          return _react2.default.createElement(_reactRouterDom.Route, _extends({
            key: route.path
          }, route, {
            render: function render(routeProps) {
              return _react2.default.createElement(Component, _extends({}, routeProps, { visible: true }));
            }
          }));
        })
      );
    }
  }]);

  return NormalRouter;
}(_react.PureComponent);

NormalRouter.propTypes = {
  routes: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    exact: _propTypes2.default.bool,
    path: _propTypes2.default.string,
    component: _propTypes2.default.func
  }))
};
NormalRouter.defaultProps = {
  routes: []
};
exports.default = NormalRouter;