import * as ActionTypes from '../constants/ActionTypes';

export const toast = message => ({
  type: ActionTypes.APP_TOAST,
  payload: message
});
