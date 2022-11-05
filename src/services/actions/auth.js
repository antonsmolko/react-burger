import {
  loginRequest,
  registerRequest,
  logoutRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  fetchUserRequest,
  updateUserRequest
} from '../../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const fetchUser = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_REQUEST });

  try {
    const { success, user } = await fetchUserRequest();

    if (success) {
      dispatch({ type: FETCH_USER_SUCCESS, payload: user });
    } else {
      dispatch({ type: FETCH_USER_FAILED });
    }
  } catch {
    dispatch({ type: FETCH_USER_FAILED });
  }
};

export const updateUser = (payload) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });

  try {
    const { success, user } = await updateUserRequest(payload);

    if (success) {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: user });
    } else {
      dispatch({ type: UPDATE_USER_FAILED });
    }
  } catch {
    dispatch({ type: UPDATE_USER_FAILED });
  }
};

export const login = (payload) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { success, user } = await loginRequest(payload);

    if (success) {
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    } else {
      dispatch({ type: LOGIN_FAILED });
    }
  } catch {
    dispatch({ type: LOGIN_FAILED });
  }
};

export const register = (payload) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { success, user } = await registerRequest(payload);

    if (success) {
      dispatch({ type: REGISTER_SUCCESS, payload: user });
    } else {
      dispatch({ type: REGISTER_FAILED });
    }

  } catch {
    dispatch({ type: REGISTER_FAILED });
  }
};

export const logout = (token) => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    const { success } = await logoutRequest(token);

    if (success) {
      dispatch({ type: LOGOUT_SUCCESS });
    } else {
      dispatch({ type: LOGOUT_FAILED });
    }
  } catch {
    dispatch({ type: LOGOUT_FAILED });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });
  try {
    const { success } = await forgotPasswordRequest(email);

    if (success) {
      dispatch({ type: FORGOT_PASSWORD_SUCCESS });
    } else {
      dispatch({ type: FORGOT_PASSWORD_FAILED });
    }
  } catch {
    dispatch({ type: FORGOT_PASSWORD_FAILED });
  }
};

export const resetPassword = (payload) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    const { success } = await resetPasswordRequest(payload);

    if (success) {
      dispatch({ type: RESET_PASSWORD_SUCCESS });
    } else {
      dispatch({ type: RESET_PASSWORD_FAILED });
    }
  } catch {
    dispatch({ type: RESET_PASSWORD_FAILED });
  }
};
