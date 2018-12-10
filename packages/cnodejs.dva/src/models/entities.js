import merge from 'lodash.merge';

/**
 * @param {Object} state
 * @param {Object} state.users
 * @param {Object} state.topics
 * @param {Object} state.replies
 * @param {Object} state.messages
 */
const reducers = (state = {}, action) => {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities);
  }
  return state;
};

export const selectors = {
  getState: state => state.entities,
  // 用户
  getUsers: state => selectors.getState(state).users || {},
  getUser: (state, id) => selectors.getUsers(state)[id],
  // 话题
  getTopics: state => selectors.getState(state).topics || {},
  getTopic: (state, id) => selectors.getTopics(state)[id],
  // 回复
  getReplies: state => selectors.getState(state).replies || {},
  getReply: (state, id) => selectors.getReplies(state)[id],
  // 消息
  getMessages: state => selectors.getState(state).messages || {},
  getMessage: (state, id) => {
    const message = selectors.getMessages(state)[id];
    if (message) {
      return {
        ...message,
        topic: selectors.getTopic(state, message.topic),
        reply: selectors.getReply(state, message.reply)
      };
    }
    return null;
  }
};

export default reducers;

