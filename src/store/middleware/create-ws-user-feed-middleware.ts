import { Middleware } from 'redux';
import {
  wsUserFeedCloseAction, wsUserFeedConnectAction,
  wsUserFeedErrorAction,
  wsUserFeedMessageAction,
  wsUserFeedOpenAction
} from '../../services/actions';
import { WS_USER_FEED_CONNECT, WS_USER_FEED_DISCONNECT } from '../../services/constants/ws-user-feed';

export const createWsUserFeedMiddleware = (): Middleware => {
  return store => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === WS_USER_FEED_CONNECT && !isConnected) {
        const url = action?.payload;
        socket = new WebSocket(url);
        isConnected = true;
        window.clearTimeout(reconnectTimer);
      }

      if (socket) {
        socket.onopen = () => {
          console.log('ws user onopen');
          dispatch(wsUserFeedOpenAction());
        };

        socket.onerror = () => {
          console.log('ws user onerror');
          dispatch(wsUserFeedErrorAction('Websocket error'));
        };

        socket.onmessage = (event) => {
          console.log('ws user onmessage');
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch(wsUserFeedMessageAction(parsedData));
        };

        socket.onclose = (event) => {
          console.log('ws user onclose');
          if (event.code !== 1000) {
            dispatch(wsUserFeedErrorAction(event.code.toString()));
          }

          if (isConnected) {
            isConnected = false;
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsUserFeedConnectAction());
            }, 3000);
          }


          dispatch(wsUserFeedCloseAction());
        };

        if (type === WS_USER_FEED_DISCONNECT) {
          console.log('ws user disconnect');
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
