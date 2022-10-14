import { useState } from 'react';
import { useModal } from './useModal';

export const useContentModal = (initialValue = {}) => {
  const { isOpen, open, close } = useModal();
  const [payload, setPayload] = useState(initialValue);

  const modalOpen = (data) => {
    setPayload(data);
    open();
  };

  const unMount = () => {
    setPayload({});
  };

  return {
    isOpen,
    open: modalOpen,
    close,
    payload,
    unMount
  };
};
