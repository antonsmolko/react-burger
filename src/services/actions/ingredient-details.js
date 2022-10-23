export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const REMOVE_CURRENT_INGREDIENT = 'REMOVE_CURRENT_INGREDIENT';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const setCurrentIngredient = (item) => ({ type: SET_CURRENT_INGREDIENT, payload: item });
export const removeCurrentIngredient = () => ({ type: REMOVE_CURRENT_INGREDIENT });
export const openModal = () => ({ type: OPEN_MODAL });
export const closeModal = () => ({ type: CLOSE_MODAL });
