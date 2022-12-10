import { IOrder } from '../types';

import { TWsActions } from '../actions';

import {
  WS_CONNECTING,
  WS_OPEN,
  WS_CLOSE,
  WS_ERROR,
  WS_MESSAGE, WS_DISCONNECT
} from '../constants/ws';

type TWsState = {
  connectionError: string,
  orders: IOrder[],
  total: number,
  totalToday: number
}

const initialState: TWsState = {
  connectionError: '',
  orders: [],
  total: 0,
  totalToday: 0
};

export const ws = (state: TWsState = initialState, action: TWsActions): TWsState => {
  switch (action.type) {
  case WS_CONNECTING: {
    return {
      ...state
    };
  }
  case WS_DISCONNECT: {
    return {
      ...state
    };
  }
  case WS_OPEN: {
    return {
      ...state,
      connectionError: ''
    };
  }
  case WS_ERROR: {
    return {
      ...state,
      connectionError: action.payload
    };
  }
  case WS_CLOSE: {
    return {
      ...state,
      connectionError: ''
    };
  }
  case WS_MESSAGE: {
    return {
      ...state,
      orders: action.payload.orders,
      total: action.payload.total,
      totalToday: action.payload.totalToday
    };
  }
  default:
    return state;
  }
};
