import { combineReducers } from 'redux';
import app from './app';
import entities from './entities';
import message from './message';
import topic from './topic';
import user from './user';

export default combineReducers({
  app,
  entities,
  message,
  topic,
  user,
});
