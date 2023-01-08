import React, { FC } from 'react';
import styles from './order-ingredient.module.scss';
import IngredientPreview from '../ingredient-preview';
import OrderPrice from '../order-price';
import { TIngredient } from '../../services/types';

interface IOrderIngredient {
  ingredient: TIngredient,
  count: number
}
const OrderIngredient: FC<IOrderIngredient> = ({ ingredient, count }) => {

  return (
    <div className={styles.item}>
      <IngredientPreview image={ingredient.image_mobile} name={ingredient.name} />
      <p className="text text_type_main-default ml-4 pr-4">{ingredient.name}</p>
      <OrderPrice className={'ml-auto'}>{count}&nbsp;x&nbsp;{ingredient.price}</OrderPrice>
    </div>
  );
};

export default OrderIngredient;
