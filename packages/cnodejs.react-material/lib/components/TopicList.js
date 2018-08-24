'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MoreLoader = require('./MoreLoader');

var _MoreLoader2 = _interopRequireDefault(_MoreLoader);

var _PullToRefresh = require('./PullToRefresh');

var _PullToRefresh2 = _interopRequireDefault(_PullToRefresh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopicList = function (_PureComponent) {
  _inherits(TopicList, _PureComponent);

  function TopicList() {
    _classCallCheck(this, TopicList);

    return _possibleConstructorReturn(this, (TopicList.__proto__ || Object.getPrototypeOf(TopicList)).apply(this, arguments));
  }

  _createClass(TopicList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onInit();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.tab !== this.props.tab) {
        this.props.onInit();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          error = _props.error,
          loading = _props.loading,
          hasMore = _props.hasMore,
          topics = _props.topics,
          onLoadMore = _props.onLoadMore,
          onRefresh = _props.onRefresh,
          TopicItem = _props.components.TopicItem;

      return _react2.default.createElement(
        _PullToRefresh2.default,
        { onRefresh: onRefresh, refreshing: loading },
        topics && topics.length > 0 ? _react2.default.createElement(
          _react.Fragment,
          null,
          (topics || []).map(function (id) {
            return _react2.default.createElement(TopicItem, { key: id, id: id });
          }),
          _react2.default.createElement(_MoreLoader2.default, {
            hasMore: hasMore,
            loading: loading,
            error: error,
            onLoad: onLoadMore
          })
        ) : null
      );
    }
  }]);

  return TopicList;
}(_react.PureComponent);

TopicList.propTypes = {
  tab: _propTypes2.default.string.isRequired,
  error: _propTypes2.default.string,
  loading: _propTypes2.default.bool.isRequired,
  hasMore: _propTypes2.default.bool.isRequired,
  topics: _propTypes2.default.array,
  onInit: _propTypes2.default.func.isRequired,
  onRefresh: _propTypes2.default.func.isRequired,
  onLoadMore: _propTypes2.default.func.isRequired,
  components: _propTypes2.default.shape({
    TopicItem: _propTypes2.default.func
  }).isRequired
};

TopicList.defaultProps = {
  topics: null
};

exports.default = TopicList;