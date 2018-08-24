'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timeago = require('timeago.js');

var _timeago2 = _interopRequireDefault(_timeago);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (date) {
  var timeagoInstance = (0, _timeago2.default)(Date.now());
  return timeagoInstance.format(date, 'zh_CN');
};