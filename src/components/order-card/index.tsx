import React, { FC } from 'react';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.scss';

import IngredientPreviews from '../ingredient-previews';
import OrderPrice from '../order-price';
import { IOrder } from '../../services/types';
import { useIngredients } from '../../hooks';
import { numberFormat } from '../../services/utils';

interface IOrderCard {
  order: IOrder
}

const OrderCard: FC<IOrderCard> = ({ order }) => {
  const ingredients = useIngredients();
  const orderPrice = order.ingredients.reduce((acc, id) => acc + ingredients[id].price, 0);

  return (
    <div className={styles.card}>
      <div className="d-flex justify-between">
        <span className="text text_type_digits-default">
          #{String(order.number).padStart(6, '0')}
        </span>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </span>
      </div>
      <p className="text text_type_main-medium mt-6">
        {order.name}
      </p>
      <div className="d-flex justify-between align-center mt-6">
        <IngredientPreviews items={order.ingredients} />
        <OrderPrice className="ml-6">{numberFormat(orderPrice)}</OrderPrice>
      </div>
    </div>
  );
};

export default OrderCard;
