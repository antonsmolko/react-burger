import { setCookie, ls, deleteCookie } from '../services/utils';
import api from './instance';

import {
  API_INGREDIENTS_URL,
  API_ORDERS_URL,
  PASSWORD_FORGOT_URL,
  PASSWORD_RESET_URL,
  AUTH_LOGIN_URL,
  AUTH_TOKEN_URL,
  AUTH_USER_URL,
  AUTH_LOGOUT_URL,
  AUTH_REGISTER_URL
} from '../config';
import {
  TApiRequest,
  TApiWithRefreshToken,
  TApiResetToken,
  TApiSaveToken,
  TApiResetPasswordRequest,
  TApiForgotPasswordRequest,
  TApiLoginRequest,
  TApiRegisterRequest,
  TApiUpdateUserRequest,
  TIngredientsIngredient, TUser, IOrder
} from '../services/types';

type TResponseBody<TDataKey extends string = '', TDataType = Record<string, unknown>> = {
  [key in TDataKey]: TDataType
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
};

const saveTokens: TApiSaveToken = (accessToken, refreshToken) => {
  setCookie('accessToken', accessToken.split('Bearer ')[1]);
  ls.set('refreshToken', refreshToken);
};

const resetTokens: TApiResetToken = () => {
  deleteCookie('accessToken');
  ls.remove('refreshToken');
};

export const refreshTokenRequest: TApiRequest = () => api.post(AUTH_TOKEN_URL, {
  token: ls.get('refreshToken')
});

const apiWithRefreshToken: TApiWithRefreshToken = async (requestCallback) => {
  try {
    return await requestCallback();
  } catch (error) {
    if (error instanceof Error && error.message === 'jwt expired') {
      const { accessToken, refreshToken } = await refreshTokenRequest();
      saveTokens(accessToken, refreshToken);

      return await requestCallback();
    } else {
      return Promise.reject(error);
    }
  }
};

export const getIngredientsRequest = (): Promise<
  TResponseBody<'data', Array<TIngredientsIngredient>>
  > => api.get(API_INGREDIENTS_URL);

export const orderRequest = (ingredients: string[]): Promise<
  TResponseBody<'order', IOrder>
> => api.postWithAuth(API_ORDERS_URL, { ingredients });

export const getOrderRequest = (number: string): Promise<
  TResponseBody<'orders', IOrder[]>
> => api.get(`${API_ORDERS_URL}/${number}`);

export const getUserOrderRequest = (number: string): Promise<
  TResponseBody<'orders', IOrder[]>
> => api.getWithAuth(`${API_ORDERS_URL}/${number}`);

export const forgotPasswordRequest: TApiForgotPasswordRequest = (email) => api.post(PASSWORD_FORGOT_URL, { email });

export const resetPasswordRequest: TApiResetPasswordRequest = (payload) => api.post(PASSWORD_RESET_URL, payload);

export const loginRequest: TApiLoginRequest = async (payload) => {
  const response = await api.post(AUTH_LOGIN_URL, payload);
  const { accessToken, refreshToken } = response;
  saveTokens(accessToken, refreshToken);

  return response;
};

export const registerRequest: TApiRegisterRequest = async (payload): Promise<
  TResponseBody<'user' | 'success', TUser | boolean>
> => {
  const response = await api.post(AUTH_REGISTER_URL, payload);
  const { accessToken, refreshToken } = response;
  saveTokens(accessToken, refreshToken);

  return response;
};

export const logoutRequest: TApiRequest = () => apiWithRefreshToken(
  () => api.postWithAuth(AUTH_LOGOUT_URL, {
    token: ls.get('refreshToken')
  })
    .then((response: Response) => {
      resetTokens();
      return response;
    })
    .catch((error: Error) => {
      throw error;
    }));

export const fetchUserRequest: TApiRequest = () => apiWithRefreshToken(() => api.getWithAuth(AUTH_USER_URL));

export const updateUserRequest: TApiUpdateUserRequest = (payload) => apiWithRefreshToken(
  () => api.getWithAuth(AUTH_USER_URL, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  }));
