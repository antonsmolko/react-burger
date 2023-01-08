import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/reducers';
import { wsMiddleware } from './middleware';
import thunk from 'redux-thunk';
import { wsFeedConstants, wsUserFeedConstants } from '../services/actions';

export default configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [applyMiddleware(
    thunk,
    wsMiddleware(wsFeedConstants),
    wsMiddleware(wsUserFeedConstants)
  )]
});
