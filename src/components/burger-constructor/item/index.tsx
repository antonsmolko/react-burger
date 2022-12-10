import React, { FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../../services/hooks';
import styles from './styles.module.scss';
import cn from 'classnames';
import { removeConstructorIngredient } from '../../../services/actions';
import { IConstructorItem } from '../../../services/types';

type TSuffixMap = {
  [name: string]: string
}

const suffixMap: TSuffixMap = {
  top: ' (верх)',
  bottom: ' (низ)'
};

const Item: FC<IConstructorItem> = ({ item, index, isLocked = false, type }) => {
  const dispatch = useDispatch();
  const itemStyles = cn([styles.item, { 'pr-4': isLocked }]);
  const suffix = type ? suffixMap[type] : '';
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

export default Item;
