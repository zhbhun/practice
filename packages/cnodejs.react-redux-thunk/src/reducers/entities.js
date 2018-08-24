import merge from 'lodash.merge';

/**
 * @param {Object} state
 * @param {Object} state.users
 * @param {Object} state.replies
 * @param {Object} state.topics
 */
export default (state = {}, action) => {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities);
  }
  return state;
};
