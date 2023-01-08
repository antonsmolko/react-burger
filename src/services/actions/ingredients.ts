import { getIngredientsRequest } from '../../api';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../constants/ingredients';

import { AppDispatch, TIngredientsIngredient } from '../types';

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<TIngredientsIngredient>
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED
}

export type TIngredientsActions =
  | IGetIngredientsAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction

const getIngredientsRequestAction = (): IGetIngredientsAction => ({
  type: GET_INGREDIENTS_REQUEST
});

const getIngredientsSuccessAction = (
  ingredients: TIngredientsIngredient[]
): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: ingredients
});

const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED
});

export const getIngredients = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequestAction());

  return getIngredientsRequest()
    .then(({ data }) => {
      dispatch(getIngredientsSuccessAction(data));
    })
    .catch(() => {
      dispatch(getIngredientsFailedAction());
    });
};
