'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _cnodejs = require('cnodejs.react-material');

var _user = require('../actions/user');

var userActions = _interopRequireWildcard(_user);

var _entities = require('../selectors/entities');

var entitiesSelectors = _interopRequireWildcard(_entities);

var _user2 = require('../selectors/user');

var userSelectors = _interopRequireWildcard(_user2);

var _LoginConfirmContainer = require('./LoginConfirmContainer');

var _LoginConfirmContainer2 = _interopRequireDefault(_LoginConfirmContainer);

var _UserAvatarContainer = require('./UserAvatarContainer');

var _UserAvatarContainer2 = _interopRequireDefault(_UserAvatarContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var components = {
  LoginConfirm: _LoginConfirmContainer2.default,
  UserAvatar: _UserAvatarContainer2.default
};
var mapStateToProps = function mapStateToProps(state) {
  var userLoginname = userSelectors.getSessionUserId(state);
  var user = entitiesSelectors.getUser(state, userLoginname);
  return {
    user: userLoginname,
    userScore: user && user.score,
    userLogining: userSelectors.isSessionLogining(state),
    components: components
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onLogout: function onLogout() {
      return dispatch(userActions.logout());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_cnodejs.MainDrawer);