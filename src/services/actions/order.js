import { orderRequest } from '../../api';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';
export const RESET_CURRENT_ORDER = 'RESET_CURRENT_ORDER';

export const createOrder = (payload) => (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  return orderRequest(payload)
    .then(({ order, success, message }) => {
      if (success) {
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: order });
      } else {
        throw new Error(message);
      }
    })
    .catch(() => {
      dispatch({ type: CREATE_ORDER_FAILED });
    });
};

export const resetCurrentOrder = () => ({ type: RESET_CURRENT_ORDER });
