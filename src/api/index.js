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

const saveTokens = (accessToken, refreshToken) => {
  setCookie('accessToken', accessToken.split('Bearer ')[1]);
  ls.set('refreshToken', refreshToken);
};

const resetTokens = () => {
  deleteCookie('accessToken');
  ls.remove('refreshToken');
};

export const refreshTokenRequest = () => api.post(AUTH_TOKEN_URL, {
  token: ls.get('refreshToken')
});

const apiWithRefreshToken = async (requestCallback) => {
  try {
    return await requestCallback();
  } catch (error) {
    if (error.message === 'jwt expired') {
      const { accessToken, refreshToken } = await refreshTokenRequest();
      saveTokens(accessToken, refreshToken);

      return await requestCallback();
    } else {
      return Promise.reject(error);
    }
  }
};

export const getIngredientsRequest = () => api.get(API_INGREDIENTS_URL);

export const orderRequest = (ingredients) => api.postWithAuth(API_ORDERS_URL, { ingredients });

export const forgotPasswordRequest = (email) => api.post(PASSWORD_FORGOT_URL, { email });

export const resetPasswordRequest = (payload) => api.post(PASSWORD_RESET_URL, payload);

export const loginRequest = async (payload) => {
  const response = await api.post(AUTH_LOGIN_URL, payload);
  const { accessToken, refreshToken } = response;
  saveTokens(accessToken, refreshToken);

  return response;
};

export const registerRequest = async (payload) => {
  const response = await api.post(AUTH_REGISTER_URL, payload);
  const { accessToken, refreshToken } = response;
  saveTokens(accessToken, refreshToken);

  return response;
};

export const logoutRequest = () => apiWithRefreshToken(
  () => api.postWithAuth(AUTH_LOGOUT_URL, {
    token: ls.get('refreshToken')
  })
    .then((response) => {
      resetTokens();
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    }));

export const fetchUserRequest = () => apiWithRefreshToken(() => api.getWithAuth(AUTH_USER_URL));

export const updateUserRequest = (payload) => apiWithRefreshToken(() => api.getWithAuth(AUTH_USER_URL, {
  method: 'PATCH',
  body: JSON.stringify(payload)
}));
