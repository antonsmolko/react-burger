import * as types from '../../constants/constructor';
import { constructor as reducer, initialState as state } from './index';
import { TConstructorDragIngredient } from '../../types';

const type = 'bun';
const item: TConstructorDragIngredient = {
  _id: 'ad8fa98a3sf8',
  dragId: 'asd9aa&6b32l2',
  name: 'bun bun',
  price: 5900,
  type,
  image: 'image.png',
  image_mobile: 'image_mobile.png',
  image_large: 'image_large.png',
  calories: 3999,
  fat: 20,
  proteins: 10,
  carbohydrates: 60
};
describe('constructor reducer', () => {
  it('should return the initial state', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(state);
  });

  it('should handle ADD_CONSTRUCTOR_INGREDIENT', () => {
    expect(
      reducer(state, {
        type: types.ADD_CONSTRUCTOR_INGREDIENT,
        payload: item
      })
    ).toEqual({
      ...state,
      items: {
        ...state.items,
        [type]: item
      }
    });
  });

  it('should handle REMOVE_CONSTRUCTOR_INGREDIENT', () => {
    const index = 1;
    const itemOne = { ...item, type: 'rest' };
    const itemTwo = { ...item, type: 'rest' };
    const itemThree = { ...item, type: 'rest' };
    const initialState = {
      ...state,
      items: {
        ...state.items,
        rest: [itemOne, itemTwo, itemThree]
      }
    };

    expect(
      reducer(initialState, {
        type: types.REMOVE_CONSTRUCTOR_INGREDIENT,
        payload: index
      })
    ).toEqual({
      ...initialState,
      items: {
        ...initialState.items,
        rest: [itemOne, itemThree]
      }
    });
  });

  it('should handle RESET_CONSTRUCTOR_INGREDIENTS', () => {
    expect(
      reducer(state, {
        type: types.RESET_CONSTRUCTOR_INGREDIENTS
      })
    ).toEqual(state);
  });
});
