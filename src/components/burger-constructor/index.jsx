import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Footer from './footer';
import OrderDetails from '../order-details';
import Modal from '../modal';
import {
  addConstructorIngredient,
  resetConstructorIngredients
} from '../../services/actions/constructor';
import {
  resetCurrentOrder,
  createOrder
} from '../../services/actions/order';
import ItemsList from './items-list';
import { useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import cn from 'classnames';
import styles from './styles.module.scss';
import { useAuth } from '../../hooks';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    ingredients,
    order,
    createOrderRequest,
    createOrderFailed
  } = useSelector((store) => ({
    ingredients: store.burgerConstructor.items,
    order: store.order.current,
    createOrderFailed: store.order.createOrderFailed,
    createOrderRequest: store.order.createOrderRequest
  }));

  const submit = () => {
    if (!loggedIn) {
      navigate('/login', { state: { from: '/' } });
      return;
    }

    const { bun, rest } = ingredients;
    const ingredientIds = [bun, ...rest, bun].filter(Boolean).map(({ _id }) => _id);

    dispatch(createOrder(ingredientIds));
    dispatch(resetConstructorIngredients());
  };

  useEffect(() => {
    if (createOrderRequest || createOrderFailed || !order) {
      return;
    }

    setModalOpen(true);
  }, [createOrderRequest, order]);

  const handleClose = () => {
    setModalOpen(false);
    dispatch(resetCurrentOrder());
  };

  const [{ isHover }, dropTargetRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      dispatch(addConstructorIngredient({ ...item, dragId: nanoid() }));
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
      {isModalOpen && (
        <Modal onClose={handleClose}>
          <OrderDetails orderNumber={order.number} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
