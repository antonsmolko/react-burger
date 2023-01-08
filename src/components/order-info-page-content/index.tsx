import React, { FC } from 'react';
import styles from './order-info-page-content.module.scss';
import OrderInfo from '../order-info';

const OrderInfoPageContent: FC = () => {
  return (
    <div className={'container d-flex justify-center pt-30'}>
      <div className={styles.content}>
        <OrderInfo />
      </div>
    </div>
  );
};

export default OrderInfoPageContent;
