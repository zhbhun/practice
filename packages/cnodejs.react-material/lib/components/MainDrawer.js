'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

var _Divider = require('@material-ui/core/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemIcon = require('@material-ui/core/ListItemIcon');

var _ListItemIcon2 = _interopRequireDefault(_ListItemIcon);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _Dashboard = require('@material-ui/icons/Dashboard');

var _Dashboard2 = _interopRequireDefault(_Dashboard);

var _Message = require('@material-ui/icons/Message');

var _Message2 = _interopRequireDefault(_Message);

var _QuestionAnswer = require('@material-ui/icons/QuestionAnswer');

var _QuestionAnswer2 = _interopRequireDefault(_QuestionAnswer);

var _SettingsRounded = require('@material-ui/icons/SettingsRounded');

var _SettingsRounded2 = _interopRequireDefault(_SettingsRounded);

var _Share = require('@material-ui/icons/Share');

var _Share2 = _interopRequireDefault(_Share);

var _Star = require('@material-ui/icons/Star');

var _Star2 = _interopRequireDefault(_Star);

var _Work = require('@material-ui/icons/Work');

var _Work2 = _interopRequireDefault(_Work);

var _SwipeableDrawer = require('@material-ui/core/SwipeableDrawer');

var _SwipeableDrawer2 = _interopRequireDefault(_SwipeableDrawer);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  header: {
    height: 147,
    padding: 16,
    backgroundSize: 'cover',
    backgroundPosition: 'left bottom',
    backgroundImage: 'url(' + require('../images/main_nav_header_bg.png') + ')'
  },
  avatar: {
    marginBottom: 15,
    width: 64,
    height: 64
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  username: {
    color: '#fff',
    fontSize: 15
  },
  userScrore: {
    color: '#eee',
    fontSize: 15
  },
  logout: {
    height: 44,
    width: 60,
    textAlign: 'center'
  },
  logoutText: {
    color: '#eee',
    fontSize: 15,
    lineHeight: '44px'
  },
  menus: {
    width: Math.min(304, window.innerWidth - 56)
  },
  activeMenuItem: {
    backgroundColor: 'rgba(102, 31, 255, 0.12)'
  },
  hidden: {
    display: 'none'
  }
};

var MenuItem = (0, _reactRouterDom.withRouter)((0, _styles.withStyles)(styles)(function (_ref) {
  var classes = _ref.classes,
      _ref$current = _ref.current,
      current = _ref$current === undefined ? false : _ref$current,
      _ref$logon = _ref.logon,
      logon = _ref$logon === undefined ? false : _ref$logon,
      history = _ref.history,
      location = _ref.location,
      url = _ref.url,
      title = _ref.title,
      icon = _ref.icon,
      Container = _ref.Container;

  var menu = _react2.default.createElement(
    _ListItem2.default,
    {
      className: (0, _classnames2.default)(_defineProperty({}, classes.activeMenuItem, url === '' + location.pathname + location.search || !location.search && url === '/?tab=all')),
      button: true
    },
    _react2.default.createElement(
      _ListItemIcon2.default,
      null,
      icon
    ),
    _react2.default.createElement(_ListItemText2.default, { primary: title })
  );
  var onClick = function onClick() {
    if (current) {
      history.replace(url);
    } else {
      history.push(url);
    }
  };
  if (logon) {
    return _react2.default.createElement(
      Container,
      { onClick: onClick },
      menu
    );
  }
  return (0, _react.cloneElement)(menu, { onClick: onClick });
}));

var MainDrawer = function MainDrawer(_ref2) {
  var staticContext = _ref2.staticContext,
      className = _ref2.className,
      classes = _ref2.classes,
      dispatch = _ref2.dispatch,
      history = _ref2.history,
      onClose = _ref2.onClose,
      visible = _ref2.visible,
      user = _ref2.user,
      userScore = _ref2.userScore,
      userLogining = _ref2.userLogining,
      onLogout = _ref2.onLogout,
      _ref2$components = _ref2.components,
      UserAvatar = _ref2$components.UserAvatar,
      LoginConfirm = _ref2$components.LoginConfirm,
      props = _objectWithoutProperties(_ref2, ['staticContext', 'className', 'classes', 'dispatch', 'history', 'onClose', 'visible', 'user', 'userScore', 'userLogining', 'onLogout', 'components']);

  return _react2.default.createElement(
    _SwipeableDrawer2.default,
    _extends({}, props, {
      className: !visible ? classes.hidden : null,
      onClose: onClose
    }),
    _react2.default.createElement(
      'div',
      { className: classes.header },
      _react2.default.createElement(UserAvatar, {
        alt: '',
        className: classes.avatar,
        id: user,
        onClick: function onClick() {
          return !user && !userLogining ? history.push('/login') : history.push('/user/' + user);
        }
      }),
      user ? _react2.default.createElement(
        'div',
        { className: classes.user },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _Typography2.default,
            { className: classes.username },
            user
          ),
          _react2.default.createElement(
            _Typography2.default,
            { className: classes.userScrore },
            '\u79EF\u5206\uFF1A' + (userScore || 0)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: classes.logout, onClick: onLogout },
          _react2.default.createElement(
            _Typography2.default,
            { className: classes.logoutText },
            '\u6CE8\u9500'
          )
        )
      ) : _react2.default.createElement(
        _Typography2.default,
        { className: classes.username },
        userLogining ? '登录中...' : '点击头像登录'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: classes.menus, onClick: onClose },
      _react2.default.createElement(
        _List2.default,
        { component: 'nav' },
        _react2.default.createElement(MenuItem, { url: '/?tab=all', icon: _react2.default.createElement(_Dashboard2.default, null), title: '\u5168\u90E8', current: true }),
        _react2.default.createElement(MenuItem, { url: '/?tab=good', icon: _react2.default.createElement(_Star2.default, null), title: '\u7CBE\u534E', current: true }),
        _react2.default.createElement(MenuItem, { url: '/?tab=share', icon: _react2.default.createElement(_Share2.default, null), title: '\u5206\u4EAB', current: true }),
        _react2.default.createElement(MenuItem, {
          url: '/?tab=ask',
          icon: _react2.default.createElement(_QuestionAnswer2.default, null),
          title: '\u95EE\u7B54',
          current: true
        }),
        _react2.default.createElement(MenuItem, { url: '/?tab=job', icon: _react2.default.createElement(_Work2.default, null), title: '\u62DB\u8058', current: true })
      ),
      _react2.default.createElement(_Divider2.default, null),
      _react2.default.createElement(
        _List2.default,
        { component: 'nav' },
        _react2.default.createElement(MenuItem, {
          logon: true,
          url: '/message',
          icon: _react2.default.createElement(_Message2.default, null),
          title: '\u6D88\u606F',
          Container: LoginConfirm
        }),
        _react2.default.createElement(MenuItem, { url: '/setting', icon: _react2.default.createElement(_SettingsRounded2.default, null), title: '\u8BBE\u7F6E' })
      )
    )
  );
};

MainDrawer.propTypes = _extends({}, _SwipeableDrawer2.default.propTypes, {
  user: _propTypes2.default.string,
  userScore: _propTypes2.default.number,
  userLogining: _propTypes2.default.bool.isRequired,
  onLogout: _propTypes2.default.func.isRequired,
  components: _propTypes2.default.shape({
    LoginConfirm: _propTypes2.default.func,
    UserAvatar: _propTypes2.default.func
  }).isRequired
});

exports.default = (0, _reactRouterDom.withRouter)((0, _styles.withStyles)(styles)(MainDrawer));