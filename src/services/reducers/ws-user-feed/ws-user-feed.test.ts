import * as types from '../../constants/ws-user-feed';
import { wsUserFeed as reducer, initialState as state } from './index';
import { WsConnectionStatus } from '../../enums';
import { IOrder } from '../../types';

describe('ws-user-feed reducer', () => {
  it('should return the initial state', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(state);
  });

  it('should handle WS_USER_FEED_OPEN', () => {
    expect(
      reducer(state, {
        type: types.WS_USER_FEED_OPEN
      })
    ).toEqual({
      ...state,
      connectionError: '',
      connectionStatus: WsConnectionStatus.ONLINE
    });
  });

  it('should handle WS_USER_FEED_ERROR', () => {
    const error = 'Connection Error';

    expect(
      reducer(state, {
        type: types.WS_USER_FEED_ERROR,
        payload: error
      })
    ).toEqual({
      ...state,
      connectionError: error
    });
  });

  it('should handle WS_USER_FEED_CLOSE', () => {
    expect(
      reducer(state, {
        type: types.WS_USER_FEED_CLOSE
      })
    ).toEqual({
      ...state,
      connectionError: '',
      connectionStatus: WsConnectionStatus.OFFLINE
    });
  });

  it('should handle WS_USER_FEED_MESSAGE', () => {
    const orders: IOrder[] = [];
    const total = 3349;
    const totalToday = 83;

    expect(
      reducer(state, {
        type: types.WS_USER_FEED_MESSAGE,
        payload: {
          success: true,
          orders,
          total,
          totalToday
        }
      })
    ).toEqual({
      ...state,
      orders,
      total,
      totalToday
    });
  });
});
