'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PullToRefresh = require('./PullToRefresh');

var _PullToRefresh2 = _interopRequireDefault(_PullToRefresh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageList = function (_PureComponent) {
  _inherits(MessageList, _PureComponent);

  function MessageList() {
    _classCallCheck(this, MessageList);

    return _possibleConstructorReturn(this, (MessageList.__proto__ || Object.getPrototypeOf(MessageList)).apply(this, arguments));
  }

  _createClass(MessageList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onInit();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          loading = _props.loading,
          messages = _props.messages,
          onRefresh = _props.onRefresh,
          MessageItem = _props.components.MessageItem;

      return _react2.default.createElement(
        _PullToRefresh2.default,
        { onRefresh: onRefresh, refreshing: loading },
        messages && messages.length > 0 ? _react2.default.createElement(
          _react.Fragment,
          null,
          (messages || []).map(function (id) {
            return _react2.default.createElement(MessageItem, { key: id, id: id });
          })
        ) : null
      );
    }
  }]);

  return MessageList;
}(_react.PureComponent);

MessageList.propTypes = {
  loading: _propTypes2.default.bool.isRequired,
  messages: _propTypes2.default.array,
  onInit: _propTypes2.default.func.isRequired,
  onRefresh: _propTypes2.default.func.isRequired,
  components: _propTypes2.default.shape({
    MessageItem: _propTypes2.default.func
  }).isRequired
};

MessageList.defaultProps = {
  messages: null
};

exports.default = MessageList;