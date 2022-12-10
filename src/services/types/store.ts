import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import store from '../../store';

import {
  TAuthActions,
  TConstructorActions,
  TIngredientsActions,
  TOrderActions,
  TWsActions
} from '../actions';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
export type TApplicationActions =
  | TAuthActions
  | TConstructorActions
  | TIngredientsActions
  | TOrderActions
  | TWsActions;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
  >;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

// export type AppDispatch = Dispatch<TApplicationActions>;
