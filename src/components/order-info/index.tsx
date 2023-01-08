import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { numberFormat } from '../../services/utils';
import { useIngredients } from '../../hooks';
import { useDispatch, useSelector } from '../../services/hooks';
import { getOrder, getUserOrder, resetCurrentOrderAction } from '../../services/actions';
import OrderPrice from '../order-price';
import OrderIngredient from '../order-ingredient';
import styles from './order-info.module.scss';
import { TOrderInfoIngredients } from '../../services/types';
import { OrderStatus } from '../../services/enums';

type TOrderInfo = {
  isOwn?: boolean
}

const ingredientsStyles = cn('mt-6 pr-6 custom-scroll', styles.ingredients);

const statusTextMap = {
  done: 'Выполнен',
  cancelled: 'Отменен',
  pending: 'Выполняется',
  created: 'Создан'
};
const getStatusText = (status: OrderStatus) => statusTextMap[status];

const OrderInfo: FC<TOrderInfo> = ({ isOwn = false }) => {
  const { orderNumber } = useParams();
  const dispatch = useDispatch();

  const orderAction = isOwn ? getUserOrder : getOrder;

  const order = useSelector((store) => store.order.current);

  useEffect(() => {
    orderNumber && dispatch(orderAction(orderNumber));

    return () => {
      dispatch(resetCurrentOrderAction());
    };
  }, [orderNumber, dispatch]);

  const ingredients = useIngredients();

  const orderIngredients = (order?.ingredients || [])
    .reduce((acc: TOrderInfoIngredients, id: string) => (
      acc[id]
        ? { ...acc, [id]: { ...acc[id], count: acc[id].count + 1 } }
        : { ...acc, [id]: { count: 1, ingredient: ingredients[id] } }
    ), {});

  const orderPrice = order
    ? order.ingredients.reduce((acc, id) => acc + ingredients[id].price, 0)
    : 0;

  return order && (
    <>
      <p className="text text_type_digits-default text-center">
        #{order.number}
      </p>
      <p className="text text_type_main-medium mt-6">
        {order.name}
      </p>
      <p className="text text_type_main-small text_color_success mt-3">
        {getStatusText(order.status)}
      </p>
      <p className="text text_type_main-medium mt-15">
        Состав:
      </p>
      <div className={ingredientsStyles}>
        {
          Object.values(orderIngredients)
            .map(({ count, ingredient }) => (
              <OrderIngredient ingredient={ingredient} count={count} key={ingredient._id} />
            ))
        }
      </div>
      <div className="d-flex justify-between mt-10">
        <p className="text text_type_main-default text_color_inactive">
          {<FormattedDate date={new Date(order.createdAt)} />}
        </p>
        <OrderPrice>{numberFormat(orderPrice)}</OrderPrice>
      </div>
    </>
  );
};

export default OrderInfo;
