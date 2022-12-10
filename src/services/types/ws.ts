import { IOrder } from './order';

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
