import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Footer from './footer';
import { useModal } from '../../hooks';
import OrderDetails from '../order-details';
import Modal from '../modal';
import { createOrder } from '../../services/reducers/rootReducer';
import {
  ADD_CONSTRUCTOR_INGREDIENT,
  RESET_CONSTRUCTOR_INGREDIENTS,
  RESET_CURRENT_ORDER
} from '../../services/actions';
import ItemsList from './items-list';
import { useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import cn from 'classnames';
import styles from './styles.module.scss';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { isOpen, open, close } = useModal();

  const { ingredients, order, createOrderSuccess } = useSelector((store) => ({
    ingredients: store.constructorIngredients,
    order: store.currentOrder,
    createOrderSuccess: store.createOrderSuccess
  }));

  const submit = async () => {
    const { bun, rest } = ingredients;
    const ingredientIds = [bun, ...rest, bun].filter(Boolean).map(({ _id }) => _id);
    await dispatch(createOrder(ingredientIds));
    open();
    dispatch({ type: RESET_CONSTRUCTOR_INGREDIENTS });
  };

  const handleUnMount = () => {
    dispatch({ type: RESET_CURRENT_ORDER });
  };

  useEffect(() => {
    if (!createOrderSuccess) { return;}
    open();
  }, [createOrderSuccess]);

  const [{ isHover }, dropTargetRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      dispatch({
        type: ADD_CONSTRUCTOR_INGREDIENT,
        payload: { ...item, dragId: nanoid(), }
      });
    }
  });

  const classes = cn('pt-25 pl-4', {
    [styles.onHover]: isHover
  });

  return (
    <>
      <section ref={dropTargetRef} className={classes}>
        <ItemsList ingredients={ingredients} />
        <Footer items={ingredients} onCheckout={submit}/>
      </section>
      <Modal isOpen={isOpen} onClose={close} unMount={handleUnMount}>
        <OrderDetails orderNumber={order.number} />
      </Modal>
    </>
  );
};

export default BurgerConstructor;
