import { combineReducers } from 'redux';
import entities from './entities/index';
import currentUser from './currentUser';

const rootReducer = combineReducers({
  entities,
  currentUser,
});

export default rootReducer;
