import { useContentModal } from './modals/useContentModal';
// import { API_CHECKOUT_URL } from '../components/config';

export const useCheckout = ({ details }) => {
  const { isOpen, open, close, payload, unMount } = useContentModal({});

  const submit = async () => {
    // @TODO: отправляем детали заказа на сервер, получаем ответ, открываем модальное окно
    // const response = await fetch(API_CHECKOUT_URL, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(details)
    // });
    //
    // const payload = response.json();

    // @TODO: временно хардкодим
    open({ orderNumber: '034536' });
  };



  return {
    submit,
    isOpen,
    close,
    payload,
    unMount
  };
};
