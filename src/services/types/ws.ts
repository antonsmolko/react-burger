import { IOrder } from './order';
import { TWsFeedActions, TWsUserFeedActions } from '../actions';

export enum WsStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export interface IWsData {
  orders: IOrder[],
  success: boolean,
  total: number,
  totalToday: number
}

type TActionName = 'close' | 'open' | 'onError' | 'onMessage'

export type TWsActions = {
  [key in TActionName]: (param?: string | IWsData) => TWsFeedActions | TWsUserFeedActions
}
