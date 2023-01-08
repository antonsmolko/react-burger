import { orderRequest, getOrderRequest, getUserOrderRequest } from '../../api';

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  RESET_CURRENT_ORDER,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../constants/order';
import { AppDispatch, IOrder } from '../types';

export interface ICreateOrderAction {
  readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly payload: IOrder;
}

export interface ICreateOrderFailedAction {
  readonly type: typeof CREATE_ORDER_FAILED;
}

export interface IResetCurrentOrder {
  readonly type: typeof RESET_CURRENT_ORDER;
}

export interface IGetOrderAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: IOrder
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED
}

export type TOrderActions =
  | ICreateOrderAction
  | ICreateOrderSuccessAction
  | ICreateOrderFailedAction
  | IResetCurrentOrder
  | IGetOrderAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction;

const createOrderRequestAction = (): ICreateOrderAction => ({
  type: CREATE_ORDER_REQUEST
});

const createOrderSuccessAction = (order: IOrder): ICreateOrderSuccessAction => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order
});

const createOrderFailedAction = (): ICreateOrderFailedAction => ({
  type: CREATE_ORDER_FAILED
});

const getOrderRequestAction = (): IGetOrderAction => ({
  type: GET_ORDER_REQUEST,
});

const getOrderSuccessAction = (order: IOrder): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  payload: order
});

const getOrderFailedAction = (): IGetOrderFailedAction => ({
  type: GET_ORDER_FAILED
});

export const createOrder = (payload: string[]) => (dispatch: AppDispatch) => {
  dispatch(createOrderRequestAction());

  return orderRequest(payload)
    .then(({ order, success, message }) => {
      if (success) {
        dispatch(createOrderSuccessAction(order));
      } else {
        throw new Error(message);
      }
    })
    .catch(() => {
      dispatch(createOrderFailedAction());
    });
};

export const getOrder = (payload: string) => (dispatch: AppDispatch) => {
  dispatch(getOrderRequestAction);

  return getOrderRequest(payload)
    .then(({ orders, success }) => {
      if (success) {
        const [order] = orders;
        dispatch(getOrderSuccessAction(order));
      }
    })
    .catch(() => {
      dispatch(getOrderFailedAction());
    });
};

export const getUserOrder = (payload: string) => (dispatch: AppDispatch) => {
  dispatch(getOrderRequestAction);

  return getUserOrderRequest(payload)
    .then(({ orders, success }) => {
      if (success) {
        const [order] = orders;
        dispatch(getOrderSuccessAction(order));
      }
    })
    .catch(() => {
      dispatch(getOrderFailedAction());
    });
};

export const resetCurrentOrderAction = (): IResetCurrentOrder => ({
  type: RESET_CURRENT_ORDER
});
