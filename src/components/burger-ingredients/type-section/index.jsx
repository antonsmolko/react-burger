import React from 'react';
import Item from '../item';
import styles from './styles.module.scss';
import { constructorItemsPropTypes } from '../../../prop-types';
import PropTypes from 'prop-types';

const TypeSection = ({ type, title, items }) => {
  return (
    <section id={type} className="pt-10">
      <span className="text text_type_main-medium">{title}</span>
      <div className={styles.items}>
        {items.map((item) => <Item item={item} count={1} key={item._id} />)}
      </div>
    </section>
  );
};

TypeSection.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: constructorItemsPropTypes
};

export default TypeSection;
