import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import ModalLayout from './modal-layout';
import { modalPropTypes } from '../../prop-types';

const modalRootElement = document.getElementById('modal-root');

const Modal = ({ children, onClose, title = null }) => {
  const handleKeyDown = (event) => {
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

Modal.propTypes = modalPropTypes;

export default Modal;
