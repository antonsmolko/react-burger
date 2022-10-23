import ModalBackDrop from './modal-overlay';
import ModalContent from './modal-content';

import styles from './styles.module.scss';
import { modalLayoutPropTypes } from '../../../prop-types';

const ModalLayout = ({ children, onClose, title = null }) => {
  return (
    <div className={styles.container}>
      <ModalBackDrop animationIn={true} onClose={onClose} />
      <ModalContent animationIn={true} title={title} onClose={onClose}>
        {children}
      </ModalContent>
    </div>
  );
};

ModalLayout.propTypes = modalLayoutPropTypes;

export default ModalLayout;
