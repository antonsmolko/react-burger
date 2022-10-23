import {
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  RESET_CONSTRUCTOR_INGREDIENTS,
  UPDATE_CONSTRUCTOR_INGREDIENTS
} from '../actions/constructor';

const initialState = {
  items: {
    bun: null,
    rest: []
  }
};

export const constructor = (state = initialState, action) => {
  switch (action.type) {
  case ADD_CONSTRUCTOR_INGREDIENT: {
    const key = action.payload.type === 'bun' ? 'bun' : 'rest';
    return {
      ...state,
      items: {
        ...state.items,
        [key]: key === 'bun' ? action.payload : [...state.items.rest, action.payload]
      }
    };
  }
  case REMOVE_CONSTRUCTOR_INGREDIENT: {
    return {
      ...state,
      items: {
        ...state.items,
        rest: state.items.rest.filter((_, index) => index !== action.payload)
      }
    };
  }
  case RESET_CONSTRUCTOR_INGREDIENTS: {
    return {
      ...state,
      items: initialState.items
    };
  }
  case UPDATE_CONSTRUCTOR_INGREDIENTS: {
    return {
      ...state,
      items: {
        ...state.items,
        rest: action.payload
      }
    };
  }
  default:
    return state;
  }
};
