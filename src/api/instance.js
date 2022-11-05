import { getCookie } from '../services/utils';

const headers = {
  'Content-Type': 'application/json'
};

const checkResponse = (res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

const genOptions = (options) => ({ headers, ...options });

const genAuthOptions = (options) => {
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

const getPostOptions = (payload) => (
  {
    method: 'POST',
    body: JSON.stringify(payload)
  }
);

const genPostOptions = (payload, options) => (
  {
    ...genOptions(options),
    ...getPostOptions(payload)
  }
);

const genAuthPostOptions = (payload, options) => (
  {
    ...genAuthOptions(options),
    ...getPostOptions(payload)
  }
);

const requestApi = (url, options = {}) => fetch(url, options).then(checkResponse);

const api = {
  get: (url, options = {}) => requestApi(url, genOptions(options)),
  getWithAuth: (url, options = {}) => requestApi(url, genAuthOptions(options)),
  post: (url, payload = {}, options = {}) => requestApi(url, genPostOptions(payload, options)),
  postWithAuth: (url, payload = {}, options = {}) => requestApi(url, genAuthPostOptions(payload, options))
};

export default api;
