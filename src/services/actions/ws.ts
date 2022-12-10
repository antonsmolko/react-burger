import {
  WS_CONNECT,
  WS_DISCONNECT,
  WS_CONNECTING,
  WS_CLOSE,
  WS_OPEN,
  WS_ERROR,
  WS_MESSAGE,
} from '../constants/ws';
import { IWsData } from '../types';

export interface IWsConnectAction {
  readonly type: typeof WS_CONNECT;
  readonly payload: {
    url: string,
    isOwn?: boolean
  };
}

export interface IWsDisconnectAction {
  readonly type: typeof WS_DISCONNECT;
}

export interface IWsErrorAction {
  readonly type: typeof WS_ERROR;
  readonly payload: string;
}

export interface IWsConnectingAction {
  readonly type: typeof WS_CONNECTING;
}

export interface IWsMessageAction {
  readonly type: typeof WS_MESSAGE;
  readonly payload: IWsData;
}

export interface IWsCloseAction {
  readonly type: typeof WS_CLOSE
}

export interface IWsOpenAction {
  readonly type: typeof WS_OPEN
}

export type TWsActions =
  | IWsConnectAction
  | IWsDisconnectAction
  | IWsConnectingAction
  | IWsOpenAction
  | IWsCloseAction
  | IWsErrorAction
  | IWsMessageAction;

export const wsConnectAction = (url: string, isOwn = false): IWsConnectAction => ({
  type: WS_CONNECT,
  payload: {
    url,
    isOwn
  }
});

export const wsDisconnectAction = (): IWsDisconnectAction => ({
  type: WS_DISCONNECT
});

export const wsConnectingAction = (): IWsConnectingAction => ({
  type: WS_CONNECTING
});

export const wsCloseAction = (): IWsCloseAction => ({
  type: WS_CLOSE
});

export const wsOpenAction = (): IWsOpenAction => ({
  type: WS_OPEN
});

export const wsErrorAction = (error: string): IWsErrorAction => ({
  type: WS_ERROR,
  payload: error
});

export const wsMessageAction = (data: IWsData): IWsMessageAction => ({
  type: WS_MESSAGE,
  payload: data
});
