import React, {
  useEffect,
  FC,
  ReactNode
} from 'react';
import { createPortal } from 'react-dom';

import ModalLayout from './modal-layout';

const modalRootElement = document.getElementById('modal-root') as HTMLElement;

interface IModal {
  onClose: () => void;
  title?: string;
  children: ReactNode
}

type THandleKeyDown = (event: KeyboardEvent) => void

const Modal: FC<IModal> = ({ onClose, title, children }) => {
  const handleKeyDown: THandleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    createPortal(
      <ModalLayout onClose={onClose} title={title}>
        {children}
      </ModalLayout>,
      modalRootElement
    )
  );
};

export default Modal;
