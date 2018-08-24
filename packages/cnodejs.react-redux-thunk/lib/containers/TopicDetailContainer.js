'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _connectedReactRouter = require('connected-react-router');

var _cnodejs = require('cnodejs.react-material');

var _topic = require('../actions/topic');

var topicActions = _interopRequireWildcard(_topic);

var _entities = require('../selectors/entities');

var entitiesSelectors = _interopRequireWildcard(_entities);

var _topic2 = require('../selectors/topic');

var topicSelectors = _interopRequireWildcard(_topic2);

var _LoginConfirmContainer = require('./LoginConfirmContainer');

var _LoginConfirmContainer2 = _interopRequireDefault(_LoginConfirmContainer);

var _ReplyItemContainer = require('./ReplyItemContainer');

var _ReplyItemContainer2 = _interopRequireDefault(_ReplyItemContainer);

var _UserAvatarContainer = require('./UserAvatarContainer');

var _UserAvatarContainer2 = _interopRequireDefault(_UserAvatarContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var components = {
  LoginConfirm: _LoginConfirmContainer2.default,
  ReplyItem: _ReplyItemContainer2.default,
  UserAvatar: _UserAvatarContainer2.default
};
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id;
  return {
    error: topicSelectors.getDetailError(state, id),
    loading: topicSelectors.isDetailLoading(state, id),
    data: entitiesSelectors.getTopic(state, id),
    components: components
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var id = _ref2.id;
  return {
    onLoad: function onLoad() {
      return dispatch(topicActions.loadDetailIfNeed(id));
    },
    onRefresh: function onRefresh() {
      return dispatch(topicActions.refreshDetail(id));
    },
    onOpenUser: function onOpenUser(loginname) {
      return dispatch((0, _connectedReactRouter.push)('/user/' + loginname));
    },
    onCollect: function onCollect() {
      return dispatch(topicActions.collect(id));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_cnodejs.TopicDetail);