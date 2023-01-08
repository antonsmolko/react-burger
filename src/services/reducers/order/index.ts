import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  RESET_CURRENT_ORDER,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../../constants/order';
import { TOrderActions } from '../../actions';
import { IOrder } from '../../types';

type TOrderState = {
  current: null | IOrder;
  createOrderRequest: boolean;
  createOrderFailed: boolean;
  getOrderRequest: boolean;
  getOrderFailed: boolean;
}

export const initialState = {
  current: null,
  createOrderRequest: false,
  createOrderFailed: false,
  getOrderRequest: false,
  getOrderFailed: false
};

export const order = (state: TOrderState = initialState, action: TOrderActions): TOrderState => {
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
  case GET_ORDER_REQUEST: {
    return {
      ...state,
      getOrderRequest: true
    };
  }
  case GET_ORDER_SUCCESS: {
    return {
      ...state,
      getOrderRequest: false,
      getOrderFailed: false,
      current: action.payload
    };
  }
  case GET_ORDER_FAILED: {
    return {
      ...state,
      getOrderRequest: false,
      getOrderFailed: true
    };
  }
  default:
    return state;
  }
};
