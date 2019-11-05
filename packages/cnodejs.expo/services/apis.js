import { AsyncStorage } from 'react-native';

const PREFIX = 'cnodejs.practice.com';
const ACCESS_TOKEN = `${PREFIX}.ACCESS_TOKEN`;
const BASE_URL = 'https://cnodejs.org/api/v1';

const setAccessToken = accessToken =>
  AsyncStorage.setItem(ACCESS_TOKEN, accessToken);

export const getAccessToken = () => AsyncStorage.getItem(ACCESS_TOKEN);

export const request = async (path, options = { method: 'GET' }, originalReturn) => {
  let url = `${BASE_URL}${path}`;
  const accesstoken = await getAccessToken();
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

export const collectTopic = async (id, isCollect) => {
  const accessToken = await getAccessToken();
  return request(
    `/topic_collect/${isCollect ? 'collect' : 'de_collect'}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `accesstoken=${accessToken}&topic_id=${id}`
    },
    true
  ).then(response => {
    const { success, error_msg } = response;
    if (!success && error_msg) {
      throw new Error(error_msg);
    }
    return response;
  });
};

export const likeReply = async id => {
  const accessToken = await getAccessToken();
  return request(
    `/reply/${id}/ups`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `accesstoken=${accessToken}`
    },
    true
  ).then(response => {
    const { success, error_msg, action } = response;
    console.warn(success, error_msg);
    if (!success && error_msg) {
      throw new Error(error_msg);
    }
    return action;
  });
};

export const loadUserDetail = id => request(`/user/${id}`);

export const loadUserCollections = id => request(`/topic_collect/${id}`);

export const loadMessages = () => request('/messages');

export const markMessage = async id => {
  const accessToken = await getAccessToken();
  request(`/message/mark_one/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `accesstoken=${accessToken}`
  });
};

export const markAllMessage = async id => {
  const accessToken = await getAccessToken();
  return request('message/mark_all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `accesstoken=${accessToken}`
  });
}

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
