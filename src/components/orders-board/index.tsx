import React, { FC } from 'react';
import styles from './orders-board.module.scss';
import { IOrder } from '../../services/types';
import { OrderStatus } from '../../services/enums';
import { numberFormat } from '../../services/utils';

type TOrdersBoard = {
  total: number;
  totalToday: number;
  orders: IOrder[]
}

type TStatusPredicate = ({ status }: IOrder) => boolean
const isCompleted: TStatusPredicate = ({ status }) => status === OrderStatus.DONE;
const isInProgress: TStatusPredicate = ({ status }) => status === OrderStatus.PENDING;

const genOrdersInfo = (orders: IOrder[]) => (
  <>
    {orders.map((order, index) => (
      <p className="text text_type_digits-default text_color_success" key={index}>
        {String(order.number).padStart(6, '0')}
      </p>
    ))}
  </>
);

const OrdersBoard: FC<TOrdersBoard> = ({ total, totalToday, orders }) => {
  const completedOrders = orders.filter(isCompleted).slice(0, 10);
  const inProgressOrders = orders.filter(isInProgress).slice(0, 10);

  return (
    <section className="pt-25">
      <div className={styles.queue}>
        <div>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          {genOrdersInfo(completedOrders)}
        </div>
        <div>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          {genOrdersInfo(inProgressOrders)}
        </div>
      </div>
      <div className="mt-15">
        <p className="text text_type_main-medium mb-6">Выполнено за все время:</p>
        <p className="text text_type_digits-large">
          {numberFormat(total)}
        </p>
      </div>
      <div className="mt-15">
        <p className="text text_type_main-medium mb-6">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{numberFormat(totalToday)}</p>
      </div>
    </section>
  );
};

export default OrdersBoard;
