import React from 'react';
import PropTypes from 'prop-types';
import NutritionItem from './nutrition-item';
import styles from './styles.module.scss';

const IngredientDetails = ({ item }) => (
  <>
    <div className={styles.image}>
      <img src={item.image_large} alt={item.name} />
    </div>
    <p className="text text_type_main-medium text-center mt-4">{item.name}</p>
    <div className={`${styles.nutrition} mt-8`}>
      <NutritionItem text="Калории, ккал" value={item.calories} />
      <NutritionItem text="Белки, г" value={item.proteins} />
      <NutritionItem text="Жиры, г" value={item.fat} />
      <NutritionItem text="Углеводы, г" value={item.carbohydrates} />
    </div>
  </>
);

IngredientDetails.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    calories: PropTypes.number,
    fat: PropTypes.number,
    proteins: PropTypes.number,
    carbohydrates: PropTypes.number,
    image_large: PropTypes.string,
  })
};

export default IngredientDetails;
