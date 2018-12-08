import { combineReducers } from 'redux';
import users from './users';
import queues from './queues';
import appointments from './appointments';

const entitiesReducer = combineReducers({
  users,
  queues,
  appointments,
});

export default entitiesReducer;
