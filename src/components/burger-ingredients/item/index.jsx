import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';
import { constructorItemPropTypes } from '../../../prop-types';
import { setCurrentIngredient } from '../../../services/actions/ingredient-details';
import { openModal } from '../../../services/actions/ingredient-details';

const Item = ({ item, qty = 0 }) => {
  const { name, price, image } = item;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentIngredient(item));
    dispatch(openModal());
  };

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...item },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <div ref={dragRef} className={styles.item} onClick={handleClick} style={{ opacity }}>
      {qty > 0 && <Counter count={qty} size="default" />}
      <div className={`${styles.image} pl-4 pr-4 mb-1`}>
        <img src={image} alt={name}/>
      </div>
      <div className={`${styles.price} mb-1`}>
        <span className="text text_type_digits-default pr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
    </div>
  );
};

Item.propTypes = {
  item: constructorItemPropTypes,
  qty: PropTypes.number
};

export default Item;
