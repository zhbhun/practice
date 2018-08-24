'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _Card = require('@material-ui/core/Card');

var _Card2 = _interopRequireDefault(_Card);

var _CardActions = require('@material-ui/core/CardActions');

var _CardActions2 = _interopRequireDefault(_CardActions);

var _CardHeader = require('@material-ui/core/CardHeader');

var _CardHeader2 = _interopRequireDefault(_CardHeader);

var _CardContent = require('@material-ui/core/CardContent');

var _CardContent2 = _interopRequireDefault(_CardContent);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Favorite = require('@material-ui/icons/Favorite');

var _Favorite2 = _interopRequireDefault(_Favorite);

var _timeago = require('../utils/timeago');

var _timeago2 = _interopRequireDefault(_timeago);

var _PullToRefresh = require('./PullToRefresh');

var _PullToRefresh2 = _interopRequireDefault(_PullToRefresh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  contentContainer: {
    marginBottom: 10,
    borderRadius: 0
  }
};

var TopicDetail = function (_PureComponent) {
  _inherits(TopicDetail, _PureComponent);

  function TopicDetail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TopicDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TopicDetail.__proto__ || Object.getPrototypeOf(TopicDetail)).call.apply(_ref, [this].concat(args))), _this), _this.handleAvatarClick = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          onOpenUser = _this$props.onOpenUser;

      if (data && data.author) {
        onOpenUser(data.author);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TopicDetail, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onLoad();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.id !== this.props.id) {
        this.props.onLoad();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          loading = _props.loading,
          data = _props.data,
          classes = _props.classes,
          onRefresh = _props.onRefresh,
          onCollect = _props.onCollect,
          _props$components = _props.components,
          LoginConfirm = _props$components.LoginConfirm,
          ReplyItem = _props$components.ReplyItem,
          UserAvatar = _props$components.UserAvatar;

      var content = null;
      if (data) {
        var replies = data.replies || [];
        content = _react2.default.createElement(
          _react.Fragment,
          null,
          _react2.default.createElement(
            _Card2.default,
            { className: classes.contentContainer },
            _react2.default.createElement(_CardHeader2.default, { title: data.title }),
            _react2.default.createElement(_CardHeader2.default, {
              avatar: _react2.default.createElement(UserAvatar, {
                id: data.author,
                onClick: this.handleAvatarClick
              }),
              title: data.author,
              subheader: (0, _timeago2.default)(data.create_at),
              action: _react2.default.createElement(
                _CardActions2.default,
                null,
                _react2.default.createElement(
                  LoginConfirm,
                  { onClick: onCollect },
                  _react2.default.createElement(
                    _IconButton2.default,
                    { color: data.is_collect ? 'primary' : undefined },
                    _react2.default.createElement(_Favorite2.default, null)
                  )
                )
              )
            }),
            _react2.default.createElement(
              _CardContent2.default,
              null,
              _react2.default.createElement(_Typography2.default, {
                component: 'p',
                dangerouslySetInnerHTML: { __html: data.content }
              })
            )
          ),
          _react2.default.createElement(
            _Card2.default,
            { className: classes.contentContainer },
            replies.length === 0 ? _react2.default.createElement(_CardHeader2.default, { align: 'center', title: '\u6682\u65E0\u56DE\u590D' }) : _react2.default.createElement(
              _react.Fragment,
              null,
              _react2.default.createElement(_CardHeader2.default, { title: replies.length + '\u6761\u56DE\u590D' }),
              replies.map(function (id) {
                return _react2.default.createElement(ReplyItem, { key: id, id: id });
              })
            )
          )
        );
      }
      return _react2.default.createElement(
        _PullToRefresh2.default,
        { onRefresh: onRefresh, refreshing: loading },
        content
      );
    }
  }]);

  return TopicDetail;
}(_react.PureComponent);

TopicDetail.propTypes = {
  id: _propTypes2.default.string.isRequired,
  error: _propTypes2.default.string,
  loading: _propTypes2.default.bool.isRequired,
  data: _propTypes2.default.object,
  onLoad: _propTypes2.default.func.isRequired,
  onRefresh: _propTypes2.default.func.isRequired,
  onOpenUser: _propTypes2.default.func.isRequired,
  onCollect: _propTypes2.default.func.isRequired,
  components: _propTypes2.default.shape({
    LoginConfirm: _propTypes2.default.func,
    ReplyItem: _propTypes2.default.func,
    UserAvatar: _propTypes2.default.func
  }).isRequired
};
exports.default = (0, _styles.withStyles)(styles)(TopicDetail);