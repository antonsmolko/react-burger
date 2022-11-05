export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const RESET_CONSTRUCTOR_INGREDIENTS = 'RESET_CONSTRUCTOR_INGREDIENTS';
export const UPDATE_CONSTRUCTOR_INGREDIENTS = 'UPDATE_CONSTRUCTOR_INGREDIENTS';

export const addConstructorIngredient = (item) => ({ type: ADD_CONSTRUCTOR_INGREDIENT, payload: item });
export const removeConstructorIngredient = (index) => ({ type: REMOVE_CONSTRUCTOR_INGREDIENT, payload: index });
export const resetConstructorIngredients = () => ({ type: RESET_CONSTRUCTOR_INGREDIENTS });
export const updateConstructorIngredients = (items) => ({ type: UPDATE_CONSTRUCTOR_INGREDIENTS, payload: items });
