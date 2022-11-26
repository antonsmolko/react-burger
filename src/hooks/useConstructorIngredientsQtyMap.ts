import { useSelector } from 'react-redux';
import { TUseConstructorIngredientsQtyMap } from '../services/types';

export const useConstructorIngredientsQtyMap: TUseConstructorIngredientsQtyMap = () => {
  // @FIXME: next sprint
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { bun, rest } = useSelector((store) => store.burgerConstructor.items);

  const result = bun ? { [bun._id]: 2 } : {};

  // @FIXME: next sprint
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return rest.reduce((acc, { _id }) => ({ ...acc, [_id]: acc[_id] ? acc[_id] + 1 : 1 }), result);
};
