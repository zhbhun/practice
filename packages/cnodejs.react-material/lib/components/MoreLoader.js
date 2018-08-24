'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  container: {
    textAlign: 'center'
  },
  progress: {
    margin: '12px auto'
  },
  typography: {
    height: 45,
    lineHeight: '56px',
    fontSize: '16px'
  }
};

var MoreLoader = function (_PureComponent) {
  _inherits(MoreLoader, _PureComponent);

  function MoreLoader(props) {
    _classCallCheck(this, MoreLoader);

    var _this = _possibleConstructorReturn(this, (MoreLoader.__proto__ || Object.getPrototypeOf(MoreLoader)).call(this, props));

    _this.handleRef = function (ref) {
      return _this.element = ref;
    };

    _this.handleIntersect = function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          entry = _ref2[0];

      if (entry.isIntersecting && _this.props.hasMore && !_this.props.loading) {
        _this.props.onLoad();
      }
    };

    _this.element = null;
    _this.io = new IntersectionObserver(_this.handleIntersect);
    return _this;
  }

  _createClass(MoreLoader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.io.observe(this.element);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.hasMore && !this.props.hasMore) {
        this.io.unobserve(this.element);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.io.unobserve(this.element);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          error = _props.error,
          hasMore = _props.hasMore,
          onLoad = _props.onLoad;

      var content = null;
      if (!hasMore) {
        content = _react2.default.createElement(
          _Typography2.default,
          {
            className: classes.typography,
            align: 'center',
            color: 'textSecondary'
          },
          '\u6CA1\u6709\u66F4\u591A\u4E86'
        );
      } else if (error) {
        content = _react2.default.createElement(
          _Typography2.default,
          {
            className: classes.typography,
            align: 'center',
            color: 'textSecondary',
            onClick: onLoad
          },
          '\u52A0\u8F7D\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5'
        );
      } else {
        content = _react2.default.createElement(_CircularProgress2.default, { className: classes.progress, size: 32 });
      }
      return _react2.default.createElement(
        'div',
        { className: classes.container, ref: this.handleRef },
        content
      );
    }
  }]);

  return MoreLoader;
}(_react.PureComponent);

MoreLoader.propTypes = {
  error: _propTypes2.default.string,
  loading: _propTypes2.default.bool.isRequired,
  hasMore: _propTypes2.default.bool.isRequired,
  onLoad: _propTypes2.default.func.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(MoreLoader);