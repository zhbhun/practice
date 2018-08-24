const PREFIX = 'cnodejs.practice.com';
const ACCESS_TOKEN = `${PREFIX}.ACCESS_TOKEN`;
const BASE_URL = 'https://cnodejs.org/api/v1';

const setAccessToken = accessToken =>
  localStorage.setItem(ACCESS_TOKEN, accessToken);

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

export const request = (path, options = { method: 'GET' }, originalReturn) => {
  let url = `${BASE_URL}${path}`;
  const accesstoken = getAccessToken();
  if (options.method === 'GET' && accesstoken) {
    url += `${url.indexOf('?') >= 0 ? '&' : '?'}accesstoken=${accesstoken}`;
  }
  return fetch(url, options)
    .then(response => {
      if (!/application\/json/.test(response.headers.get('Content-Type'))) {
        throw new Error('系统错误');
      }
      return response.json();
    })
    .then(response => {
      if (originalReturn) {
        return response;
      }
      const { success, error_msg, data } = response;
      if (!success) {
        throw new Error(error_msg);
      }
      return data;
    });
};

export const loadTopicList = (tab, page, size) =>
  request(`/topics?page=${page}&limit=${size}${tab ? `&tab=${tab}` : ''}`);

export const loadTopicDetail = id => request(`/topic/${id}`);

export const collectTopic = (id, isCollect) =>
  request(
    `/topic_collect/${isCollect ? 'collect' : 'de_collect'}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `accesstoken=${getAccessToken()}&topic_id=${id}`
    },
    true
  ).then(response => {
    const { success, error_msg } = response;
    if (!success && error_msg) {
      throw new Error(error_msg);
    }
    return response;
  });

export const likeReply = id =>
  request(
    `/reply/${id}/ups`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `accesstoken=${getAccessToken()}`
    },
    true
  ).then(response => {
    const { success, error_msg, action } = response;
    if (!success && error_msg) {
      throw new Error(error_msg);
    }
    return action;
  });

export const loadUserDetail = id => request(`/user/${id}`);

export const loadUserCollections = id => request(`/topic_collect/${id}`);

export const loadMessages = () => request('/messages');

export const markMessage = id =>
  request(`/message/mark_one/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `accesstoken=${getAccessToken()}`
  });

export const markAllMessage = id =>
  request('message/mark_all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `accesstoken=${getAccessToken()}`
  });

export const login = accesstoken =>
  request(
    `/accesstoken`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `accesstoken=${accesstoken}`
    },
    true
  ).then(({ success, error_msg, ...data }) => {
    if (!success) {
      throw new Error(error_msg);
    }
    setAccessToken(accesstoken);
    return data;
  });

export const logout = () => setAccessToken('');
