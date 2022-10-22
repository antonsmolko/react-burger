import { useSelector } from 'react-redux';

export const useConstructorIngredientsQtyMap = () => {
  const { bun, rest } = useSelector((store) => store.constructorIngredients);

  const result = bun ? { [bun._id]: 2 } : {};

  return rest.reduce((acc, { _id }) => ({ ...acc, [_id]: acc[_id] ? acc[_id] + 1 : 1 }), result);
};
