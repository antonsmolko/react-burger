import { setCookie, getCookie, ls, deleteCookie } from '../services/utils';

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

const headers = {
  'Content-Type': 'application/json'
};

const checkResponse = (res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

const genAuthOptions = (options) => {
  const accessToken = getCookie('accessToken');
  return accessToken
    ? {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
        Authorization: `Bearer ${accessToken}`
      }
    }
    : options;
};

const genPostOptions = (payload, options) => (
  {
    ...options,
    method: 'POST',
    body: JSON.stringify(payload)
  }
);

const saveTokens = (accessToken, refreshToken) => {
  setCookie('accessToken', accessToken.split('Bearer ')[1]);
  ls.set('refreshToken', refreshToken);
};

const resetTokens = () => {
  deleteCookie('accessToken');
  ls.remove('refreshToken');
};

const api = (url, options = {}) => fetch(url, { headers, ...options }).then(checkResponse);

const apiWithAuth = (url, options = {}) => api(url, genAuthOptions(options));

const apiPost = (url, payload = {}, options = {}) => api(url, genPostOptions(payload, options));

const apiPostWithAuth = (url, payload = {}, options = {}) => apiWithAuth(url, genPostOptions(payload, options));

export const refreshTokenRequest = () => apiPost(AUTH_TOKEN_URL, {
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

export const getIngredientsRequest = () => api(API_INGREDIENTS_URL);

export const orderRequest = (ingredients) => apiPostWithAuth(API_ORDERS_URL, { ingredients });

export const forgotPasswordRequest = (email) => apiPost(PASSWORD_FORGOT_URL, { email });

export const resetPasswordRequest = (payload) => apiPost(PASSWORD_RESET_URL, payload);

export const loginRequest = async (payload) => {
  const response = await apiPost(AUTH_LOGIN_URL, payload);
  const { accessToken, refreshToken } = response;
  saveTokens(accessToken, refreshToken);

  return response;
};

export const registerRequest = async (payload) => {
  const response = await apiPost(AUTH_REGISTER_URL, payload);
  const { accessToken, refreshToken } = response;
  saveTokens(accessToken, refreshToken);

  return response;
};

export const logoutRequest = () => apiWithRefreshToken(
  () => apiPostWithAuth(AUTH_LOGOUT_URL, {
    token: ls.get('refreshToken')
  })
    .then((response) => {
      resetTokens();
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    }));

export const fetchUserRequest = () => apiWithRefreshToken(() => apiWithAuth(AUTH_USER_URL));

export const updateUserRequest = (payload) => apiWithRefreshToken(() => apiWithAuth(AUTH_USER_URL, {
  method: 'PATCH',
  body: JSON.stringify(payload)
}));
