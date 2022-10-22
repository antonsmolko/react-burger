import {
  getIngredientsRequest,
  orderRequest
} from '../../api';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  RESET_CONSTRUCTOR_INGREDIENTS,
  UPDATE_CONSTRUCTOR_INGREDIENTS,
  SET_CURRENT_INGREDIENT,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  RESET_CURRENT_ORDER
} from '../actions';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  constructorIngredients: {
    bun: null,
    rest: []
  },
  currentIngredient: {},
  currentOrder: {},
  createOrderRequest: false,
  createOrderFailed: false
};

export function getIngredients() {
  return function(dispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });

    getIngredientsRequest()
      .then(({ data }) => {
        dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data });
      })
      .catch(() => {
        dispatch({ type: GET_INGREDIENTS_FAILED });
      });
  };
}

export function createOrder(payload) {
  return function(dispatch) {
    dispatch({ type: CREATE_ORDER_REQUEST });

    orderRequest(payload)
      .then(({ order }) => {
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: order });
      })
      .catch(() => {
        dispatch({ type: CREATE_ORDER_FAILED });
      });
  };
}

export const rootReducer = (state = initialState, action) => {
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
      ingredients: action.payload
    };
  }
  case GET_INGREDIENTS_FAILED: {
    return {
      ...state,
      ingredientsRequest: false,
      ingredientsFailed: true
    };
  }
  case ADD_CONSTRUCTOR_INGREDIENT: {
    const key = action.payload.type === 'bun' ? 'bun' : 'rest';
    return {
      ...state,
      constructorIngredients: {
        ...state.constructorIngredients,
        [key]: key === 'bun' ? action.payload : [...state.constructorIngredients.rest, action.payload]
      }
    };
  }
  case REMOVE_CONSTRUCTOR_INGREDIENT: {
    return {
      ...state,
      constructorIngredients: {
        ...state.constructorIngredients,
        rest: state.constructorIngredients.rest.filter((_, index) => index !== action.payload)
      }
    };
  }
  case RESET_CONSTRUCTOR_INGREDIENTS: {
    return {
      ...state,
      constructorIngredients: initialState.constructorIngredients
    };
  }
  case UPDATE_CONSTRUCTOR_INGREDIENTS: {
    return {
      ...state,
      constructorIngredients: {
        ...state.constructorIngredients,
        rest: action.payload
      }
    };
  }
  case SET_CURRENT_INGREDIENT: {
    return {
      ...state,
      currentIngredient: action.payload
    };
  }
  case CREATE_ORDER_REQUEST: {
    return {
      ...state,
      createOrderRequest: true
    };
  }
  case CREATE_ORDER_SUCCESS: {
    return {
      ...state,
      createOrderRequest: false,
      createOrderFailed: false,
      currentOrder: action.payload
    };
  }
  case CREATE_ORDER_FAILED: {
    return {
      ...state,
      createOrderRequest: false,
      createOrderFailed: true
    };
  }
  case RESET_CURRENT_ORDER: {
    return {
      ...state,
      currentOrder: initialState.currentOrder
    };
  }
  default:
    return state;
  }
};
