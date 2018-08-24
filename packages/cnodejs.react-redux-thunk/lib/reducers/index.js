'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _entities = require('./entities');

var _entities2 = _interopRequireDefault(_entities);

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _topic = require('./topic');

var _topic2 = _interopRequireDefault(_topic);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  app: _app2.default,
  entities: _entities2.default,
  message: _message2.default,
  topic: _topic2.default,
  user: _user2.default
});