'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _StackRoute = require('./StackRoute');

var _StackRoute2 = _interopRequireDefault(_StackRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createRoutes = function createRoutes(routes) {
  return routes.map(function (route) {
    return _react2.default.createElement(_StackRoute2.default, route);
  });
};

var StackRouter = function (_PureComponent) {
  _inherits(StackRouter, _PureComponent);

  function StackRouter(props) {
    _classCallCheck(this, StackRouter);

    var _this = _possibleConstructorReturn(this, (StackRouter.__proto__ || Object.getPrototypeOf(StackRouter)).call(this, props));

    _this.findFirstMatch = function (location) {
      var match = void 0,
          mathRoute = void 0;
      _this.routes.forEach(function (route) {
        if (!_react2.default.isValidElement(route)) return;

        var _route$props = route.props,
            pathProp = _route$props.path,
            exact = _route$props.exact,
            strict = _route$props.strict,
            sensitive = _route$props.sensitive,
            from = _route$props.from;

        var path = pathProp || from;

        if (match == null) {
          mathRoute = route;
          match = (0, _reactRouterDom.matchPath)(location.pathname, { path: path, exact: exact, strict: strict, sensitive: sensitive });
        }
      });
      return match ? _react2.default.cloneElement(mathRoute, {
        key: location.key || 'root',
        id: location.key,
        active: true,
        location: location
      }) : null; // TODO 404
    };

    _this.setRouteTime = function () {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'root';

      if (!_this.getRouteTime(key)) {
        _this.routeTimes[key] = Date.now();
        sessionStorage.setItem('routes', JSON.stringify(_this.routeTimes));
      }
    };

    _this.getRouteTime = function () {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'root';

      if (!_this.routeTimes) {
        var cache = sessionStorage.getItem('routes');
        _this.routeTimes = !cache ? {} : JSON.parse(cache);
      }
      return _this.routeTimes[key];
    };

    _this.getCurrentRouteIndex = function () {
      var currentIndex = -1;
      _this.state.routeStack.some(function (route, index) {
        if (route.props.id === _this.props.location.key) {
          currentIndex = index;
          return true;
        }
        return false;
      });
      return currentIndex;
    };

    props.location.state = Object.assign({}, props.location.state, {
      root: true
    });
    _this.setRouteTime(props.location.key);

    _this.routes = createRoutes(props.routes);
    _this.routeTimes = null;
    _this.state = {
      routeStack: [_this.findFirstMatch(props.location)]
    };
    return _this;
  }

  _createClass(StackRouter, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.location.key !== this.props.location.key) {
        this.setRouteTime(nextProps.location.key);
        switch (nextProps.history.action) {
          case 'REPLACE':
            {
              var currentIndex = this.getCurrentRouteIndex();
              var matchRoute = this.findFirstMatch(nextProps.location);
              var newRouteStack = this.state.routeStack.map(function (route) {
                return _react2.default.cloneElement(route, { active: false });
              });
              newRouteStack.splice(currentIndex, 1, matchRoute);
              this.setState({ routeStack: newRouteStack });
              break;
            }
          case 'PUSH':
            {
              var _currentIndex = this.getCurrentRouteIndex();
              var _matchRoute = this.findFirstMatch(nextProps.location);
              var _newRouteStack = this.state.routeStack.slice(0, _currentIndex + 1).map(function (route) {
                return _react2.default.cloneElement(route, { active: false });
              });
              _newRouteStack.push(_matchRoute);
              this.setState({ routeStack: _newRouteStack });
              break;
            }
          case 'POP':
            {
              var nextIndex = -1;
              var _newRouteStack2 = this.state.routeStack.map(function (route, index) {
                var matched = route.props.id === nextProps.location.key;
                if (matched) {
                  nextIndex = index;
                }
                return _react2.default.cloneElement(route, { active: matched });
              });
              if (nextIndex < 0) {
                var _matchRoute2 = this.findFirstMatch(nextProps.location);
                var nextRouteTime = this.getRouteTime(nextProps.location.key);
                var currentRouteTime = this.getRouteTime(this.props.location.key);
                if (nextRouteTime < currentRouteTime) {
                  _newRouteStack2.unshift(_matchRoute2);
                } else {
                  _newRouteStack2.push(_matchRoute2);
                }
              }
              this.setState({ routeStack: _newRouteStack2 });
              break;
            }
          default:
            break;
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _react.Fragment,
        null,
        this.state.routeStack
      );
    }
  }]);

  return StackRouter;
}(_react.PureComponent);

StackRouter.propTypes = {
  routes: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    exact: _propTypes2.default.bool,
    path: _propTypes2.default.string,
    component: _propTypes2.default.func
  }))
};
StackRouter.defaultProps = {
  routes: []
};
exports.default = StackRouter;