'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('@material-ui/core/styles');

var _Refresh = require('@material-ui/icons/Refresh');

var _Refresh2 = _interopRequireDefault(_Refresh);

var _scrollparent = require('../utils/scrollparent');

var _scrollparent2 = _interopRequireDefault(_scrollparent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  container: {
    position: 'relative'
  },
  refreshContainer: {
    position: 'absolute',
    top: '-45px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 44,
    height: 44,
    borderRadius: 22,
    border: '1px solid #ddd',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  refreshIndicator: {
    width: 32,
    height: 32
  },
  refreshIndicatorActive: {
    animation: 'pull-refresh-rotate 1.4s ease-in-out infinite'
  },
  '@keyframes pull-refresh-rotate': {
    '100%': {
      transform: 'rotate(360deg)'
    }
  }
};

var isWebView = typeof navigator !== 'undefined' && /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
var DOWN = 'down';
var UP = 'up';
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('test', function () {
    return null;
  }, opts);
} catch (e) {
  // empty
}
var willPreventDefault = supportsPassive ? { passive: false } : false;

function setTransform(nodeStyle, value) {
  nodeStyle.transform = value;
  nodeStyle.webkitTransform = value;
  nodeStyle.MozTransform = value;
}

var StaticRenderer = function (_React$Component) {
  _inherits(StaticRenderer, _React$Component);

  function StaticRenderer() {
    _classCallCheck(this, StaticRenderer);

    return _possibleConstructorReturn(this, (StaticRenderer.__proto__ || Object.getPrototypeOf(StaticRenderer)).apply(this, arguments));
  }

  _createClass(StaticRenderer, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.shouldUpdate;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.render()
      );
    }
  }]);

  return StaticRenderer;
}(_react2.default.Component);

