import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS
} from '../../constants/ingredients';
import { TIngredientsIngredient } from '../../types';
import { TIngredientsActions } from '../../actions';

type TIngredientState = {
  items: TIngredientsIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

export const initialState: TIngredientState = {
  items: [],
  ingredientsRequest: false,
  ingredientsFailed: false
};

export const ingredients = (state: TIngredientState = initialState, action: TIngredientsActions): TIngredientState => {
  switch (action.type) {
  case GET_INGREDIENTS_REQUEST: {
    return {
      ...state,
      ingredientsRequest: true
    };
  }
  case GET_INGREDIENTS_SUCCESS: {
    return {
      ...state,
      ingredientsRequest: false,
      ingredientsFailed: false,
      items: action.payload
    };
  }
  case GET_INGREDIENTS_FAILED: {
    return {
      ...state,
      ingredientsRequest: false,
      ingredientsFailed: true
    };
  }
  default:
    return state;
  }
};
