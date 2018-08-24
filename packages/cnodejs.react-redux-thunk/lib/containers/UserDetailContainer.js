'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _connectedReactRouter = require('connected-react-router');

var _cnodejs = require('cnodejs.react-material');

var _user = require('../actions/user');

var userActions = _interopRequireWildcard(_user);

var _entities = require('../selectors/entities');

var entitiesSelectors = _interopRequireWildcard(_entities);

var _user2 = require('../selectors/user');

var userSelectors = _interopRequireWildcard(_user2);

var _UserAvatarContainer = require('./UserAvatarContainer');

var _UserAvatarContainer2 = _interopRequireDefault(_UserAvatarContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var components = {
  UserAvatar: _UserAvatarContainer2.default
};
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id;
  return {
    topics: entitiesSelectors.getTopics(state),
    error: userSelectors.getDetailError(state, id),
    loading: userSelectors.isDetailLoading(state, id),
    data: entitiesSelectors.getUser(state, id),
    components: components
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var id = _ref2.id;
  return {
    onOpenTopic: function onOpenTopic(id) {
      return dispatch((0, _connectedReactRouter.push)('/topic/' + id));
    },
    onLoad: function onLoad() {
      return dispatch(userActions.loadDetailIfNeed(id));
    },
    onRefresh: function onRefresh() {
      return dispatch(userActions.refreshDetail(id));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_cnodejs.UserDetail);