var PullToRefresh = function (_React$Component2) {
  _inherits(PullToRefresh, _React$Component2);

  function PullToRefresh() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, PullToRefresh);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = PullToRefresh.__proto__ || Object.getPrototypeOf(PullToRefresh)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
      currSt: 'deactivate',
      dragOnEdge: false
    }, _this2._isMounted = false, _this2.shouldUpdateChildren = false, _this2.showPullToRefresh = function () {
      if (_this2.props.direction === UP) {
        _this2._lastScreenY = -_this2.props.distanceToRefresh - 1;
      }
      if (_this2.props.direction === DOWN) {
        _this2._lastScreenY = _this2.props.distanceToRefresh + 1;
      }
      // change dom need after setState
      _this2.setState({ currSt: 'release' }, function () {
        return _this2.setContentStyle(_this2._lastScreenY);
      });
    }, _this2.triggerPullToRefresh = function () {
      // 在初始化时、用代码 自动 触发 pullToRefresh
      // 注意：当 direction 为 up 时，当 visible length < content length 时、则看不到效果
      // 添加this._isMounted的判断，否则组建一实例化，currSt就会是finish
      if (!_this2.state.dragOnEdge && _this2._isMounted) {
        if (_this2.props.refreshing) {
          _this2.showPullToRefresh();
        } else {
          _this2.setState({ currSt: 'finish' }, function () {
            return _this2.reset();
          });
        }
      }
    }, _this2.init = function (ele) {
      if (!ele) {
        // like return in destroy fn ???!!
        return;
      }
      _this2._to = {
        touchstart: _this2.onTouchStart.bind(_this2, ele),
        touchmove: _this2.onTouchMove.bind(_this2, ele),
        touchend: _this2.onTouchEnd.bind(_this2, ele),
        touchcancel: _this2.onTouchEnd.bind(_this2, ele)
      };
      Object.keys(_this2._to).forEach(function (key) {
        ele.addEventListener(key, _this2._to[key], willPreventDefault);
      });
    }, _this2.destroy = function (ele) {
      if (!_this2._to || !ele) {
        // componentWillUnmount fire before componentDidMount, like forceUpdate ???!!
        return;
      }
      Object.keys(_this2._to).forEach(function (key) {
        ele.removeEventListener(key, _this2._to[key]);
      });
    }, _this2.onTouchStart = function (_ele, e) {
      _this2._ScreenY = _this2._startScreenY = e.touches[0].screenY;
      // 一开始 refreshing 为 true 时 this._lastScreenY 有值
      _this2._lastScreenY = _this2._lastScreenY || 0;
    }, _this2.isEdge = function (ele, direction) {
      var container = _this2.props.getScrollContainer();
      if (container && container === document.body) {
        // In chrome61 `document.body.scrollTop` is invalid
        var scrollNode = document.scrollingElement ? document.scrollingElement : document.body;
        if (direction === UP) {
          return scrollNode.scrollHeight - scrollNode.scrollTop <= window.innerHeight;
        }
        if (direction === DOWN) {
          return scrollNode.scrollTop <= 0;
        }
      }
      if (direction === UP) {
        return ele.scrollHeight - ele.scrollTop === ele.clientHeight;
      }
      if (direction === DOWN) {
        return ele.scrollTop <= 0;
      }
    }, _this2.damping = function (dy) {
      if (Math.abs(_this2._lastScreenY) > _this2.props.damping) {
        return 0;
      }

      var ratio = Math.abs(_this2._ScreenY - _this2._startScreenY) / window.screen.height;
      dy *= (1 - ratio) * 0.6;

      return dy;
    }, _this2.onTouchMove = function (ele, e) {
      // 使用 pageY 对比有问题
      var _screenY = e.touches[0].screenY;
      var direction = _this2.props.direction;

      // 拖动方向不符合的不处理

      if (direction === UP && _this2._startScreenY < _screenY || direction === DOWN && _this2._startScreenY > _screenY) {
        return;
      }

      if (_this2.isEdge(ele, direction)) {
        if (!_this2.state.dragOnEdge) {
          // 当用户开始往上滑的时候isEdge还是false的话，会导致this._ScreenY不是想要的，只有当isEdge为true时，再上滑，才有意义
          // 下面这行代码解决了上面这个问题
          _this2._ScreenY = _this2._startScreenY = e.touches[0].screenY;

          _this2.setState({ dragOnEdge: true });
        }
        e.preventDefault();
        // add stopPropagation with fastclick will trigger content onClick event. why?
        // ref https://github.com/ant-design/ant-design-mobile/issues/2141
        // e.stopPropagation();
        var _diff = Math.round(_screenY - _this2._ScreenY);
        _this2._ScreenY = _screenY;
        _this2._lastScreenY += _this2.damping(_diff);

        _this2.setContentStyle(_this2._lastScreenY);

        if (Math.abs(_this2._lastScreenY) < _this2.props.distanceToRefresh) {
          if (_this2.state.currSt !== 'deactivate') {
            // console.log('back to the distance');
            _this2.setState({ currSt: 'deactivate' });
          }
        } else {
          if (_this2.state.currSt === 'deactivate') {
            // console.log('reach to the distance');
            _this2.setState({ currSt: 'activate' });
          }
        }

        // https://github.com/ant-design/ant-design-mobile/issues/573#issuecomment-339560829
        // iOS UIWebView issue, It seems no problem in WKWebView
        if (isWebView && e.changedTouches[0].clientY < 0) {
          _this2.onTouchEnd();
        }
      }
    }, _this2.onTouchEnd = function () {
      if (_this2.state.dragOnEdge) {
        _this2.setState({ dragOnEdge: false });
      }
      if (_this2.state.currSt === 'activate') {
        _this2.showPullToRefresh();
        _this2._timer = setTimeout(function () {
          if (!_this2.props.refreshing) {
            _this2.setState({ currSt: 'finish' }, function () {
              return _this2.reset();
            });
          }
          _this2._timer = undefined;
        }, 1000);
        _this2.props.onRefresh();
      } else {
        _this2.reset();
      }
    }, _this2.reset = function () {
      _this2._lastScreenY = 0;
      _this2.setContentStyle(0);
    }, _this2.setContentStyle = function (ty) {
      // todos: Why sometimes do not have `this.contentRef` ?
      if (_this2.contentRef) {
        setTransform(_this2.contentRef.style, 'translate3d(0px,' + ty + 'px,0)');
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  // https://github.com/yiminghe/zscroller/blob/2d97973287135745818a0537712235a39a6a62a1/src/Scroller.js#L355
  // currSt: `activate` / `deactivate` / `release` / `finish`


  _createClass(PullToRefresh, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this._isMounted = true;
      // `getScrollContainer` most likely return React.Node at the next tick. Need setTimeout
      setTimeout(function () {
        _this3.init(_this3.props.getScrollContainer() || (0, _scrollparent2.default)(_this3.containerRef) || _this3.containerRef);
        _this3.triggerPullToRefresh();
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      this.shouldUpdateChildren = this.props.children !== nextProps.children;
      return true;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps === this.props || prevProps.refreshing === this.props.refreshing) {
        return;
      }
      // triggerPullToRefresh 需要尽可能减少 setState 次数
      this.triggerPullToRefresh();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Should have no setTimeout here!
      this.destroy(this.props.getScrollContainer() || this.containerRef);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var props = _extends({}, this.props);

      delete props.damping;

      var classes = props.classes,
          className = props.className,
          prefixCls = props.prefixCls,
          children = props.children,
          getScrollContainer = props.getScrollContainer,
          direction = props.direction,
          onRefresh = props.onRefresh,
          refreshing = props.refreshing,
          distanceToRefresh = props.distanceToRefresh,
          restProps = _objectWithoutProperties(props, ['classes', 'className', 'prefixCls', 'children', 'getScrollContainer', 'direction', 'onRefresh', 'refreshing', 'distanceToRefresh']);

      var renderChildren = _react2.default.createElement(StaticRenderer, {
        shouldUpdate: this.shouldUpdateChildren,
        render: function render() {
          return children;
        }
      });

      var renderRefresh = function renderRefresh(cls) {
        var cla = (0, _classnames2.default)(cls, !_this4.state.dragOnEdge && prefixCls + '-transition');
        return _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(prefixCls + '-content-wrapper', classes.container)
          },
          direction === UP ? renderChildren : null,
          _react2.default.createElement(
            'div',
            { className: cla, ref: function ref(el) {
                return _this4.contentRef = el;
              } },
            _react2.default.createElement(
              'div',
              { className: prefixCls + '-indicator' },
              _react2.default.createElement(
                'div',
                { className: classes.refreshContainer },
                _react2.default.createElement(_Refresh2.default, {
                  className: (0, _classnames2.default)(classes.refreshIndicator, _defineProperty({}, classes.refreshIndicatorActive, _this4.state.currSt === 'release')),
                  color: 'primary'
                })
              )
            )
          ),
          direction === DOWN ? renderChildren : null
        );
      };
      if (getScrollContainer()) {
        return renderRefresh(prefixCls + '-content ' + prefixCls + '-' + direction);
      }
      return _react2.default.createElement(
        'div',
        _extends({
          ref: function ref(el) {
            return _this4.containerRef = el;
          },
          className: (0, _classnames2.default)(className, prefixCls, prefixCls + '-' + direction)
        }, restProps),
        renderRefresh(prefixCls + '-content')
      );
    }
  }]);

  return PullToRefresh;
}(_react2.default.Component);

PullToRefresh.propTypes = {
  getScrollContainer: _propTypes2.default.func,
  direction: _propTypes2.default.oneOf(['down', 'up']),
  refreshing: _propTypes2.default.bool,
  distanceToRefresh: _propTypes2.default.number,
  onRefresh: _propTypes2.default.func,
  prefixCls: _propTypes2.default.string,
  className: _propTypes2.default.string,
  damping: _propTypes2.default.number
};
PullToRefresh.defaultProps = {
  prefixCls: 'PullToRefresh',
  getScrollContainer: function getScrollContainer() {
    return undefined;
  },
  direction: DOWN,
  distanceToRefresh: 66,
  damping: 100
};
exports.default = (0, _styles.withStyles)(styles)(PullToRefresh);