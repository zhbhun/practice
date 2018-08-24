'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _cnodejs = require('cnodejs.react-material');

var _app = require('../actions/app');

var appActions = _interopRequireWildcard(_app);

var _user = require('../actions/user');

var userActions = _interopRequireWildcard(_user);

var _app2 = require('../selectors/app');

var appSelectors = _interopRequireWildcard(_app2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var mapStateToProps = function mapStateToProps(state) {
  return {
    toast: appSelectors.getToast(state)
  };
};
var mapDispatchProps = function mapDispatchProps(dispatch) {
  return {
    onLoad: function onLoad() {
      return dispatch(userActions.loginOfLast());
    },
    onCloseToast: function onCloseToast() {
      return dispatch(appActions.toast(null));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchProps)(_cnodejs.App);