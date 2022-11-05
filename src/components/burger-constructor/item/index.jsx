import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { constructorItemPropTypes } from '../../../prop-types';
import { removeConstructorIngredient } from '../../../services/actions/constructor';

const suffixMap = {
  top: ' (верх)',
  bottom: ' (низ)'
};

const Item = ({ item, index = null, isLocked = false, type = null }) => {
  const dispatch = useDispatch();
  const itemStyles = cn([styles.item, { 'pr-4': isLocked }]);
  const suffix = suffixMap[type];
  const text = `${item.name}${suffix}`;

  const handleRemove = () => {
    dispatch(removeConstructorIngredient(index));
  };

  return (
    <div className={itemStyles}>
      {!isLocked &&
        <div className={styles.drag}>
          <DragIcon type="primary" />
        </div>
      }
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={text}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={handleRemove}
      />
    </div>
  );
};

Item.propTypes = {
  item: constructorItemPropTypes,
  index: PropTypes.number,
  isLocked: PropTypes.bool,
  type: PropTypes.string
};

export default Item;
