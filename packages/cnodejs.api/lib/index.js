'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PREFIX = 'cnodejs.practice.com';
var ACCESS_TOKEN = PREFIX + '.ACCESS_TOKEN';
var BASE_URL = 'https://cnodejs.org/api/v1';

var setAccessToken = function setAccessToken(accessToken) {
  return localStorage.setItem(ACCESS_TOKEN, accessToken);
};

var getAccessToken = exports.getAccessToken = function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
};

var request = exports.request = function request(path) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { method: 'GET' };
  var originalReturn = arguments[2];

  var url = '' + BASE_URL + path;
  var accesstoken = getAccessToken();
  if (options.method === 'GET' && accesstoken) {
    url += (url.indexOf('?') >= 0 ? '&' : '?') + 'accesstoken=' + accesstoken;
  }
  return fetch(url, options).then(function (response) {
    if (!/application\/json/.test(response.headers.get('Content-Type'))) {
      throw new Error('系统错误');
    }
    return response.json();
  }).then(function (response) {
    if (originalReturn) {
      return response;
    }
    var success = response.success,
        error_msg = response.error_msg,
        data = response.data;

    if (!success) {
      throw new Error(error_msg);
    }
    return data;
  });
};

var loadTopicList = exports.loadTopicList = function loadTopicList(tab, page, size) {
  return request('/topics?page=' + page + '&limit=' + size + (tab ? '&tab=' + tab : ''));
};

var loadTopicDetail = exports.loadTopicDetail = function loadTopicDetail(id) {
  return request('/topic/' + id);
};

var collectTopic = exports.collectTopic = function collectTopic(id, isCollect) {
  return request('/topic_collect/' + (isCollect ? 'collect' : 'de_collect'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'accesstoken=' + getAccessToken() + '&topic_id=' + id
  }, true).then(function (response) {
    var success = response.success,
        error_msg = response.error_msg;

    if (!success && error_msg) {
      throw new Error(error_msg);
    }
    return response;
  });
};

var likeReply = exports.likeReply = function likeReply(id) {
  return request('/reply/' + id + '/ups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'accesstoken=' + getAccessToken()
  }, true).then(function (response) {
    var success = response.success,
        error_msg = response.error_msg,
        action = response.action;

    if (!success && error_msg) {
      throw new Error(error_msg);
    }
    return action;
  });
};

var loadUserDetail = exports.loadUserDetail = function loadUserDetail(id) {
  return request('/user/' + id);
};

var loadUserCollections = exports.loadUserCollections = function loadUserCollections(id) {
  return request('/topic_collect/' + id);
};

var loadMessages = exports.loadMessages = function loadMessages() {
  return request('/messages');
};

var markMessage = exports.markMessage = function markMessage(id) {
  return request('/message/mark_one/' + id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'accesstoken=' + getAccessToken()
  });
};

var markAllMessage = exports.markAllMessage = function markAllMessage(id) {
  return request('message/mark_all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'accesstoken=' + getAccessToken()
  });
};

var login = function login(accesstoken) {
  return request('/accesstoken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'accesstoken=' + accesstoken
  }, true).then(function (_ref) {
    var success = _ref.success,
        error_msg = _ref.error_msg,
        data = _objectWithoutProperties(_ref, ['success', 'error_msg']);

    if (!success) {
      throw new Error(error_msg);
    }
    setAccessToken(accesstoken);
    return data;
  });
};

exports.login = login;
var logout = exports.logout = function logout() {
  return setAccessToken('');
};