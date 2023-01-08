import * as types from '../../constants/auth';
import { auth as reducer, initialState as state } from './index';
import { TUser } from '../../types';

const user: TUser = {
  email: 'test@test.com',
  name: 'test name'
};
describe('auth reducer', () => {
  it('should return the initial state', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(state);
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(
      reducer(state, {
        type: types.LOGIN_REQUEST
      })
    ).toEqual({
      ...state,
      loginRequest: true
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      reducer(state, {
        type: types.LOGIN_SUCCESS,
        payload: user
      })
    ).toEqual({
      ...state,
      loginRequest: false,
      loginFailed: false,
      user,
      loggedIn: true
    });
  });

  it('should handle LOGIN_FAILED', () => {
    expect(
      reducer(state, {
        type: types.LOGIN_FAILED
      })
    ).toEqual({
      ...state,
      loginRequest: false,
      loginFailed: true
    });
  });

  it('should handle REGISTER_REQUEST', () => {
    expect(
      reducer(state, {
        type: types.REGISTER_REQUEST
      })
    ).toEqual({
      ...state,
      registerRequest: true
    });
  });

  it('should handle REGISTER_SUCCESS', () => {
    expect(
      reducer(state, {
        type: types.REGISTER_SUCCESS,
        payload: user
      })
    ).toEqual({
      ...state,
      registerRequest: false,
      registerFailed: false,
      user,
      loggedIn: true
    });
  });

  it('should handle REGISTER_FAILED', () => {
    expect(
      reducer(state, {
        type: types.REGISTER_FAILED
      })
    ).toEqual({
      ...state,
      registerRequest: false,
      registerFailed: true
    });
  });

  it('should handle LOGOUT_REQUEST', () => {
    expect(
      reducer(state, {
        type: types.LOGOUT_REQUEST
      })
    ).toEqual({
      ...state,
      logoutRequest: true
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      reducer(state, {
        type: types.LOGOUT_SUCCESS
      })
    ).toEqual({
      ...state,
      logoutRequest: false,
      logoutFailed: false,
      loggedIn: false
    });
  });

  it('should handle LOGOUT_FAILED', () => {
    expect(
      reducer(state, {
        type: types.LOGOUT_FAILED
      })
    ).toEqual({
      ...state,
      logoutRequest: false,
      logoutFailed: true
    });
  });

  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    expect(
      reducer(state, {
        type: types.FORGOT_PASSWORD_REQUEST
      })
    ).toEqual({
      ...state,
      forgotPasswordRequest: true
    });
  });

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    expect(
      reducer(state, {
        type: types.FORGOT_PASSWORD_SUCCESS
      })
    ).toEqual({
      ...state,
      forgotPasswordRequest: false,
      forgotPasswordFailed: false
    });
  });

  it('should handle FORGOT_PASSWORD_FAILED', () => {
    expect(
      reducer(state, {
        type: types.FORGOT_PASSWORD_FAILED
      })
    ).toEqual({
      ...state,
      forgotPasswordRequest: false,
      forgotPasswordFailed: true
    });
  });

  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(
      reducer(state, {
        type: types.RESET_PASSWORD_REQUEST
      })
    ).toEqual({
      ...state,
      resetPasswordRequest: true
    });
  });

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    expect(
      reducer(state, {
        type: types.RESET_PASSWORD_SUCCESS
      })
    ).toEqual({
      ...state,
      resetPasswordRequest: false,
      resetPasswordFailed: false
    });
  });

  it('should handle RESET_PASSWORD_FAILED', () => {
    expect(
      reducer(state, {
        type: types.RESET_PASSWORD_FAILED
      })
    ).toEqual({
      ...state,
      resetPasswordRequest: false,
      resetPasswordFailed: true
    });
  });

  it('should handle FETCH_USER_REQUEST', () => {
    expect(
      reducer(state, {
        type: types.FETCH_USER_REQUEST
      })
    ).toEqual({
      ...state,
      fetchUserRequest: true
    });
  });

  it('should handle FETCH_USER_SUCCESS', () => {
    expect(
      reducer(state, {
        type: types.FETCH_USER_SUCCESS,
        payload: user
      })
    ).toEqual({
      ...state,
      fetchUserRequest: false,
      fetchUserFailed: false,
      user,
      ready: true,
      loggedIn: true
    });
  });

  it('should handle FETCH_USER_FAILED', () => {
    expect(
      reducer(state, {
        type: types.FETCH_USER_FAILED
      })
    ).toEqual({
      ...state,
      fetchUserRequest: false,
      fetchUserFailed: true,
      ready: true
    });
  });

  it('should handle UPDATE_USER_REQUEST', () => {
    expect(
      reducer(state, {
        type: types.UPDATE_USER_REQUEST
      })
    ).toEqual({
      ...state,
      updateUserRequest: true
    });
  });

  it('should handle UPDATE_USER_SUCCESS', () => {
    expect(
      reducer(state, {
        type: types.UPDATE_USER_SUCCESS,
        payload: user
      })
    ).toEqual({
      ...state,
      updateUserRequest: false,
      updateUserFailed: false,
      user
    });
  });

  it('should handle UPDATE_USER_FAILED', () => {
    expect(
      reducer(state, {
        type: types.UPDATE_USER_FAILED
      })
    ).toEqual({
      ...state,
      updateUserRequest: false,
      updateUserFailed: true
    });
  });
});
