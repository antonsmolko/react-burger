export enum OrderStatus {
  CREATED = 'created',
  PENDING = 'pending',
  DONE = 'done',
  CANCELLED = 'cancelled'
}

export enum WsConnectionStatus {
  CONNECTING = 'connecting',
  DISCONNECTING = 'disconnecting',
  OFFLINE = 'offline',
  ONLINE = 'online'
}
