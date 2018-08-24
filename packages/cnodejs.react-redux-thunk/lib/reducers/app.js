'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ActionTypes = require('../constants/ActionTypes');

var ActionTypes = _interopRequireWildcard(_ActionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var defaultState = exports.defaultState = {
  toast: null
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  var newState = state;
  if (action.meta && action.meta.toast !== undefined) {
    newState = _extends({}, newState, {
      toast: action.meta.toast
    });
  }
  switch (action.type) {
    case ActionTypes.APP_TOAST:
      return _extends({}, newState, {
        toast: action.payload
      });
    default:
      break;
  }
  return newState;
};