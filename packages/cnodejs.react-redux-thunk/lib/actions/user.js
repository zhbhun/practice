'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.loginOfLast = exports.login = exports.loadDetailIfNeed = exports.refreshDetail = exports.loadDetail = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _cnodejs = require('cnodejs.api');

var api = _interopRequireWildcard(_cnodejs);

var _schemas = require('../constants/schemas');

var schemas = _interopRequireWildcard(_schemas);

var _ActionTypes = require('../constants/ActionTypes');

var ActionTypes = _interopRequireWildcard(_ActionTypes);

var _entities = require('../selectors/entities');

var entitiesSelectors = _interopRequireWildcard(_entities);

var _user = require('../selectors/user');

var userSelectors = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var loadDetail = function loadDetail(id) {
  return function (dispatch, getState) {
    if (!userSelectors.isDetailLoading(getState(), id)) {
      dispatch({ type: ActionTypes.USER_LOAD_REQUEST, meta: { id: id } });
      return Promise.all([api.loadUserDetail(id), api.loadUserCollections(id)]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            user = _ref2[0],
            collects = _ref2[1];

        var userData = _extends({}, user, {
          collect_topics: collects.map(function (_ref3) {
            var content = _ref3.content,
                topics = _objectWithoutProperties(_ref3, ['content']);

            return _extends({}, topics, {
              content_markdown: content
            });
          })
        });
        dispatch({
          type: ActionTypes.USER_LOAD_SUCCESS,
          payload: schemas.createUser(userData),
          meta: { id: id }
        });
      }).catch(function (error) {
        dispatch({
          type: ActionTypes.USER_LOAD_FAILURE,
          payload: error,
          meta: {
            id: id,
            toast: error.message
          }
        });
      });
    }
    return null;
  };
};

exports.loadDetail = loadDetail;
var refreshDetail = exports.refreshDetail = loadDetail;

var loadDetailIfNeed = exports.loadDetailIfNeed = function loadDetailIfNeed(id) {
  return function (dispatch, getState) {
    var user = entitiesSelectors.getUser(getState(), id);
    if (!user || !(user.score >= 0)) {
      return dispatch(loadDetail(id));
    }
    return null;
  };
};

var login = exports.login = function login(accesstoken) {
  return function (dispatch, getState) {
    if (!userSelectors.isSessionLogining(getState())) {
      dispatch({ type: ActionTypes.USER_LOGIN_REQUEST });
      api.login(accesstoken).then(function (data) {
        dispatch(loadDetailIfNeed(data.loginname));
        dispatch({
          type: ActionTypes.USER_LOGIN_SUCCESS,
          payload: schemas.createUser(data),
          meta: { id: data.loginname }
        });
      }).catch(function (error) {
        dispatch({
          type: ActionTypes.USER_LOGIN_FAILURE,
          payload: error
        });
      });
    }
  };
};

var loginOfLast = exports.loginOfLast = function loginOfLast() {
  return function (dispatch) {
    var accessToken = api.getAccessToken();
    if (accessToken) {
      dispatch(login(accessToken));
    }
  };
};

var logout = exports.logout = function logout() {
  return function (dispatch) {
    api.logout();
    dispatch({ type: ActionTypes.USRE_LOGOUT });
  };
};