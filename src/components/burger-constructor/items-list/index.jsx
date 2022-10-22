import { useCallback } from 'react';
import Item from '../item';
import { useDispatch } from 'react-redux';
import styles from '../styles.module.scss';
import React from 'react';
import { UPDATE_CONSTRUCTOR_INGREDIENTS } from '../../../services/actions';
import DragItem from '../drag-item';
import PropTypes from 'prop-types';
import { constructorItemPropTypes } from '../../../prop-types';

const ItemsList = ({ ingredients }) => {
  const { bun, rest } = ingredients;

  const dispatch = useDispatch();

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    const dragItem = rest[dragIndex];
    const items = [...rest];
    items.splice(dragIndex, 1);
    items.splice(hoverIndex, 0, dragItem);

    dispatch({
      type: UPDATE_CONSTRUCTOR_INGREDIENTS,
      payload: items,
    });
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

ItemsList.prototype = {
  ingredients: PropTypes.shape({
    bun: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
    rest: PropTypes.arrayOf(constructorItemPropTypes)
  }).isRequired
};

export default ItemsList;
