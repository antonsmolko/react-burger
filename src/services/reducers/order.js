import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  RESET_CURRENT_ORDER
} from '../actions/order';

const initialState = {
  current: null,
  createOrderRequest: false,
  createOrderFailed: false
};

export const order = (state = initialState, action) => {
  switch (action.type) {
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
      current: action.payload
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
      current: initialState.current
    };
  }
  default:
    return state;
  }
};
