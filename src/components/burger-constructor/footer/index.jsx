import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';

const Footer = ({ onCheckout, price = 0 }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onCheckout();
  };

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
