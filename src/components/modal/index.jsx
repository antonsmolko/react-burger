import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import useMount from './hooks/useMount';
import ModalLayout from './modal-layout';
import { modalPropTypes } from '../../prop-types';

const modalRootElement = document.getElementById('modal-root');

const Modal = ({ children, isOpen, onClose, unMount, title = null }) => {
  const { mounted } = useMount({ isOpen });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    if (!mounted) {
      unMount();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mounted]);

  return (
    mounted && createPortal(
      <ModalLayout isOpen={isOpen} onClose={onClose} title={title}>
        {children}
      </ModalLayout>,
      modalRootElement
    )
  );
};

Modal.propTypes = modalPropTypes;

export default Modal;
