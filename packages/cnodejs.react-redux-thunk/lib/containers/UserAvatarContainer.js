'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _cnodejs = require('cnodejs.react-material');

var _entities = require('../selectors/entities');

var entitiesSelectors = _interopRequireWildcard(_entities);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id;

  var user = id ? entitiesSelectors.getUser(state, id) : null;
  return {
    src: user && user.avatar_url ? user.avatar_url : _cnodejs.images.image_placeholder
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(_cnodejs.UserAvatar);