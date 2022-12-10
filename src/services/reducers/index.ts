import { combineReducers } from 'redux';
import { ingredients } from './ingredients';
import { constructor } from './constructor';
import { order } from './order';
import { auth } from './auth';
import { ws } from './ws';


export const rootReducer = combineReducers({
  ingredients,
  burgerConstructor: constructor,
  order,
  auth,
  ws
});
