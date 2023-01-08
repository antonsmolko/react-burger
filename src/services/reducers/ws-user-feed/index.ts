import { IOrder } from '../../types';
import { TWsUserFeedActions } from '../../actions';

import {
  WS_USER_FEED_CLOSE,
  WS_USER_FEED_ERROR,
  WS_USER_FEED_MESSAGE,
  WS_USER_FEED_OPEN
} from '../../constants/ws-user-feed';
import { WsConnectionStatus } from '../../enums';

type TWsState = {
  connectionError: string;
  orders: IOrder[];
  total: number;
  totalToday: number;
  connectionStatus: WsConnectionStatus,
}

export const initialState: TWsState = {
  connectionError: '',
  orders: [],
  total: 0,
  totalToday: 0,
  connectionStatus: WsConnectionStatus.OFFLINE
};

export const wsUserFeed = (state: TWsState = initialState, action: TWsUserFeedActions): TWsState => {
  switch (action.type) {
  case WS_USER_FEED_OPEN: {
    return {
      ...state,
      connectionError: '',
      connectionStatus: WsConnectionStatus.ONLINE
    };
  }
  case WS_USER_FEED_ERROR: {
    return {
      ...state,
      connectionError: action.payload
    };
  }
  case WS_USER_FEED_CLOSE: {
    return {
      ...state,
      connectionError: '',
      connectionStatus: WsConnectionStatus.OFFLINE
    };
  }
  case WS_USER_FEED_MESSAGE: {
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
