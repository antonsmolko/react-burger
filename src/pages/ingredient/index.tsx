import { FC } from 'react';
import IngredientDetails from '../../components/ingredient-details';

export const IngredientPage: FC = () => {
  return (
    <div className={'d-flex justify-center align-center'}>
      <div className={'mt-30'}>
        <IngredientDetails />
      </div>
    </div>
  );
};
