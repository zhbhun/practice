'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _cnodejs = require('cnodejs.react-material');

var _message = require('../actions/message');

var messageActions = _interopRequireWildcard(_message);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref) {
  var id = _ref.id;
  return {
    onClick: function onClick() {
      return dispatch(messageActions.maskAllRead());
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(_cnodejs.MessageMark);