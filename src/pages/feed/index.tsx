import React, { FC, useEffect } from 'react';
import OrdersFeed from '../../components/orders-feed';
import OrdersBoard from '../../components/orders-board';
import { useDispatch, useSelector } from '../../services/hooks';
import { wsConnectAction, wsDisconnectAction } from '../../services/actions';
import { WS_ORDERS_ALL_URL } from '../../config';


export const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const {
    orders,
    total,
    totalToday
  } = useSelector((store) => ({
    orders: store.ws.orders,
    total: store.ws.total,
    totalToday: store.ws.totalToday
  }));

  useEffect(() => {
    dispatch(wsConnectAction(WS_ORDERS_ALL_URL));

    return () => {
      dispatch(wsDisconnectAction());
    };
  }, []);

  return (
    <div className="content">
      <OrdersFeed orders={orders} />
      <OrdersBoard total={total} totalToday={totalToday} orders={orders} />
    </div>
  );
};
