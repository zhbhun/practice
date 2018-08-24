import * as ActionTypes from '../constants/ActionTypes';

export const defaultState = {
  error: null,
  loading: false,
  data: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.MESSAGE_LOAD_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ActionTypes.MESSAGE_LOAD_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case ActionTypes.MESSAGE_LOAD_SUCCESS: {
      const {
        payload: { result }
      } = action;
      return {
        ...state,
        error: null,
        loading: false,
        data: result || []
      };
    }
    default:
      break;
  }
  return state;
};
