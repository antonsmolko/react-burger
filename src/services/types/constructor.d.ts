export { TIngredients } from './ingredients';
import { TIngredient } from './common';

export type TConstructorDragIngredient = TIngredient & {
  dragId?: string;
}

export type TConstructorIngredients = {
  bun: TDragIngredient;
  rest: Array<TDragIngredient>;
}

export interface IConstructorItemsList {
  ingredients: TConstructorIngredients;
}

export type TConstructorMoveItem = (dragIndex: number, hoverIndex: number) => void;

export interface IConstructorItem {
  item: TDragIngredient;
  index?: number;
  isLocked?: boolean;
  type?: 'top' | 'bottom';
}

export interface IConstructorFooter {
  onCheckout: () => void;
  items: TIngredients;
  loading?: boolean;
}

export interface IConstructorDragItem {
  move: TMoveItem;
  item: TDragIngredient;
  index: number;
}

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TDragItem = {
  ingredient: TConstructorIngredient;
  index: number;
}
