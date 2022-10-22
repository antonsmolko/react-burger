import React, { useEffect, useState } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';

const Footer = ({ onCheckout, items }) => {
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
        <Button htmlType="submit" type="primary" size="large" onClick={handleClick}>
					Оформить заказ
        </Button>
      </form>
    </footer>
  );
};

Footer.propTypes = {
  price: PropTypes.number,
  onCheckout: PropTypes.func.isRequired
};

export default Footer;
