import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.scss';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { constructorItemPropTypes } from '../../../prop-types';

const Item = ({ item, isLocked = false, type = null }) => {
  const itemStyles = cn([styles.item, { 'mr-4': isLocked }]);

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
      />
    </div>
  );
};

Item.propTypes = {
  item: constructorItemPropTypes,
  isLocked: PropTypes.bool,
  type: PropTypes.string
};

export default Item;
