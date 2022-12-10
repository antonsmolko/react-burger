import { Middleware } from 'redux';
import { getCookie } from '../../services/utils';
import {
  wsCloseAction,
  wsConnectingAction,
  wsErrorAction,
  wsMessageAction,
  wsOpenAction
} from '../../services/actions';
import {
  WS_CONNECT,
  WS_DISCONNECT
} from '../../services/constants/ws';

export const createSocketMiddleware = (): Middleware => {
  return store => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === WS_CONNECT) {
        const { url, isOwn } = action.payload;
        const accessToken = getCookie('accessToken');
        const wsUrl = isOwn ? `${url}?token=${accessToken}` : url;

        socket = new WebSocket(wsUrl);
        dispatch(wsConnectingAction());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsOpenAction());
        };

        socket.onerror = () => {
          dispatch(wsErrorAction('Websocket error'));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch(wsMessageAction(parsedData));
        };

        socket.onclose = () => {
          dispatch(wsCloseAction());
        };

        if (type === WS_DISCONNECT) {
          socket.close();
          dispatch(wsCloseAction());
        }
      }

      next(action);
    };
  };
};
