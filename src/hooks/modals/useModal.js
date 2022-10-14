import { useState } from 'react';

export const useModal = (initialValue = false) => {
  const [isOpen, setOpen] = useState(initialValue);

  const open = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  return {
    isOpen,
    open,
    close
  };
};
