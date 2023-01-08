import {
  WS_FEED_CONNECT,
  WS_FEED_DISCONNECT,
  WS_FEED_CLOSE,
  WS_FEED_OPEN,
  WS_FEED_ERROR,
  WS_FEED_MESSAGE
} from '../constants/ws-feed';
import { IWsData } from '../types';
import { WS_FEED_URL } from '../../config';

export interface IWsFeedConnectAction {
  readonly type: typeof WS_FEED_CONNECT;
  readonly payload: string;
}

export interface IWsFeedDisconnectAction {
  readonly type: typeof WS_FEED_DISCONNECT;
}

export interface IWsFeedErrorAction {
  readonly type: typeof WS_FEED_ERROR;
  readonly payload: string;
}

export interface IWsFeedMessageAction {
  readonly type: typeof WS_FEED_MESSAGE;
  readonly payload: IWsData;
}

export interface IWsFeedCloseAction {
  readonly type: typeof WS_FEED_CLOSE;
}

export interface IWsFeedOpenAction {
  readonly type: typeof WS_FEED_OPEN;
}

export const wsFeedConstants = {
  connect: WS_FEED_CONNECT,
  disconnect: WS_FEED_DISCONNECT,
  close: WS_FEED_CLOSE,
  open: WS_FEED_OPEN,
  onerror: WS_FEED_ERROR,
  onmessage: WS_FEED_MESSAGE
};

export type TWsFeedActions =
  | IWsFeedConnectAction
  | IWsFeedDisconnectAction
  | IWsFeedOpenAction
  | IWsFeedCloseAction
  | IWsFeedErrorAction
  | IWsFeedMessageAction;

export const wsFeedDisconnectAction = (): IWsFeedDisconnectAction => ({
  type: WS_FEED_DISCONNECT
});

export const wsFeedConnectAction = (): IWsFeedConnectAction => ({
  type: WS_FEED_CONNECT,
  payload: WS_FEED_URL
});
