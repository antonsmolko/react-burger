import React, { FC } from 'react';
import { IOrder } from '../../services/types';
import OrderCard from '../order-card';
import cn from 'classnames';
import styles from './orders-list.module.scss';
import { Link, useLocation } from 'react-router-dom';

const ordersStyles = cn(styles.list, 'custom-scroll pr-2');

type TOrderList = {
  orders: IOrder[],
  isOwn?: boolean
}

const OrderList: FC<TOrderList> = ({ orders, isOwn = false }) => {
  const location = useLocation();
  const getOrderPath = (id: string | number): string => isOwn ? `/profile/orders/${id}` : `/feed/${id}`;

  return (
    <div className={ordersStyles}>
      {orders.map((order) => (
        <Link
          to={getOrderPath(order.number)}
          key={order._id}
          state={{ background: location }}
        >
          <OrderCard order={order} />
        </Link>
      ))}
    </div>
  );
};

export default OrderList;
