import * as api from 'cnodejs.api';
import * as schemas from '../constants/schemas';
import * as ActionTypes from '../constants/ActionTypes';
import * as entitiesSelectors from '../selectors/entities';
import * as userSelectors from '../selectors/user';

export const loadDetail = id => (dispatch, getState) => {
  if (!userSelectors.isDetailLoading(getState(), id)) {
    dispatch({ type: ActionTypes.USER_LOAD_REQUEST, meta: { id } });
    return Promise.all([api.loadUserDetail(id), api.loadUserCollections(id)])
      .then(([user, collects]) => {
        const userData = {
          ...user,
          collect_topics: collects.map(({ content, ...topics }) => ({
            ...topics,
            content_markdown: content
          }))
        };
        dispatch({
          type: ActionTypes.USER_LOAD_SUCCESS,
          payload: schemas.createUser(userData),
          meta: { id }
        });
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.USER_LOAD_FAILURE,
          payload: error,
          meta: {
            id,
            toast: error.message
          }
        });
      });
  }
  return null;
};

export const refreshDetail = loadDetail;

export const loadDetailIfNeed = id => (dispatch, getState) => {
  const user = entitiesSelectors.getUser(getState(), id);
  if (!user || !(user.score >= 0)) {
    return dispatch(loadDetail(id));
  }
  return null;
};

export const login = accesstoken => (dispatch, getState) => {
  if (!userSelectors.isSessionLogining(getState())) {
    dispatch({ type: ActionTypes.USER_LOGIN_REQUEST });
    api
      .login(accesstoken)
      .then(data => {
        dispatch(loadDetailIfNeed(data.loginname));
        dispatch({
          type: ActionTypes.USER_LOGIN_SUCCESS,
          payload: schemas.createUser(data),
          meta: { id: data.loginname }
        });
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.USER_LOGIN_FAILURE,
          payload: error
        });
      });
  }
};

export const loginOfLast = () => dispatch => {
  const accessToken = api.getAccessToken();
  if (accessToken) {
    dispatch(login(accessToken));
  }
};

export const logout = () => dispatch => {
  api.logout();
  dispatch({ type: ActionTypes.USRE_LOGOUT });
};
