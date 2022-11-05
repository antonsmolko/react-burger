import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import styles from './styles.module.scss';
import { constructorItemsPropTypes } from '../../../prop-types';
import { useConstructorIngredientsQtyMap } from '../../../hooks';

const TypeSection = forwardRef(({ type, title, items }, ref) => {
  const qtyMap = useConstructorIngredientsQtyMap();

  return (
    <section ref={ref} className="pt-10">
      <span className="text text_type_main-medium">{title}</span>
      <div className={styles.items}>
        {items.map((item) => <Item item={item} qty={qtyMap[item._id]} key={item._id} />)}
      </div>
    </section>
  );
});

TypeSection.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: constructorItemsPropTypes
};

export default TypeSection;
