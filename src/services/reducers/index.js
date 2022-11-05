import { combineReducers } from 'redux';
import { ingredients } from './ingredients';
import { constructor } from './constructor';
import { order } from './order';
import { auth } from './auth';


export const rootReducer = combineReducers({
  ingredients,
  burgerConstructor: constructor,
  order,
  auth
});
