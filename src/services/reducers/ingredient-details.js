import {
  SET_CURRENT_INGREDIENT,
  OPEN_MODAL,
  CLOSE_MODAL
} from '../actions/ingredient-details';

const initialState = {
  current: null,
  modal: false
};

export const ingredientDetails = (state = initialState, action) => {
  switch (action.type) {
  case SET_CURRENT_INGREDIENT: {
    return {
      ...state,
      current: action.payload
    };
  }
  case OPEN_MODAL: {
    return {
      ...state,
      modal: true
    };
  }
  case CLOSE_MODAL: {
    return {
      ...state,
      modal: false
    };
  }
  default:
    return state;
  }
};
