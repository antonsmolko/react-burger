import {
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  RESET_CONSTRUCTOR_INGREDIENTS,
  UPDATE_CONSTRUCTOR_INGREDIENTS
} from '../constants/constructor';

import { TConstructorIngredient } from '../types';

export interface IAddConstructorIngredientAction {
  readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
  readonly payload: TConstructorIngredient;
}

export interface IRemoveConstructorIngredientAction {
  readonly type: typeof REMOVE_CONSTRUCTOR_INGREDIENT;
  readonly payload: number | undefined;
}

export interface IResetConstructorIngredientsAction {
  readonly type: typeof RESET_CONSTRUCTOR_INGREDIENTS;
}

export interface IUpdateConstructorIngredientsAction {
  readonly type: typeof UPDATE_CONSTRUCTOR_INGREDIENTS;
  readonly payload: TConstructorIngredient[]
}

export type TConstructorActions =
  | IAddConstructorIngredientAction
  | IRemoveConstructorIngredientAction
  | IResetConstructorIngredientsAction
  | IUpdateConstructorIngredientsAction;

export const addConstructorIngredient = (item: TConstructorIngredient): IAddConstructorIngredientAction => ({
  type: ADD_CONSTRUCTOR_INGREDIENT,
  payload: item
});

export const removeConstructorIngredient = (index: number | undefined): IRemoveConstructorIngredientAction => ({
  type: REMOVE_CONSTRUCTOR_INGREDIENT,
  payload: index
});

export const resetConstructorIngredients = (): IResetConstructorIngredientsAction => ({
  type: RESET_CONSTRUCTOR_INGREDIENTS
});

export const updateConstructorIngredients = (items: TConstructorIngredient[]): IUpdateConstructorIngredientsAction => ({
  type: UPDATE_CONSTRUCTOR_INGREDIENTS,
  payload: items
});
