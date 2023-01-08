import { getCookie } from '../services/utils';
import {
  TApi,
  TApiCheckResponse,
  TApiGenOptions,
  TApiGenPostOptions,
  TApiGetPostOptions,
  TApiRequestApi
} from '../services/types';

const headers = {
  'Content-Type': 'application/json'
};

const checkResponse: TApiCheckResponse = (res) => res.ok
  ? res.json()
  : res.json().then((err) => Promise.reject(err));

const genOptions: TApiGenOptions = (options) => ({ headers, ...options });

const genAuthOptions: TApiGenOptions = (options) => {
  const accessToken = getCookie('accessToken');
  return accessToken
    ? {
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
        ...options.headers
      }
    }
    : options;
};

const getPostOptions: TApiGetPostOptions = (payload) => (
  {
    method: 'POST',
    body: JSON.stringify(payload)
  }
);

const genPostOptions: TApiGenPostOptions = (payload, options) => (
  {
    ...genOptions(options),
    ...getPostOptions(payload)
  }
);

const genAuthPostOptions: TApiGenPostOptions = (payload, options) => (
  {
    ...genAuthOptions(options),
    ...getPostOptions(payload)
  }
);

const requestApi: TApiRequestApi = (url, options = {}) => fetch(url, options).then(checkResponse);

const api: TApi = {
  get: (url, options = {}) => requestApi(url, genOptions(options)),
  getWithAuth: (url, options = {}) => requestApi(url, genAuthOptions(options)),
  post: (url, payload = {}, options = {}) => requestApi(url, genPostOptions(payload, options)),
  postWithAuth: (url, payload = {}, options = {}) => requestApi(url, genAuthPostOptions(payload, options))
};

export default api;
