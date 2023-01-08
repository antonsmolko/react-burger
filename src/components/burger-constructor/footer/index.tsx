import React, { SyntheticEvent, FC, useEffect, useState} from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';
import { IConstructorFooter } from '../../../services/types';

const Footer: FC<IConstructorFooter> = ({ onCheckout, items, loading = false }) => {
  const { bun, rest } = items;
  const [price, setPrice] = useState(0);

  const getPrice = () => [bun, bun, ...rest].reduce((acc, item) => (
    item ? acc + item.price : acc
  ), 0);

  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault();
    onCheckout();
  };

  useEffect(() => {
    setPrice(getPrice());
  }, [items]);

  return (
    <footer className={`${styles.footer} mt-10`}>
      <div className={styles.price}>
        <span className="text text_type_digits-medium">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <form data-testid="order-form">
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          onClick={handleClick}
          disabled={!bun || loading}
        >
          Оформить заказ
        </Button>
      </form>
    </footer>
  );
};

export default Footer;
