import React, { FC } from 'react';
import { IOrder } from '../../services/types';
import OrderList from '../order-list';

interface IOrdersFeed {
  orders: IOrder[]
}

const OrdersFeed: FC<IOrdersFeed> = ({ orders }) => {
  return (
    <section className="pt-10">
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <OrderList orders={orders} />
    </section>
  );
};

export default OrdersFeed;
