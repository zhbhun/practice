export const getState = state => state.entities;

// 用户
export const getUsers = state => getState(state).users || {};
export const getUser = (state, id) => getUsers(state)[id];

// 话题
export const getTopics = state => getState(state).topics || {};
export const getTopic = (state, id) => getTopics(state)[id];

// 回复
export const getReplies = state => getState(state).replies || {};
export const getReply = (state, id) => getReplies(state)[id];

// 消息
export const getMessages = state => getState(state).messages || {};
export const getMessage = (state, id) => {
  const message = getMessages(state)[id];
  if (message) {
    return {
      ...message,
      topic: getTopic(state, message.topic),
      reply: getReply(state, message.reply)
    };
  }
  return null;
};
