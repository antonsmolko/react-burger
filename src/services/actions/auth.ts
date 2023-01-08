import {
  AppDispatch,
  TUser,
  TUseFormInitialState,
  TApiResetPasswordRequestPayload,
  TUserRegisterRequest
} from '../types';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from '../constants/auth';

import {
  loginRequest,
  registerRequest,
  logoutRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  fetchUserRequest,
  updateUserRequest
} from '../../api';

export interface ILoginAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: TUser;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export interface IRegisterAction {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: TUser;
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
}

export interface ILogoutAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IFetchUserAction {
  readonly type: typeof FETCH_USER_REQUEST;
}

export interface IFetchUserSuccessAction {
  readonly type: typeof FETCH_USER_SUCCESS;
  readonly payload: TUser;
}

export interface IFetchUserFailedAction {
  readonly type: typeof FETCH_USER_FAILED;
}

export interface IUpdateUserAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: TUser;
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

export interface IForgotPasswordAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IResetPasswordAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export type TAuthActions =
  | ILoginAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | IRegisterAction
  | IRegisterSuccessAction
  | IRegisterFailedAction
  | ILogoutAction
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | IFetchUserAction
  | IFetchUserSuccessAction
  | IFetchUserFailedAction
  | IUpdateUserAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction
  | IForgotPasswordAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction
  | IResetPasswordAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction

const fetchUserRequestAction = (): IFetchUserAction => ({
  type: FETCH_USER_REQUEST
});

const fetchUserSuccessAction = (user: TUser): IFetchUserSuccessAction => ({
  type: FETCH_USER_SUCCESS,
  payload: user
});

const fetchUserFailedAction = (): IFetchUserFailedAction => ({
  type: FETCH_USER_FAILED
});

export const fetchUser = () => async (dispatch: AppDispatch) => {
  dispatch(fetchUserRequestAction());

  try {
    const { success, user } = await fetchUserRequest();

    if (success) {
      dispatch(fetchUserSuccessAction(user));
    } else {
      dispatch(fetchUserFailedAction());
    }
  } catch {
    dispatch(fetchUserFailedAction());
  }
};

const updateUserRequestAction = (): IUpdateUserAction => ({
  type: UPDATE_USER_REQUEST
});

const updateUserSuccessAction = (user: TUser): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  payload: user
});

const updateUserFailedAction = (): IUpdateUserFailedAction => ({
  type: UPDATE_USER_FAILED
});

export const updateUser = (payload: TUseFormInitialState) => async (dispatch: AppDispatch) => {
  dispatch(updateUserRequestAction());

  try {
    const { success, user } = await updateUserRequest(payload);

    if (success) {
      dispatch(updateUserSuccessAction(user));
    } else {
      dispatch(updateUserFailedAction());
    }
  } catch {
    dispatch(updateUserFailedAction());
  }
};

const loginRequestAction = (): ILoginAction => ({
  type: LOGIN_REQUEST
});

const loginSuccessAction = (form: TUser): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: form
});

const loginFailedAction = (): ILoginFailedAction => ({
  type: LOGIN_FAILED
});

export const login = (payload: TUserRegisterRequest) => async (dispatch: AppDispatch) => {
  dispatch(loginRequestAction());

  try {
    const { success, user } = await loginRequest(payload);

    if (success) {
      dispatch(loginSuccessAction(user));
    } else {
      dispatch(loginFailedAction());
    }
  } catch {
    dispatch(loginFailedAction());
  }
};

const registerRequestAction = (): IRegisterAction => ({
  type: REGISTER_REQUEST
});

const registerSuccessAction = (form: TUser): IRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  payload: form
});

const registerFailedAction = (): IRegisterFailedAction => ({
  type: REGISTER_FAILED
});

export const register = (payload: TUserRegisterRequest) => async (dispatch: AppDispatch) => {
  dispatch(registerRequestAction());

  try {
    const { success, user } = await registerRequest(payload);

    if (success) {
      dispatch(registerSuccessAction(user));
    } else {
      dispatch(registerFailedAction());
    }

  } catch {
    dispatch(registerFailedAction());
  }
};

const logoutRequestAction = (): ILogoutAction => ({
  type: LOGOUT_REQUEST
});

const logoutSuccessAction = (): ILogoutSuccessAction => ({
  type: LOGOUT_SUCCESS
});

const logoutFailedAction = (): ILogoutFailedAction => ({
  type: LOGOUT_FAILED
});

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(logoutRequestAction());
  try {
    const { success } = await logoutRequest();

    if (success) {
      dispatch(logoutSuccessAction());
    } else {
      dispatch(logoutFailedAction());
    }
  } catch {
    dispatch(logoutFailedAction());
  }
};

const forgotPasswordRequestAction = (): IForgotPasswordAction => ({
  type: FORGOT_PASSWORD_REQUEST
});

const forgotPasswordSuccessAction = (): IForgotPasswordSuccessAction => ({
  type: FORGOT_PASSWORD_SUCCESS
});
const forgotPasswordFailedAction = (): IForgotPasswordFailedAction => ({
  type: FORGOT_PASSWORD_FAILED
});

export const forgotPassword = (payload: TUseFormInitialState) => async (dispatch: AppDispatch) => {
  dispatch(forgotPasswordRequestAction());

  try {
    const { success } = await forgotPasswordRequest(payload.email);

    if (success) {
      dispatch(forgotPasswordSuccessAction());
    } else {
      dispatch(forgotPasswordFailedAction());
    }
  } catch {
    dispatch(forgotPasswordFailedAction());
  }
};

const resetPasswordRequestAction = (): IResetPasswordAction => ({
  type: RESET_PASSWORD_REQUEST
});

const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS
});

const resetPasswordFailedAction = (): IResetPasswordFailedAction => ({
  type: RESET_PASSWORD_FAILED
});

export const resetPassword = (payload: TApiResetPasswordRequestPayload) => async (dispatch: AppDispatch) => {
  dispatch(resetPasswordRequestAction());
  try {
    const { success } = await resetPasswordRequest(payload);

    if (success) {
      dispatch(resetPasswordSuccessAction());
    } else {
      dispatch(resetPasswordFailedAction());
    }
  } catch {
    dispatch(resetPasswordFailedAction());
  }
};
