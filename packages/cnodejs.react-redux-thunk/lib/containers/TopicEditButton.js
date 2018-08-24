'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _cnodejs = require('cnodejs.react-material');

var _app = require('../actions/app');

var appActions = _interopRequireWildcard(_app);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onToast: function onToast(message) {
      return dispatch(appActions.toast(message));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(_cnodejs.TopicEditButton);