import React, { FC } from 'react';
import cn from 'classnames';
import styles from './ingredient-preview.module.scss';

export interface IIngredientPreview {
  image: string;
  name: string;
  isLast?: boolean;
  more?: number
}

const IngredientPreview: FC<IIngredientPreview> = ({ image, name, isLast = false, more = 0 }) => {
  const showMore = isLast && more > 0;

  const innerStyles = cn(styles.previewInner, {
    'has-more': showMore
  });

  const moreStyles = cn(styles.previewMore, 'text text_type_main-default');

  return (
    <div className={styles.preview}>
      <div className={innerStyles}>
        <img src={image} alt={name} />
        { showMore && <span className={moreStyles}>+{more}</span>}
      </div>
    </div>
  );
};

export default IngredientPreview;
