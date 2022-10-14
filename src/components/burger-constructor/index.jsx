import React from 'react';
import { nanoid } from 'nanoid';

import Item from './item';
import Footer from './footer';
import { useCheckout, useConstructor } from '../../hooks';
import styles from './styles.module.scss';
import OrderDetails from '../order-details';
import Modal from '../modal';

const BurgerConstructor = () => {
  const { bunIngredient, restIngredients, price } = useConstructor();
  const {
    submit,
    modalIsOpen,
    modalClose,
    modalPayload,
    modalUnMount
  } = useCheckout();

  return (
    <>
      <section className="pt-25 pl-4">
        {bunIngredient && <Item item={bunIngredient} isLocked={true} type="top" />}
        <div className="overflow-y-hidden h-full mt-4 mb-4">
          <div className="custom-scroll">
            <div className={styles.items}>
              {restIngredients.map((item, index) => <Item item={item} index={index} key={nanoid()} />)}
            </div>
          </div>
        </div>
        {bunIngredient && <Item item={bunIngredient} isLocked={true} type="bottom" />}
        <Footer price={price} onCheckout={submit}/>
      </section>
      <Modal isOpen={modalIsOpen} onClose={modalClose} unMount={modalUnMount}>
        <OrderDetails orderNumber={modalPayload.orderNumber} />
      </Modal>
    </>
  );
};

export default BurgerConstructor;
