import { TUser } from './contexts';
import { TIngredient } from './common';
import { OrderStatus } from '../enums';

export interface IOrderDetails {
  orderNumber: string;
}

export interface IOrder {
  ingredients: string[];
  createdAt: string;
  name: string;
  number: string;
  owner: TUser;
  price: number;
  status: OrderStatus;
  updatedAt: string;
  _id: string;
}

export type TOrderInfoIngredients = {
  [id: string]: { count: number, ingredient: TIngredient };
}
