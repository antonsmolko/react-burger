import React, { useEffect, useState } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import { constructorItemsPropType } from '../../../prop-types';

const Footer = ({ onCheckout, items, loading = false }) => {
  const { bun, rest } = items;
  const [price, setPrice] = useState(0);

  const getPrice = () => [bun, bun, ...rest].reduce((acc, item) => (
    item ? acc + item.price : acc
  ), 0);


  const handleClick = (event) => {
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
      <form>
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

Footer.propTypes = {
  items: constructorItemsPropType,
  onCheckout: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default Footer;
