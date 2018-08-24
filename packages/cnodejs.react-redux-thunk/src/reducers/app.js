import * as ActionTypes from '../constants/ActionTypes';

export const defaultState = {
  toast: null
};

export default (state = defaultState, action) => {
  let newState = state;
  if (action.meta && action.meta.toast !== undefined) {
    newState = {
      ...newState,
      toast: action.meta.toast
    };
  }
  switch (action.type) {
    case ActionTypes.APP_TOAST:
      return {
        ...newState,
        toast: action.payload
      };
    default:
      break;
  }
  return newState;
};
