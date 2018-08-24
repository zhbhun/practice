'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var _ActionTypes = require('../constants/ActionTypes');

var ActionTypes = _interopRequireWildcard(_ActionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultState = exports.defaultState = {
  session: {
    id: null,
    logining: false,
    loginError: null
  },
  detail: {
    error: null,
    loading: false
  }
};

var session = function session() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState.session;
  var action = arguments[1];

  switch (action.type) {
    case ActionTypes.USER_LOGIN_REQUEST:
      return _extends({}, state, {
        logining: true,
        loginError: null
      });
    case ActionTypes.USER_LOGIN_FAILURE:
      return _extends({}, state, {
        logining: false,
        loginError: action.payload.message
      });
    case ActionTypes.USER_LOGIN_SUCCESS:
      return _extends({}, state, {
        id: action.meta.id,
        logining: false,
        loginError: null
      });
    case ActionTypes.USRE_LOGOUT:
      return _extends({}, state, {
        id: null,
        logining: false,
        loginError: null
      });
    default:
      break;
  }
  return state;
};

var _detail = function _detail() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState.detail;
  var action = arguments[1];

  switch (action.type) {
    case ActionTypes.TOPIC_LOAD_REQUEST:
      return _extends({}, state, {
        error: null,
        loading: true
      });
    case ActionTypes.TOPIC_LOAD_FAILURE:
      return _extends({}, state, {
        error: action.payload.message,
        loading: false
      });
    case ActionTypes.TOPIC_LOAD_SUCCESS:
      return _extends({}, state, {
        error: null,
        loading: false
      });
    default:
      break;
  }
  return state;
};

exports.default = (0, _redux.combineReducers)({
  session: session,
  detail: function detail() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
      case ActionTypes.USER_LOAD_REQUEST:
      case ActionTypes.USER_LOAD_FAILURE:
      case ActionTypes.USER_LOAD_SUCCESS:
        {
          var id = action.meta.id;

          return _extends({}, state, _defineProperty({}, id, _detail(state[id], action)));
        }
      default:
        break;
    }
    return state;
  }
});