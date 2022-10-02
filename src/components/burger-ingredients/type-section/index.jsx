import React from 'react';
import Item from '../item';
import typeSectionStyles from './type-section.module.scss';
import { constructorItemsPropTypes } from '../../../prop-types';
import PropTypes from 'prop-types';

const TypeSection = ({ title, items }) => {
  return (
    <section className="pt-10">
      <span className="text text_type_main-medium">{title}</span>
      <div className={typeSectionStyles.items}>
        {items.map((item) => <Item item={item} count={1} key={item._id} />)}
      </div>
    </section>
  );
};

TypeSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: constructorItemsPropTypes
};

export default TypeSection;
