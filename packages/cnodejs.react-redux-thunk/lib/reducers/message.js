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
  error: null,
  loading: false,
  data: null
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case ActionTypes.MESSAGE_LOAD_REQUEST:
      return _extends({}, state, {
        error: null,
        loading: true
      });
    case ActionTypes.MESSAGE_LOAD_FAILURE:
      return _extends({}, state, {
        error: action.payload,
        loading: false
      });
    case ActionTypes.MESSAGE_LOAD_SUCCESS:
      {
        var result = action.payload.result;

        return _extends({}, state, {
          error: null,
          loading: false,
          data: result || []
        });
      }
    default:
      break;
  }
  return state;
};