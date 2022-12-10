import { useSelector } from '../services/hooks';
import { TUseConstructorIngredientsQtyMap } from '../services/types';

export const useConstructorIngredientsQtyMap: TUseConstructorIngredientsQtyMap = () => {
  const { bun, rest } = useSelector((store) => store.burgerConstructor.items);
  const result = bun ? { [bun._id]: 2 } : {};

  return rest.reduce((acc, { _id }) => ({ ...acc, [_id]: acc[_id] ? acc[_id] + 1 : 1 }), result);
};
