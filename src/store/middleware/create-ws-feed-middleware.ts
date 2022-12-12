import { Middleware } from 'redux';
import {
  wsFeedCloseAction, wsFeedConnectAction,
  wsFeedErrorAction,
  wsFeedMessageAction,
  wsFeedOpenAction
} from '../../services/actions';
import { WS_FEED_CONNECT, WS_FEED_DISCONNECT } from '../../services/constants/ws-feed';

export const createWsFeedMiddleware = (): Middleware => {
  return store => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === WS_FEED_CONNECT && !isConnected) {
        const url = action?.payload;
        socket = new WebSocket(url);
        isConnected = true;
        window.clearTimeout(reconnectTimer);
      }

      if (socket) {
        socket.onopen = () => {
          console.log('ws onopen');
          dispatch(wsFeedOpenAction());
        };

        socket.onerror = () => {
          console.log('ws onerror');
          dispatch(wsFeedErrorAction('Websocket error'));
        };

        socket.onmessage = (event) => {
          console.log('ws onmessage');
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch(wsFeedMessageAction(parsedData));
        };

        socket.onclose = (event) => {
          console.log('ws onclose');
          if (event.code !== 1000) {
            dispatch(wsFeedErrorAction(event.code.toString()));
          }

          if (isConnected) {
            isConnected = false;
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsFeedConnectAction());
            }, 3000);
          }


          dispatch(wsFeedCloseAction());
        };

        if (type === WS_FEED_DISCONNECT) {
          console.log('ws disconnect');
          window.clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
        }
      }

      next(action);
    };
  };
};
