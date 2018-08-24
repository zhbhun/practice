'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} state
 * @param {Object} state.users
 * @param {Object} state.replies
 * @param {Object} state.topics
 */
exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  if (action.payload && action.payload.entities) {
    return (0, _lodash2.default)({}, state, action.payload.entities);
  }
  return state;
};