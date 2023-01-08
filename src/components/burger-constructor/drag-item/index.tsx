import { FC, SyntheticEvent, useRef } from 'react';
import Item from '../item';
import get from 'lodash/get';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { IConstructorDragItem, TDragItem } from '../../../services/types';
import { DragLayerMonitor } from 'react-dnd/src/types/monitors';

const DragItem: FC<IConstructorDragItem> = ({ move, item, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },

    hover(dragItem: TDragItem | unknown, monitor: DropTargetMonitor) {
      if (!ref.current || !dragItem || typeof dragItem !== 'object') {
        return;
      }

      const hoverIndex = index;

      // @FIXME: HELP ME: костыль, без которого не получается
      const dragIndex = get(dragItem, 'index', hoverIndex);

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const clientTopOffset = clientOffset?.y || 0;
      const hoverClientY = clientTopOffset - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      move(dragIndex, hoverIndex);

      // @FIXME: HELP ME: понять бы, что от меня хотят
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dragItem.index = hoverIndex; // eslint-disable-line no-param-reassign
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item._id, index }),
    collect: (monitor: DragLayerMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  if (item.type !== 'bun') drag(drop(ref));
  const preventDefault = (event: SyntheticEvent) => event.preventDefault();

  return (
    <div
      data-testid={`order-drag-item-${index}`}
      data-handler-id={handlerId}
      onDrop={preventDefault}
      ref={ref}
      style={{ opacity }}
    >
      <Item item={item} index={index}/>
    </div>
  );
};

export default DragItem;
