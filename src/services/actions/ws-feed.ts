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

export const wsFeedCloseAction = (): IWsFeedCloseAction => ({
  type: WS_FEED_CLOSE
});

export const wsFeedOpenAction = (): IWsFeedOpenAction => ({
  type: WS_FEED_OPEN
});

export const wsFeedErrorAction = (error: string): IWsFeedErrorAction => ({
  type: WS_FEED_ERROR,
  payload: error
});

export const wsFeedMessageAction = (data: IWsData): IWsFeedMessageAction => ({
  type: WS_FEED_MESSAGE,
  payload: data
});

export const wsFeedConnectAction = (): IWsFeedConnectAction => ({
  type: WS_FEED_CONNECT,
  payload: WS_FEED_URL
});
