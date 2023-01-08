import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../../services/hooks';
import { ProfileLayout } from '../layout';
import OrderList from '../../../components/order-list';
import {
  wsUserFeedConnectAction,
  wsUserFeedDisconnectAction
} from '../../../services/actions';
import { WsConnectionStatus } from '../../../services/enums';

export const ProfileOrdersPage: FC = () => {
  const dispatch = useDispatch();
  const { orders, connectionStatus } = useSelector((store) => ({
    orders: store.wsUserFeed.orders,
    connectionStatus: store.wsUserFeed.connectionStatus,
  }));
  const sortedOrders = [...orders].reverse();

  useEffect(() => {
    if (connectionStatus === WsConnectionStatus.OFFLINE) {
      dispatch(wsUserFeedConnectAction());
    }

    return () => {
      if (connectionStatus === WsConnectionStatus.ONLINE) {
        dispatch(wsUserFeedDisconnectAction());
      }
    };
  }, [dispatch, connectionStatus]);

  return (
    <ProfileLayout>
      <section className={'pt-10'}>
        <OrderList isOwn={true} orders={sortedOrders} />
      </section>
    </ProfileLayout>
  );
};
