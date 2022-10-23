import { getIngredientsRequest } from '../../api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredients = () => async (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });

  await getIngredientsRequest()
    .then(({ data }) => {
      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data });
    })
    .catch(() => {
      dispatch({ type: GET_INGREDIENTS_FAILED });
    });
};
