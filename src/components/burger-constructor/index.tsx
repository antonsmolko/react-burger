import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { useNavigate } from 'react-router-dom';
import { SpinningCircles } from 'react-loading-icons';

import Footer from './footer';
import OrderDetails from '../order-details';
import Modal from '../modal';
import {
  addConstructorIngredient,
  resetConstructorIngredients
} from '../../services/actions';
import {
  resetCurrentOrderAction,
  createOrder
} from '../../services/actions';
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

    setLoading(true);
    const { bun, rest } = ingredients;
    const ingredientIds = [bun, ...rest, bun].filter(Boolean).map(({ _id }) => _id);

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
    dispatch(resetCurrentOrderAction());
  };

  const [{ isHover }, dropTargetRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
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
      {isModalOpen && order && (
        <Modal onClose={handleClose}>
          <OrderDetails orderNumber={order.number} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
