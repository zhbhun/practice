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

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginConfirm = function (_PureComponent) {
  _inherits(LoginConfirm, _PureComponent);

  function LoginConfirm(props) {
    _classCallCheck(this, LoginConfirm);

    var _this = _possibleConstructorReturn(this, (LoginConfirm.__proto__ || Object.getPrototypeOf(LoginConfirm)).call(this, props));

    _this.handleClick = function (event) {
      event.stopPropagation();
      var _this$props = _this.props,
          logon = _this$props.logon,
          onClick = _this$props.onClick;

      if (logon) {
        onClick(event);
      } else {
        _this.setState({ visible: true });
      }
    };

    _this.handleCancel = function () {
      _this.setState({ visible: false });
    };

    _this.handleLogon = function () {
      _this.setState({ visible: false });
      _this.props.onLogin();
    };

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(LoginConfirm, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          logon = _props.logon,
          onLogin = _props.onLogin,
          onClick = _props.onClick,
          children = _props.children,
          props = _objectWithoutProperties(_props, ['logon', 'onLogin', 'onClick', 'children']);

      var visible = this.state.visible;

      return _react2.default.createElement(
        _react.Fragment,
        null,
        !logon && visible ? _react2.default.createElement(
          _Dialog2.default,
          { open: visible, onClose: this.handleCancel },
          _react2.default.createElement(
            _DialogTitle2.default,
            null,
            '\u8BE5\u64CD\u4F5C\u9700\u8981\u767B\u5F55\u5E10\u6237\u3002\u662F\u5426\u73B0\u5728\u767B\u5F55\uFF1F'
          ),
          _react2.default.createElement(
            _DialogActions2.default,
            null,
            _react2.default.createElement(
              _Button2.default,
              { onClick: this.handleCancel, color: 'primary' },
              '\u53D6\u6D88'
            ),
            _react2.default.createElement(
              _Button2.default,
              { onClick: this.handleLogon, color: 'primary', autoFocus: true },
              '\u767B\u5F55'
            )
          )
        ) : null,
        (0, _react.cloneElement)(_react.Children.only(children), _extends({}, props, {
          onClick: this.handleClick
        }))
      );
    }
  }]);

  return LoginConfirm;
}(_react.PureComponent);

LoginConfirm.propTypes = {
  logon: _propTypes2.default.bool.isRequired,
  onLogin: _propTypes2.default.func.isRequired,
  onClick: _propTypes2.default.func.isRequired
};
exports.default = LoginConfirm;