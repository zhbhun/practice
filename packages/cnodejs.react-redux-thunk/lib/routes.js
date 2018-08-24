'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Home = require('./pages/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Topic = require('./pages/Topic');

var _Topic2 = _interopRequireDefault(_Topic);

var _User = require('./pages/User');

var _User2 = _interopRequireDefault(_User);

var _Login = require('./pages/Login');

var _Login2 = _interopRequireDefault(_Login);

var _Message = require('./pages/Message');

var _Message2 = _interopRequireDefault(_Message);

var _Setting = require('./pages/Setting');

var _Setting2 = _interopRequireDefault(_Setting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  exact: true,
  path: '/',
  component: _Home2.default
}, {
  path: '/topic/:id',
  component: _Topic2.default
}, {
  path: '/user/:id',
  component: _User2.default
}, {
  path: '/login',
  component: _Login2.default
}, {
  path: '/message',
  component: _Message2.default
}, {
  path: '/setting',
  component: _Setting2.default
}];