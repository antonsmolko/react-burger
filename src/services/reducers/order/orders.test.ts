import * as types from '../../constants/order';
import { initialState as state, order as reducer } from './index';
import { IOrder } from '../../types';
import { OrderStatus } from '../../enums';

const order: IOrder = {
  _id: '=asd9322bn?fs78',
  ingredients: ['sd8f9ad7fa;34', 'sfa8akj320x72'],
  createdAt: new Date().toString(),
  name: 'Burger King',
  number: '12345',
  owner: {
    name: 'User',
    email: 'test@test.com'
  },
  price: 4444,
  status: OrderStatus.CREATED,
  updatedAt: new Date().toString()
};
describe('order reducer', () => {
  it('should return the initial state', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(state);
  });

  it('should handle CREATE_ORDER_REQUEST', () => {
    expect(
      reducer(state, {
        type: types.CREATE_ORDER_REQUEST
      })
    ).toEqual({
      ...state,
      createOrderRequest: true
    });
  });

  it('should handle CREATE_ORDER_SUCCESS', () => {
    expect(
      reducer(state, {
        type: types.CREATE_ORDER_SUCCESS,
        payload: order
      })
    ).toEqual({
      ...state,
      createOrderRequest: false,
      createOrderFailed: false,
      current: order
    });
  });

  it('should handle CREATE_ORDER_FAILED', () => {
    expect(
      reducer(state, {
        type: types.CREATE_ORDER_FAILED
      })
    ).toEqual({
      ...state,
      createOrderRequest: false,
      createOrderFailed: true
    });
  });

  it('should handle RESET_CURRENT_ORDER', () => {
    expect(
      reducer(state, {
        type: types.RESET_CURRENT_ORDER
      })
    ).toEqual({
      ...state,
      current: state.current
    });
  });

  it('should handle GET_ORDER_REQUEST', () => {
    expect(
      reducer(state, {
        type: types.GET_ORDER_REQUEST
      })
    ).toEqual({
      ...state,
      getOrderRequest: true
    });
  });

  it('should handle GET_ORDER_SUCCESS', () => {
    expect(
      reducer(state, {
        type: types.GET_ORDER_SUCCESS,
        payload: order
      })
    ).toEqual({
      ...state,
      getOrderRequest: false,
      getOrderFailed: false,
      current: order
    });
  });

  it('should handle GET_ORDER_FAILED', () => {
    expect(
      reducer(state, {
        type: types.GET_ORDER_FAILED
      })
    ).toEqual({
      ...state,
      getOrderRequest: false,
      getOrderFailed: true
    });
  });
});
