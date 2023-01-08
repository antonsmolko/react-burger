import React, { FC } from 'react';
import { INutritionItem } from '../../../services/types';

const NutritionItem: FC<INutritionItem> = ({ text, value }) => (
  <div className="text-center">
    <p className="text text_type_main-default text_color_inactive text-nowrap">{text}</p>
    <p className="text text_type_digits-default text_color_inactive mt-2">{value}</p>
  </div>
);

export default NutritionItem;
