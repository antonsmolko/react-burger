import {
  API_INGREDIENTS_URL,
  API_ORDERS_URL
} from '../config';

const api = (url, options = {}) => fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка запроса!');
    }

    return response.json();
  })
  .then((response) => response)
  .catch((error) => {
    console.log(error);
    throw Error(error);
  });

export const getIngredientsRequest = () => api(API_INGREDIENTS_URL);
export const orderRequest = (payload) => api(API_ORDERS_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ingredients: payload })
});
