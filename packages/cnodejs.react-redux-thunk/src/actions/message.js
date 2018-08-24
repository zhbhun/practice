import * as api from 'cnodejs.api';
import { push } from 'connected-react-router';
import * as schemas from '../constants/schemas';
import * as ActionTypes from '../constants/ActionTypes';
import * as entitiesSelectors from '../selectors/entities';
import * as messageSelectors from '../selectors/message';

export const load = id => (dispatch, getState) => {
  if (!messageSelectors.isLoading(getState())) {
    dispatch({ type: ActionTypes.MESSAGE_LOAD_REQUEST });
    api.loadMessages()
      .then((data) => {
        const { hasnot_read_messages } = data;
        dispatch({
          type: ActionTypes.MESSAGE_LOAD_SUCCESS,
          payload: schemas.createMessages(hasnot_read_messages)
        });
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.MESSAGE_LOAD_FAILURE,
          payload: error,
          meta: { toast: error.message }
        });
      });
  }
};

export const refresh = load;

export const loadIfNeed = () => (dispatch, getState) => {
  if (!messageSelectors.getData(getState())) {
    dispatch(load());
  }
};

export const openMessage = id => (dispatch, getState) => {
  const message = entitiesSelectors.getMessage(getState(), id);
  if (!message.has_read) {
    dispatch({
      type: ActionTypes.MESSAGE_MARK_READ,
      payload: schemas.createMessage(
        Object.assign({}, message, {
          has_read: true
        })
      )
    });
    api.markMessage(id);
  }
  dispatch(push(`/topic/${message.topic.id}`));
};

export const maskAllRead = () => (dispatch, getState) => {
  const state = getState();
  const messages = messageSelectors.getData(state);
  if (messages && messages.length > 0) {
    dispatch({
      type: ActionTypes.MESSAGE_MARK_READ,
      payload: schemas.createMessages(
        messages.map(id => {
          const message = entitiesSelectors.getMessage(state, id);
          return {
            ...message,
            has_read: true
          };
        })
      )
    });
    api.markAllMessage();
  }
};
