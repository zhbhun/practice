import { defaultState } from '../reducers/app';

export const getState = state => state.app || defaultState;
export const getToast = state => getState(state).toast;
