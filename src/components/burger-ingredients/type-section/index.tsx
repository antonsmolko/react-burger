import React, { forwardRef } from 'react';
import Item from '../item';
import styles from './styles.module.scss';
import { useConstructorIngredientsQtyMap } from '../../../hooks';
import { IIngredientsTypeSection } from '../../../services/types';

const TypeSection = forwardRef<HTMLDivElement, IIngredientsTypeSection>(({ title, items }, ref) => {
  const qtyMap = useConstructorIngredientsQtyMap();

  return (
    <section ref={ref} className="pt-10">
      <span className="text text_type_main-medium">{title}</span>
      <div className={styles.items}>
        {items.map((item, index) => (
          <Item item={item} qty={qtyMap[item._id]} key={item._id} index={index} />
        ))}
      </div>
    </section>
  );
});

export default TypeSection;
