import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Item from '../item';
import styles from '../styles.module.scss';
import { updateConstructorIngredients } from '../../../services/actions/constructor';
import DragItem from '../drag-item';
import { constructorItemsPropType } from '../../../prop-types';

const ItemsList = ({ ingredients }) => {
  const { bun, rest } = ingredients;

  const dispatch = useDispatch();

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    const dragItem = rest[dragIndex];
    const items = [...rest];
    items.splice(dragIndex, 1);
    items.splice(hoverIndex, 0, dragItem);

    dispatch(updateConstructorIngredients(items));
  }, [rest, dispatch]);

  return (
    <>
      {bun && <Item item={bun} isLocked={true} type="top" />}
      <div className="item-list overflow-y-hidden h-full mt-4 mb-4">
        <div className="custom-scroll">
          <div className={styles.items}>
            {rest.map((item, index) => (
              <DragItem item={item} index={index} key={item.dragId} move={moveItem} />
            ))}
          </div>
        </div>
      </div>
      {bun && <Item item={bun} isLocked={true} type="bottom" />}
    </>
  );
};

ItemsList.propType = {
  ingredients: constructorItemsPropType
};

export default ItemsList;
