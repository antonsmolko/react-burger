import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/reducers';
import { createWsFeedMiddleware, createWsUserFeedMiddleware } from './middleware';
import thunk from 'redux-thunk';

export default configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [applyMiddleware(thunk, createWsFeedMiddleware(), createWsUserFeedMiddleware())]
});
