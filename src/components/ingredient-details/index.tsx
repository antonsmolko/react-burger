import React, { FC } from 'react';
import { useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import NutritionItem from './nutrition-item';
import styles from './styles.module.scss';

const IngredientDetails: FC = () => {
  const { ingredientId } = useParams();
  const ingredient = useSelector((store) => store.ingredients.items.find(({ _id }) => _id === ingredientId));

  return ingredient
    ? (
      <div data-testid="ingredient-details">
        <div className={styles.image}>
          <img src={ingredient.image_large} alt={ingredient.name} />
        </div>
        <p className="text text_type_main-medium text-center mt-4">{ingredient.name}</p>
        <div className={`${styles.nutrition} mt-8`}>
          <NutritionItem text="Калории, ккал" value={ingredient.calories} />
          <NutritionItem text="Белки, г" value={ingredient.proteins} />
          <NutritionItem text="Жиры, г" value={ingredient.fat} />
          <NutritionItem text="Углеводы, г" value={ingredient.carbohydrates} />
        </div>
      </div>
    )
    : null;
};

export default IngredientDetails;
