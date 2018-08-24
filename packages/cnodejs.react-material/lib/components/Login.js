'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _images = require('../images');

var _images2 = _interopRequireDefault(_images);

var _BackButton = require('./BackButton');

var _BackButton2 = _interopRequireDefault(_BackButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  header: {
    height: 200,
    color: '#fff',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'url(' + _images2.default.login_header_bg + ')'
  },
  logo: {
    margin: '0 auto',
    width: 240,
    height: 60,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'url(' + _images2.default.logo + ')'
  },
  form: {
    marginTop: '-40px'
  }
};

var Login = function Login(_ref) {
  var classes = _ref.classes,
      history = _ref.history,
      location = _ref.location,
      match = _ref.match,
      LoginForm = _ref.components.LoginForm;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: classes.header },
      _react2.default.createElement(
        _Toolbar2.default,
        null,
        _react2.default.createElement(_BackButton2.default, null),
        _react2.default.createElement(
          _Typography2.default,
          { variant: 'title', color: 'inherit' },
          '\u767B\u5F55'
        )
      ),
      _react2.default.createElement('div', { className: classes.logo }),
      _react2.default.createElement(
        _Typography2.default,
        { align: 'center', color: 'inherit', variant: 'title' },
        'cnodejs.org'
      )
    ),
    _react2.default.createElement(LoginForm, {
      className: classes.form,
      onLogon: function onLogon() {
        if (location.state && location.state.root) {
          history.replace('/');
        } else {
          history.goBack();
        }
      }
    })
  );
};

Login.propTypes = {
  components: _propTypes2.default.shape({
    LoginForm: _propTypes2.default.func
  }).isRequired
};

exports.default = (0, _styles.withStyles)(styles)(Login);