'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maskAllRead = exports.openMessage = exports.loadIfNeed = exports.refresh = exports.load = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _cnodejs = require('cnodejs.api');

var api = _interopRequireWildcard(_cnodejs);

var _connectedReactRouter = require('connected-react-router');

var _schemas = require('../constants/schemas');

var schemas = _interopRequireWildcard(_schemas);

var _ActionTypes = require('../constants/ActionTypes');

var ActionTypes = _interopRequireWildcard(_ActionTypes);

var _entities = require('../selectors/entities');

var entitiesSelectors = _interopRequireWildcard(_entities);

var _message = require('../selectors/message');

var messageSelectors = _interopRequireWildcard(_message);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var load = exports.load = function load(id) {
  return function (dispatch, getState) {
    if (!messageSelectors.isLoading(getState())) {
      dispatch({ type: ActionTypes.MESSAGE_LOAD_REQUEST });
      api.loadMessages().then(function (data) {
        var hasnot_read_messages = data.hasnot_read_messages;

        dispatch({
          type: ActionTypes.MESSAGE_LOAD_SUCCESS,
          payload: schemas.createMessages(hasnot_read_messages)
        });
      }).catch(function (error) {
        dispatch({
          type: ActionTypes.MESSAGE_LOAD_FAILURE,
          payload: error,
          meta: { toast: error.message }
        });
      });
    }
  };
};

var refresh = exports.refresh = load;

var loadIfNeed = exports.loadIfNeed = function loadIfNeed() {
  return function (dispatch, getState) {
    if (!messageSelectors.getData(getState())) {
      dispatch(load());
    }
  };
};

var openMessage = exports.openMessage = function openMessage(id) {
  return function (dispatch, getState) {
    var message = entitiesSelectors.getMessage(getState(), id);
    if (!message.has_read) {
      dispatch({
        type: ActionTypes.MESSAGE_MARK_READ,
        payload: schemas.createMessage(Object.assign({}, message, {
          has_read: true
        }))
      });
      api.markMessage(id);
    }
    dispatch((0, _connectedReactRouter.push)('/topic/' + message.topic.id));
  };
};

var maskAllRead = exports.maskAllRead = function maskAllRead() {
  return function (dispatch, getState) {
    var state = getState();
    var messages = messageSelectors.getData(state);
    if (messages && messages.length > 0) {
      dispatch({
        type: ActionTypes.MESSAGE_MARK_READ,
        payload: schemas.createMessages(messages.map(function (id) {
          var message = entitiesSelectors.getMessage(state, id);
          return _extends({}, message, {
            has_read: true
          });
        }))
      });
      api.markAllMessage();
    }
  };
};