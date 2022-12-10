import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../../services/hooks';
import { ProfileLayout } from '../layout';
import OrderList from '../../../components/order-list';
import { wsConnectAction, wsDisconnectAction } from '../../../services/actions';
import { WS_USER_ORDERS_URL } from '../../../config';

export const ProfileOrdersPage: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.ws.orders);
  const sortedOrders = [...orders].reverse();

  useEffect(() => {
    dispatch(wsConnectAction(WS_USER_ORDERS_URL, true));

    return () => {
      dispatch(wsDisconnectAction());
    };
  }, []);

  return (
    <ProfileLayout>
      <section className={'pt-10'}>
        <OrderList isOwn={true} orders={sortedOrders} />
      </section>
    </ProfileLayout>
  );
};
