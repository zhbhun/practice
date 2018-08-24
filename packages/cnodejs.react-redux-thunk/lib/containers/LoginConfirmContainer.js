'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _connectedReactRouter = require('connected-react-router');

var _cnodejs = require('cnodejs.react-material');

var _user = require('../selectors/user');

var userSelectors = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var mapStateToProps = function mapStateToProps(state) {
  return {
    logon: userSelectors.isSessionLogon(state)
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onLogin: function onLogin() {
      return dispatch((0, _connectedReactRouter.push)('/login'));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_cnodejs.LoginConfirm);