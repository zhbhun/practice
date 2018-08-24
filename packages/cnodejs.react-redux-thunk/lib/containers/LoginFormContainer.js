'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _cnodejs = require('cnodejs.react-material');

var _user = require('../actions/user');

var userActions = _interopRequireWildcard(_user);

var _user2 = require('../selectors/user');

var userSelectors = _interopRequireWildcard(_user2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var mapStateToProps = function mapStateToProps(state) {
  return {
    logon: userSelectors.isSessionLogon(state),
    logining: userSelectors.isSessionLogining(state),
    loginError: userSelectors.getSessionLoginError(state)
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onLogin: function onLogin(accesstoken) {
      return dispatch(userActions.login(accesstoken));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_cnodejs.LoginForm);