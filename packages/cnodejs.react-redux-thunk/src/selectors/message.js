import { defaultState } from '../reducers/message';

export const getState = state => state.message || defaultState;
export const isLoading = state => getState(state).loading;
export const getError = state => getState(state).error;
export const getData = state => getState(state).data;
