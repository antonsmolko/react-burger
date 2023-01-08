import { FC } from 'react';
import ModalBackDrop from './modal-overlay';
import ModalContent from './modal-content';
import { IModalLayout } from '../../../services/types';
import styles from './styles.module.scss';

const ModalLayout: FC<IModalLayout> = ({ onClose, title, children }) => {
  return (
    <div className={styles.container}>
      <ModalBackDrop animationIn={true} onClose={onClose} />
      <ModalContent animationIn={true} title={title} onClose={onClose}>
        {children}
      </ModalContent>
    </div>
  );
};

export default ModalLayout;
