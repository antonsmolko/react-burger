import React, { FC } from 'react';
import styles from './styles.module.scss';
import DoneImage from '../../images/modals/done.png';
import { IOrderDetails } from '../../services/types';

const OrderDetails: FC<IOrderDetails> = ({ orderNumber }) => (
  <div className={styles.details}>
    <p className="text text_type_digits-large">{orderNumber}</p>
    <p className="text text_type_main-default mt-8">идентификатор заказа</p>
    <img src={DoneImage} alt="Заказ подтвержден" className={`${styles.image} mt-15`} />
    <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
    <p className="text text_type_main-default text_color_inactive mt-2">
				Дождитесь готовности на орбитальной станции
    </p>
  </div>
);

export default OrderDetails;
