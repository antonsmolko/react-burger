import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SpinningCircles } from 'react-loading-icons';

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
import modalStyles from '../modal/modal-layout/styles.module.scss';
import { useAuth } from '../../hooks';
import ModalBackDrop from '../modal/modal-layout/modal-overlay';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    ingredients,
    order,
    createOrderRequest,
    createOrderFailed
  } = useSelector((store) => ({
    // @FIXME: next sprint
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ingredients: store.burgerConstructor.items,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    order: store.order.current,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    createOrderFailed: store.order.createOrderFailed,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    createOrderRequest: store.order.createOrderRequest
  }));

  const submit = () => {
    if (!loggedIn) {
      navigate('/login', { state: { from: '/' } });
      return;
    }

    setLoading(true);
    const { bun, rest } = ingredients;
    const ingredientIds = [bun, ...rest, bun].filter(Boolean).map(({ _id }) => _id);

    // @FIXME: next sprint
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(createOrder(ingredientIds))
      .then(() => {
        dispatch(resetConstructorIngredients());
      })
      .finally(() => {
        setLoading(false);
      });
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
      // @FIXME: next sprint
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(addConstructorIngredient({ ...item, dragId: nanoid() }));
    }
  });

  const classes = cn('pt-25 pl-4', {
    [styles.onHover]: isHover
  });

  return (
    <>
      {loading && (
        <div className={modalStyles.container}>
          <ModalBackDrop animationIn={true} />
          <div className={'d-flex align-center justify-center h-full'}>
            <SpinningCircles />
          </div>
        </div>
      )}
      <section ref={dropTargetRef} className={classes}>
        <ItemsList ingredients={ingredients} />
        <Footer items={ingredients} onCheckout={submit} loading={loading} />
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
