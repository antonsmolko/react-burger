import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from '../constants/auth';
import { TUser } from '../types';
import { TAuthActions } from '../actions';

export type TAuthState = {
  ready: boolean;
  user: TUser;
  loggedIn: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  registerRequest: boolean;
  registerFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  fetchUserRequest: boolean;
  fetchUserFailed: boolean;
  updateUserRequest: boolean;
  updateUserFailed: boolean ;};

const initialState: TAuthState = {
  ready: false,
  user: {
    email: '',
    name: ''
  },
  loggedIn: false,
  loginRequest: false,
  loginFailed: false,
  registerRequest: false,
  registerFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  fetchUserRequest: false,
  fetchUserFailed: false,
  updateUserRequest: false,
  updateUserFailed: false
};

export const auth = (state: TAuthState = initialState, action: TAuthActions): TAuthState => {
  switch (action.type) {
  case LOGIN_REQUEST: {
    return {
      ...state,
      loginRequest: true
    };
  }
  case LOGIN_SUCCESS: {
    return {
      ...state,
      loginRequest: false,
      loginFailed: false,
      user: action.payload,
      loggedIn: true
    };
  }
  case LOGIN_FAILED: {
    return {
      ...state,
      loginRequest: false,
      loginFailed: true
    };
  }
  case REGISTER_REQUEST: {
    return {
      ...state,
      registerRequest: true
    };
  }
  case REGISTER_SUCCESS: {
    return {
      ...state,
      registerRequest: false,
      registerFailed: false,
      user: action.payload,
      loggedIn: true
    };
  }
  case REGISTER_FAILED: {
    return {
      ...state,
      registerRequest: false,
      registerFailed: true
    };
  }
  case LOGOUT_REQUEST: {
    return {
      ...state,
      logoutRequest: true
    };
  }
  case LOGOUT_SUCCESS: {
    return {
      ...state,
      logoutRequest: false,
      logoutFailed: false,
      user: initialState.user,
      loggedIn: false
    };
  }
  case LOGOUT_FAILED: {
    return {
      ...state,
      logoutRequest: false,
      logoutFailed: true
    };
  }
  case FORGOT_PASSWORD_REQUEST: {
    return {
      ...state,
      forgotPasswordRequest: true
    };
  }
  case FORGOT_PASSWORD_SUCCESS: {
    return {
      ...state,
      forgotPasswordRequest: false,
      forgotPasswordFailed: false
    };
  }
  case FORGOT_PASSWORD_FAILED: {
    return {
      ...state,
      forgotPasswordRequest: false,
      forgotPasswordFailed: true
    };
  }
  case RESET_PASSWORD_REQUEST: {
    return {
      ...state,
      resetPasswordRequest: true
    };
  }
  case RESET_PASSWORD_SUCCESS: {
    return {
      ...state,
      resetPasswordRequest: false,
      resetPasswordFailed: false
    };
  }
  case RESET_PASSWORD_FAILED: {
    return {
      ...state,
      resetPasswordRequest: false,
      resetPasswordFailed: true
    };
  }
  case FETCH_USER_REQUEST: {
    return {
      ...state,
      fetchUserRequest: true
    };
  }
  case FETCH_USER_SUCCESS: {
    return {
      ...state,
      fetchUserRequest: false,
      fetchUserFailed: false,
      user: action.payload,
      ready: true,
      loggedIn: true
    };
  }
  case FETCH_USER_FAILED: {
    return {
      ...state,
      fetchUserRequest: false,
      fetchUserFailed: true,
      ready: true
    };
  }
  case UPDATE_USER_REQUEST: {
    return {
      ...state,
      updateUserRequest: true
    };
  }
  case UPDATE_USER_SUCCESS: {
    return {
      ...state,
      updateUserRequest: false,
      updateUserFailed: false,
      user: action.payload
    };
  }
  case UPDATE_USER_FAILED: {
    return {
      ...state,
      updateUserRequest: false,
      updateUserFailed: true,
    };
  }
  default:
    return state;
  }
};
