'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _cnodejs = require('cnodejs.react-material');

var _app = require('../actions/app');

var appActions = _interopRequireWildcard(_app);

var _topic = require('../actions/topic');

var topicActions = _interopRequireWildcard(_topic);

var _entities = require('../selectors/entities');

var entitiesySelectors = _interopRequireWildcard(_entities);

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
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id;
  return {
    data: entitiesySelectors.getReply(state, id),
    components: components
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var id = _ref2.id;
  return {
    onToast: function onToast(message) {
      return dispatch(appActions.toast(message));
    },
    onLike: function onLike() {
      return dispatch(topicActions.likeReply(id));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_cnodejs.ReplyItem);