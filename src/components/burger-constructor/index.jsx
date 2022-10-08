import React from 'react';
import PropTypes from 'prop-types';

import Item from './item';
import Footer from './footer';
import { useCheckout, useConstructorItems } from '../../hooks';
import styles from './styles.module.scss';
import { constructorItemsPropTypes } from '../../prop-types';
import OrderDetails from '../order-details';
import Modal from '../modal';

const BurgerConstructor = ({ items, price = 0 }) => {
  const { first, rest, last } = useConstructorItems(items);
  const { isOpen, submit, close, unMount, payload } = useCheckout({});

  const handleCheckout = async () => {
    await submit({});
  };

  return (
    <>
      <section className="pt-25 pl-4">
        {first && <Item item={first} isLocked={true} type="top" />}
        <div className="overflow-y-hidden h-full mt-4 mb-4">
          <div className="custom-scroll">
            <div className={styles.items}>
              {rest.map((item) => <Item item={item} key={item._id} />)}
            </div>
          </div>
        </div>
        {last && <Item item={last} isLocked={true} type="bottom" />}
        <Footer price={price} onCheckout={handleCheckout}/>
      </section>
      <Modal isOpen={isOpen} onClose={close} unMount={unMount}>
        <OrderDetails orderNumber={payload.orderNumber} />
      </Modal>
    </>
  );
};

BurgerConstructor.propTypes = {
  items: constructorItemsPropTypes,
  price: PropTypes.number
};

export default BurgerConstructor;
