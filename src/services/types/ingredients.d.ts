import { RefObject } from 'react';
import { TIngredient } from './common';

export interface IIngredientItem {
  item: TIngredient;
  index: number;
  qty: number;
}

export type TIngredientType = 'bun' | 'sauce' | 'main'

export type TIngredientsIngredient = TIngredient & {
  type: TIngredientType;
}

export interface IIngredientsTypeSection {
  title: string;
  items: Array<TIngredient>;
}

export type TIngredientsItemsMap = {
  [type in TIngredientType]: TIngredientsIngredient[];
}

export type TIngredientsOffsetMap = {
  [type in TIngredientType]: number;
}

export type TIngredientsRefsMap = {
  [type in TIngredientType]: RefObject<HTMLDivElement>;
}
