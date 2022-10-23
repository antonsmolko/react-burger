import { combineReducers } from 'redux';
import { ingredients } from './ingredients';
import { constructor } from './constructor';
import { order } from './order';
import { ingredientDetails } from './ingredient-details';


export const rootReducer = combineReducers({
  ingredients: ingredients,
  burgerConstructor: constructor,
  order: order,
  ingredientDetails: ingredientDetails
});
