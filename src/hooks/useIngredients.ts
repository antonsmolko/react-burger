import { useSelector } from '../services/hooks';
import { TUseIngredients } from '../services/types';


export const useIngredients: TUseIngredients = () => {
  const ingredients = useSelector((store) => store.ingredients.items);
  return ingredients.reduce((acc, item) => ({ ...acc, [item._id]: item }), {});
};
