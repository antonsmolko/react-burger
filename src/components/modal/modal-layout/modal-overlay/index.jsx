import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { ANIMATION_TIME } from '../../config';

import styles from './styles.module.scss';
import animationStyles from './animation.module.scss';

const ModalOverlay = ({ onClose, animationIn = false }) => {
  const backDropRef = useRef();

  return (
    <CSSTransition
      in={animationIn}
      nodeRef={backDropRef}
      timeout={ANIMATION_TIME}
      mountOnEnter
      unmountOnExit
      classNames={animationStyles}
    >
      <div ref={backDropRef} className={styles.overlay} onClick={onClose}/>
    </CSSTransition>
  );
};

ModalOverlay.propTypes = {
  animationIn: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default ModalOverlay;
