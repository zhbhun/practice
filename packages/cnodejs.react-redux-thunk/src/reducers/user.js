import { combineReducers } from 'redux';
import * as ActionTypes from '../constants/ActionTypes';

export const defaultState = {
  session: {
    id: null,
    logining: false,
    loginError: null
  },
  detail: {
    error: null,
    loading: false
  }
};

const session = (state = defaultState.session, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        logining: true,
        loginError: null
      };
    case ActionTypes.USER_LOGIN_FAILURE:
      return {
        ...state,
        logining: false,
        loginError: action.payload.message
      };
    case ActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        id: action.meta.id,
        logining: false,
        loginError: null
      };
    case ActionTypes.USRE_LOGOUT:
      return {
        ...state,
        id: null,
        logining: false,
        loginError: null
      };
    default:
      break;
  }
  return state;
};

const detail = (state = defaultState.detail, action) => {
  switch (action.type) {
    case ActionTypes.TOPIC_LOAD_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ActionTypes.TOPIC_LOAD_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loading: false
      };
    case ActionTypes.TOPIC_LOAD_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false
      };
    default:
      break;
  }
  return state;
};

export default combineReducers({
  session,
  detail: (state = {}, action) => {
    switch (action.type) {
      case ActionTypes.USER_LOAD_REQUEST:
      case ActionTypes.USER_LOAD_FAILURE:
      case ActionTypes.USER_LOAD_SUCCESS: {
        const {
          meta: { id }
        } = action;
        return {
          ...state,
          [id]: detail(state[id], action)
        };
      }
      default:
        break;
    }
    return state;
  }
});
