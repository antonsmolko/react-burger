import { useEffect, useState } from 'react';

import ModalBackDrop from './modal-overlay';
import ModalContent from './modal-content';

import styles from './styles.module.scss';
import { modalLayoutPropTypes } from '../../../prop-types';

const ModalLayout = ({ children, onClose, isOpen = false, title = null }) => {
  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(isOpen);
  }, [isOpen]);

  return (
    <div className={styles.container}>
      <ModalBackDrop animationIn={animationIn} onClose={onClose} />
      <ModalContent animationIn={animationIn} title={title} onClose={onClose}>
        {children}
      </ModalContent>
    </div>
  );
};

ModalLayout.propTypes = modalLayoutPropTypes;

export default ModalLayout;
