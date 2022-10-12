import { useContentModal } from './modals/useContentModal';
import { API_ORDERS_URL } from '../config';
import { useConstructor } from './useConstructor';

export const useCheckout = () => {
  const { isOpen, open, close, payload, unMount } = useContentModal({});
  const { ingredientIds, dispatchIngredients } = useConstructor();

  const submit = () => {
    fetch(API_ORDERS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: ingredientIds })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка запроса!');
        }

        return response.json();
      })
      .then(({ order }) => {
        open({ orderNumber: order.number });
        dispatchIngredients({ type: 'reset' });
      })
      .catch(console.log);
  };

  return {
    submit,
    modalIsOpen: isOpen,
    modalClose: close,
    modalPayload: payload,
    modalUnMount: unMount
  };
};
