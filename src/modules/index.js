import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userModuleReducer, { USER_KEY } from './users';

const rootReducer = combineReducers({
  [USER_KEY]: userModuleReducer,
  routing: routerReducer,
});

export default rootReducer;
