import React from 'react';
import PropTypes from 'prop-types';

const NutritionItem = ({ text, value }) => (
  <div className="text-center">
    <p className="text text_type_main-default text_color_inactive text-nowrap">{text}</p>
    <p className="text text_type_digits-default text_color_inactive mt-2">{value}</p>
  </div>
);

NutritionItem.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default NutritionItem;
