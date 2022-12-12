import { combineReducers } from 'redux';
import { ingredients } from './ingredients';
import { constructor } from './constructor';
import { order } from './order';
import { auth } from './auth';
import { wsFeed } from './ws-feed';
import { wsUserFeed } from './ws-user-feed';


export const rootReducer = combineReducers({
  ingredients,
  burgerConstructor: constructor,
  order,
  auth,
  wsFeed,
  wsUserFeed
});
