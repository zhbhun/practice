'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toast = undefined;

var _ActionTypes = require('../constants/ActionTypes');

var ActionTypes = _interopRequireWildcard(_ActionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var toast = exports.toast = function toast(message) {
  return {
    type: ActionTypes.APP_TOAST,
    payload: message
  };
};