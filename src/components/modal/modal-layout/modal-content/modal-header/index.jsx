import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { childrenPropTypes } from '../../../../../prop-types';

import styles from './styles.module.scss';

const ModalHeader = ({ children, onClose }) => (
  <div className={styles.header}>
    {children && <span className="text text_type_main-large">{children}</span>}
    <div className={styles.close}>
      <CloseIcon type="primary" onClick={onClose} />
    </div>
  </div>
);

ModalHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: childrenPropTypes
};

export default ModalHeader;
