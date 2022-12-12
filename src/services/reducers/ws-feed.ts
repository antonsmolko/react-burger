import { IOrder } from '../types';
import { TWsFeedActions } from '../actions';

import {
  WS_FEED_CLOSE,
  WS_FEED_ERROR,
  WS_FEED_MESSAGE,
  WS_FEED_OPEN
} from '../constants/ws-feed';
import { WsConnectionStatus } from '../enums';

type TWsState = {
  connectionError: string;
  orders: IOrder[];
  total: number;
  totalToday: number;
  connectionStatus: WsConnectionStatus,
}

const initialState: TWsState = {
  connectionError: '',
  orders: [],
  total: 0,
  totalToday: 0,
  connectionStatus: WsConnectionStatus.OFFLINE
};

export const wsFeed = (state: TWsState = initialState, action: TWsFeedActions): TWsState => {
  switch (action.type) {
  case WS_FEED_OPEN: {
    return {
      ...state,
      connectionError: '',
      connectionStatus: WsConnectionStatus.ONLINE
    };
  }
  case WS_FEED_ERROR: {
    return {
      ...state,
      connectionError: action.payload
    };
  }
  case WS_FEED_CLOSE: {
    return {
      ...state,
      connectionError: '',
      connectionStatus: WsConnectionStatus.OFFLINE
    };
  }
  case WS_FEED_MESSAGE: {
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
