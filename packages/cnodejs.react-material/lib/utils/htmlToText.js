'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var caches = {};

exports.default = function (html) {
  if (caches[html]) return caches[html];
  var container = document.createElement('div');
  container.innerHTML = html;
  caches[html] = container.innerText;
  return caches[html];
};