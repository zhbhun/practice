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

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Card = require('@material-ui/core/Card');

var _Card2 = _interopRequireDefault(_Card);

var _CardContent = require('@material-ui/core/CardContent');

var _CardContent2 = _interopRequireDefault(_CardContent);

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogContentText = require('@material-ui/core/DialogContentText');

var _DialogContentText2 = _interopRequireDefault(_DialogContentText);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  formCard: {
    margin: 'auto',
    width: 304
  },
  commitButton: {
    marginTop: 15
  },
  formTip: {
    margin: '20px auto',
    textDecoration: 'underline'
  },
  logininContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  logininContentText: {
    marginLeft: 20
  }
};

var LoginForm = function (_PureComponent) {
  _inherits(LoginForm, _PureComponent);

  function LoginForm(props) {
    _classCallCheck(this, LoginForm);

    var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

    _this.handleAccessTokenChange = function (event) {
      _this.setState({ accesstoken: event.target.value });
    };

    _this.handleOpenTip = function () {
      return _this.setState({ tipOpen: true });
    };

    _this.handleCloseTip = function () {
      return _this.setState({ tipOpen: false });
    };

    _this.state = {
      tipOpen: false,
      accesstoken: ''
    };
    return _this;
  }

  _createClass(LoginForm, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (!prevProps.logon && this.props.logon) {
        this.props.onLogon();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          classes = _props.classes,
          className = _props.className,
          logining = _props.logining,
          loginError = _props.loginError,
          onLogin = _props.onLogin;

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          _Card2.default,
          { className: classes.formCard },
          _react2.default.createElement(
            _CardContent2.default,
            null,
            _react2.default.createElement(
              'form',
              null,
              _react2.default.createElement(_TextField2.default, {
                error: !!loginError,
                helperText: loginError ? loginError : '',
                id: 'accesstoken',
                label: 'Access Token\uFF1A',
                fullWidth: true,
                margin: 'normal',
                value: this.state.accesstoken,
                onChange: this.handleAccessTokenChange
              }),
              _react2.default.createElement(
                _Button2.default,
                {
                  variant: 'contained',
                  color: 'primary',
                  className: classes.commitButton,
                  fullWidth: true,
                  onClick: function onClick() {
                    return onLogin(_this2.state.accesstoken);
                  }
                },
                '\u767B\u5F55'
              )
            )
          )
        ),
        _react2.default.createElement(
          _Typography2.default,
          {
            className: classes.formTip,
            align: 'center',
            color: 'primary',
            onClick: this.handleOpenTip
          },
          '\u5982\u4F55\u83B7\u53D6 Access Token\uFF1F'
        ),
        _react2.default.createElement(
          _Dialog2.default,
          { open: this.state.tipOpen, onClose: this.handleCloseTip },
          _react2.default.createElement(
            _DialogContent2.default,
            null,
            _react2.default.createElement(
              _DialogContentText2.default,
              null,
              '\u5728 CNode \u793E\u533A\u7F51\u7AD9\u7AEF\u767B\u5F55\u4F60\u7684\u8D26\u6237\uFF0C\u7136\u540E\u5728\u53F3\u4E0A\u89D2\u627E\u5230\u201C\u8BBE\u7F6E\u201D\u6309\u94AE\uFF0C\u70B9\u51FB\u8FDB\u5165\u540E\u5C06\u9875\u9762\u6ED1\u52A8\u5230\u6700\u5E95\u90E8\u6765\u67E5\u770B\u4F60\u7684 Access Token\u3002'
            )
          ),
          _react2.default.createElement(
            _DialogActions2.default,
            null,
            _react2.default.createElement(
              _Button2.default,
              { onClick: this.handleCloseTip, color: 'primary', autoFocus: true },
              '\u786E\u5B9A'
            )
          )
        ),
        _react2.default.createElement(
          _Dialog2.default,
          { open: logining, disableBackdropClick: true, disableEscapeKeyDown: true },
          _react2.default.createElement(
            _DialogContent2.default,
            { className: classes.logininContent },
            _react2.default.createElement(_CircularProgress2.default, { size: 24 }),
            _react2.default.createElement(
              _DialogContentText2.default,
              { className: classes.logininContentText },
              '\u6B63\u5728\u52A0\u8F7D\u4E2D'
            )
          )
        )
      );
    }
  }]);

  return LoginForm;
}(_react.PureComponent);

LoginForm.propTypes = {
  logon: _propTypes2.default.bool.isRequired,
  logining: _propTypes2.default.bool.isRequired,
  loginError: _propTypes2.default.string,
  onLogin: _propTypes2.default.func.isRequired,
  onLogon: _propTypes2.default.func.isRequired
};
exports.default = (0, _styles.withStyles)(styles)(LoginForm);