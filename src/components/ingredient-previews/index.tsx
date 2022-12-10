import React, { FC } from 'react';
import IngredientPreview from '../ingredient-preview';
import styles from './ingredient-previews.module.scss';
import { useIngredients } from '../../hooks';

interface IIngredientPreviews {
  items: string[]
}

const PREVIEWS_COUNT = 6;

const IngredientPreviews: FC<IIngredientPreviews> = ({ items }) => {
  const ingredients = useIngredients();
  const displayedPreviews = items.slice(0, PREVIEWS_COUNT);
  const displayedPreviewsLastIndex = displayedPreviews.length - 1;
  const more = Math.max(0, items.length - PREVIEWS_COUNT);

  return (
    <div className={styles.previews}>
      {
        displayedPreviews.map((id, index) => {
          const ingredient = ingredients[id];

          return (
            <IngredientPreview
              image={ingredient.image_mobile}
              name={ingredient.name}
              isLast={index === displayedPreviewsLastIndex}
              more={more}
              key={index}
            />
          );
        })
      }
    </div>
  );
};

export default IngredientPreviews;
