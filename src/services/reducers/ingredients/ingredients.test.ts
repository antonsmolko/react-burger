import * as types from '../../constants/ingredients';
import { ingredients as reducer, initialState as state } from './index';
import { TIngredientsIngredient } from '../../types';

describe('ingredient reducer', () => {
  it('should return the initial state', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(state);
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(
      reducer(state, {
        type: types.GET_INGREDIENTS_REQUEST
      })
    ).toEqual({
      ...state,
      ingredientsRequest: true
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    const items: TIngredientsIngredient[] = [
      {
        _id: 'ad8fa98a3sf8',
        name: 'bun bun',
        price: 5900,
        type: 'bun',
        image: 'image.png',
        image_mobile: 'image_mobile.png',
        image_large: 'image_large.png',
        calories: 3999,
        fat: 20,
        proteins: 10,
        carbohydrates: 60
      }
    ];

    expect(
      reducer(state, {
        type: types.GET_INGREDIENTS_SUCCESS,
        payload: items
      })
    ).toEqual({
      ...state,
      ingredientsRequest: false,
      ingredientsFailed: false,
      items
    });
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(
      reducer(state, {
        type: types.GET_INGREDIENTS_FAILED
      })
    ).toEqual({
      ...state,
      ingredientsRequest: false,
      ingredientsFailed: true
    });
  });
});
