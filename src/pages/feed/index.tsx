import React, { FC, useEffect } from 'react';
import OrdersFeed from '../../components/orders-feed';
import OrdersBoard from '../../components/orders-board';
import { useDispatch, useSelector } from '../../services/hooks';
import { wsFeedConnectAction, wsFeedDisconnectAction } from '../../services/actions';
import { WsConnectionStatus } from '../../services/enums';


export const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const {
    orders,
    total,
    totalToday,
    connectionStatus
  } = useSelector((store) => ({
    orders: store.wsFeed.orders,
    total: store.wsFeed.total,
    totalToday: store.wsFeed.totalToday,
    connectionStatus: store.wsFeed.connectionStatus
  }));

  useEffect(() => {
    if (connectionStatus === WsConnectionStatus.OFFLINE) {
      dispatch(wsFeedConnectAction());
    }

    return () => {
      if (connectionStatus === WsConnectionStatus.ONLINE) {
        dispatch(wsFeedDisconnectAction());
      }
    };
  }, [dispatch, connectionStatus]);

  return (
    <div className="content">
      <OrdersFeed orders={orders} />
      <OrdersBoard total={total} totalToday={totalToday} orders={orders} />
    </div>
  );
};
