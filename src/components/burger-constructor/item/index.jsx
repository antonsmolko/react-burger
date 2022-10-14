import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { constructorItemPropTypes } from '../../../prop-types';
import { useConstructor } from '../../../hooks';

const Item = ({ item, index = null, isLocked = false, type = null }) => {
  const itemStyles = cn([styles.item, { 'mr-4': isLocked }]);
  const { dispatchIngredients } = useConstructor();

  const handleRemove = () => {
    dispatchIngredients({ removeIndex: index, type: 'remove' });
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
        text={item.name}
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
