import { useRef } from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import { useDrag, useDrop } from 'react-dnd';
import { constructorItemPropTypes } from '../../../prop-types';

const DragItem = ({ move, item, index }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },

    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      move(dragIndex, hoverIndex);

      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  if (item.type !== 'bun') drag(drop(ref));
  const preventDefault = (e) => e.preventDefault();

  return (
    <div
      data-handler-id={handlerId}
      onDrop={preventDefault}
      ref={ref}
      style={{ opacity }}
    >
      <Item item={item} index={index}/>
    </div>
  );
};

DragItem.propTypes = {
  item: constructorItemPropTypes,
  index: PropTypes.number.isRequired,
  move: PropTypes.func.isRequired,
};

export default DragItem;
