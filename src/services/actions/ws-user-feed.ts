import {
  WS_USER_FEED_CONNECT,
  WS_USER_FEED_DISCONNECT,
  WS_USER_FEED_CLOSE,
  WS_USER_FEED_OPEN,
  WS_USER_FEED_ERROR,
  WS_USER_FEED_MESSAGE
} from '../constants/ws-user-feed';
import { IWsData } from '../types';
import { getCookie } from '../utils';
import { WS_USER_FEED_URL } from '../../config';

export interface IWsUserFeedConnectAction {
  readonly type: typeof WS_USER_FEED_CONNECT;
  readonly payload: string;
}

export interface IWsUserFeedDisconnectAction {
  readonly type: typeof WS_USER_FEED_DISCONNECT;
}

export interface IWsUserFeedErrorAction {
  readonly type: typeof WS_USER_FEED_ERROR;
  readonly payload: string;
}

export interface IWsUserFeedMessageAction {
  readonly type: typeof WS_USER_FEED_MESSAGE;
  readonly payload: IWsData;
}

export interface IWsUserFeedCloseAction {
  readonly type: typeof WS_USER_FEED_CLOSE;
}

export interface IWsUserFeedOpenAction {
  readonly type: typeof WS_USER_FEED_OPEN;
}

export type TWsUserFeedActions =
  | IWsUserFeedConnectAction
  | IWsUserFeedDisconnectAction
  | IWsUserFeedOpenAction
  | IWsUserFeedCloseAction
  | IWsUserFeedErrorAction
  | IWsUserFeedMessageAction;

export const wsUserFeedDisconnectAction = (): IWsUserFeedDisconnectAction => ({
  type: WS_USER_FEED_DISCONNECT
});

export const wsUserFeedCloseAction = (): IWsUserFeedCloseAction => ({
  type: WS_USER_FEED_CLOSE
});

export const wsUserFeedOpenAction = (): IWsUserFeedOpenAction => ({
  type: WS_USER_FEED_OPEN
});

export const wsUserFeedErrorAction = (error: string): IWsUserFeedErrorAction => ({
  type: WS_USER_FEED_ERROR,
  payload: error
});

export const wsUserFeedMessageAction = (data: IWsData): IWsUserFeedMessageAction => ({
  type: WS_USER_FEED_MESSAGE,
  payload: data
});

export const wsUserFeedConnectAction = (): IWsUserFeedConnectAction => ({
  type: WS_USER_FEED_CONNECT,
  payload: `${WS_USER_FEED_URL}?token=${getCookie('accessToken')}`
});
