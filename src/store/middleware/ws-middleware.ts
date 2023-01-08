import { Middleware } from 'redux';

export const wsMiddleware = (wsActions): Middleware => {
  return store => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = null;

    const {
      connect,
      disconnect,
      close,
      open,
      onerror,
      onmessage
    } = wsActions;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === connect && !isConnected) {
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        window.clearTimeout(reconnectTimer);
      }

      if (socket) {
        socket.onopen = () => {
          console.log('ws onopen');
          dispatch({ type: open });
        };

        socket.onerror = () => {
          console.log('ws onerror');
          dispatch({ type: onerror, payload: 'websocket error!' });
        };

        socket.onmessage = (event) => {
          console.log('ws onmessage');
          const { data } = event;
          const payload = JSON.parse(data);

          dispatch({ type: onmessage, payload });
        };

        socket.onclose = (event) => {
          console.log('ws onclose');
          if (event.code !== 1000) {
            dispatch({ type: onerror, payload: event.code.toString() });
          }

          if (isConnected) {
            isConnected = false;
            reconnectTimer = window.setTimeout(() => {
              console.log('reconnect');
              dispatch({ type: connect, payload: url });
            }, 3000);
          }


          dispatch({ type: close });
        };

        if (type === disconnect) {
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
