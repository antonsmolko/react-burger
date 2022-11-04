import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';
import { constructorItemPropTypes } from '../../../prop-types';

const Item = ({ item, qty = 0 }) => {
  const { name, price, image } = item;

  const location = useLocation();

  const ingredientId = item._id;

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...item },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <Link
      to={`/ingredients/${ingredientId}`}
      state={{ background: location }}
    >
      <div ref={dragRef} className={styles.item} style={{ opacity }}>
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
    </Link>
  );
};

Item.propTypes = {
  item: constructorItemPropTypes,
  qty: PropTypes.number
};

export default Item;
