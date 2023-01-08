import React, { FC } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IModalHeader } from '../../../../../services/types';

import styles from './styles.module.scss';

const ModalHeader: FC<IModalHeader> = ({ children, onClose }) => (
  <div className={styles.header}>
    {children && <span className="text text_type_main-large">{children}</span>}
    <div className={styles.close} data-testid="modal-close">
      <CloseIcon type="primary" onClick={onClose} />
    </div>
  </div>
);

export default ModalHeader;
