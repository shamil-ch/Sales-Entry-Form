// src/reducers/index.js
import { combineReducers } from 'redux';
import salesReducer from './salesReducers';

const rootReducer = combineReducers({
  sales: salesReducer,
});

export default rootReducer;
