import { combineReducers } from 'redux';

import entities from './entities/index';
import ui from './ui/index';

const rootReducer = combineReducers({
  entities,
  ui,
});

export default rootReducer;
