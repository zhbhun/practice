'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dayjs = require('dayjs');

var _dayjs2 = _interopRequireDefault(_dayjs);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _AppBar = require('@material-ui/core/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Card = require('@material-ui/core/Card');

var _Card2 = _interopRequireDefault(_Card);

var _CardHeader = require('@material-ui/core/CardHeader');

var _CardHeader2 = _interopRequireDefault(_CardHeader);

var _Tabs = require('@material-ui/core/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Tab = require('@material-ui/core/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _BackButton = require('../components/BackButton');

var _BackButton2 = _interopRequireDefault(_BackButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  appBar: {
    paddingBottom: 48
  },
  user: {
    display: 'flex',
    marginTop: '-28px',
    flexDirection: 'column',
    alignItems: 'center'
  },
  userAvatar: {
    margin: '0 auto 10px',
    width: 80,
    height: 80
  },
  userID: {
    margin: '0 auto 5px'
  },
  userGithub: {
    margin: '0 auto 25px',
    color: '#ddd',
    textDecoration: 'underline'
  },
  userMore: {
    margin: '0 0 10px',
    padding: '0 15px',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tabbar: {
    zIndex: 100,
    marginTop: '-48px'
  },
  contentContainer: {
    position: 'relative'
  },
  content: {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  activeContent: {
    display: 'block',
    position: 'static'
  },
  topicContainer: {
    borderRadius: 0
  }
};

var UserDetail = function (_PureComponent) {
  _inherits(UserDetail, _PureComponent);

  function UserDetail(props) {
    _classCallCheck(this, UserDetail);

    var _this = _possibleConstructorReturn(this, (UserDetail.__proto__ || Object.getPrototypeOf(UserDetail)).call(this, props));

    _this.handleTabChange = function (event, nextIndex) {
      var currentIndex = _this.state.tabIndex;

      var scrollEle = document.documentElement;
      var stickyScrollTop = _this.contentContainer.current.offsetTop;
      _this.scrollTop[currentIndex] = scrollEle.scrollTop;
      _this.setState({ tabIndex: nextIndex }, function () {
        if (nextIndex !== currentIndex) {
          if (scrollEle.scrollTop > stickyScrollTop) {
            var lastScrollTop = _this.scrollTop[nextIndex];
            if (lastScrollTop && lastScrollTop > stickyScrollTop) {
              scrollEle.scrollTop = lastScrollTop;
            } else {
              scrollEle.scrollTop = stickyScrollTop;
            }
          }
        }
      });
    };

    _this.renderTopicItem = function (id) {
      var _this$props = _this.props,
          classes = _this$props.classes,
          onOpenTopic = _this$props.onOpenTopic,
          topics = _this$props.topics,
          UserAvatar = _this$props.components.UserAvatar;

      var topic = topics[id];
      if (!topic) return null;
      return _react2.default.createElement(
        _Card2.default,
        {
          key: topic.id,
          className: classes.topicContainer,
          onClick: function onClick() {
            return onOpenTopic(topic.id);
          }
        },
        _react2.default.createElement(_CardHeader2.default, {
          avatar: _react2.default.createElement(UserAvatar, { id: topic.author }),
          title: topic.title,
          subheader: topic.author + '-' + topic.last_reply_at
        })
      );
    };

    _this.state = {
      tabIndex: 0
    };
    _this.scrollTop = {};
    _this.contentContainer = _react2.default.createRef();
    return _this;
  }

  _createClass(UserDetail, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onLoad();
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader() {
      var _props = this.props,
          id = _props.id,
          classes = _props.classes,
          data = _props.data,
          UserAvatar = _props.components.UserAvatar;

      return _react2.default.createElement(
        _AppBar2.default,
        { className: classes.appBar, position: 'static' },
        _react2.default.createElement(
          _Toolbar2.default,
          null,
          _react2.default.createElement(_BackButton2.default, null)
        ),
        _react2.default.createElement(
          'div',
          { className: classes.user },
          _react2.default.createElement(UserAvatar, {
            alt: id,
            id: id,
            className: classes.userAvatar
          }),
          _react2.default.createElement(
            _Typography2.default,
            {
              className: classes.userID,
              align: 'center',
              color: 'inherit',
              variant: 'title'
            },
            id
          ),
          _react2.default.createElement(
            _Typography2.default,
            {
              align: 'center',
              color: 'inherit',
              className: classes.userGithub
            },
            data && data.githubUsername ? data.githubUsername + '@github.com' : ' '
          ),
          _react2.default.createElement(
            'div',
            { className: classes.userMore },
            _react2.default.createElement(
              _Typography2.default,
              { color: 'inherit' },
              _react2.default.createElement(
                'span',
                null,
                '\u6CE8\u518C\u65F6\u95F4\uFF1A'
              ),
              _react2.default.createElement(
                'span',
                null,
                data && data.create_at ? (0, _dayjs2.default)(data.create_at).format('YYYY-MM-DD HH:mm:ss') : ' '
              )
            ),
            _react2.default.createElement(
              _Typography2.default,
              { color: 'inherit' },
              data && data.score ? '\u79EF\u5206\uFF1A' + data.score : ' '
            )
          )
        )
      );
    }
  }, {
    key: 'renderTabs',
    value: function renderTabs() {
      var classes = this.props.classes;

      return _react2.default.createElement(
        _AppBar2.default,
        { className: classes.tabbar, position: 'sticky' },
        _react2.default.createElement(
          _Tabs2.default,
          {
            centered: true,
            fullWidth: true,
            value: this.state.tabIndex,
            onChange: this.handleTabChange
          },
          _react2.default.createElement(_Tab2.default, { label: '\u6700\u8FD1\u56DE\u590D' }),
          _react2.default.createElement(_Tab2.default, { label: '\u6700\u8FD1\u53D1\u5E03' }),
          _react2.default.createElement(_Tab2.default, { label: '\u8BDD\u9898\u6536\u85CF' })
        )
      );
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      var _props2 = this.props,
          classes = _props2.classes,
          data = _props2.data;
      var tabIndex = this.state.tabIndex;

      return _react2.default.createElement(
        'div',
        {
          className: classes.contentContainer,
          ref: this.contentContainer,
          style: { minHeight: document.documentElement.clientHeight - 48 }
        },
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(classes.content, _defineProperty({}, classes.activeContent, tabIndex === 0))
          },
          data ? (data.recent_replies || []).map(this.renderTopicItem) : null
        ),
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(classes.content, _defineProperty({}, classes.activeContent, tabIndex === 1))
          },
          data ? (data.recent_topics || []).map(this.renderTopicItem) : null
        ),
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(classes.content, _defineProperty({}, classes.activeContent, tabIndex === 2))
          },
          data ? (data.collect_topics || []).map(this.renderTopicItem) : null
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.renderHeader(),
        this.renderTabs(),
        this.renderContent()
      );
    }
  }]);

  return UserDetail;
}(_react.PureComponent);

UserDetail.propTypes = {
  id: _propTypes2.default.string.isRequired,
  data: _propTypes2.default.object,
  error: _propTypes2.default.string,
  loading: _propTypes2.default.bool.isRequired,
  onLoad: _propTypes2.default.func.isRequired,
  onRefresh: _propTypes2.default.func.isRequired,
  onOpenTopic: _propTypes2.default.func.isRequired,
  components: _propTypes2.default.shape({
    UserAvatar: _propTypes2.default.func
  }).isRequired
};
exports.default = (0, _styles.withStyles)(styles)(UserDetail);