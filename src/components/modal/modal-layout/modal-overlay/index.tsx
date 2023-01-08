import React, { useRef, FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { IModalOverlay } from '../../../../services/types';
import { MODAL_ANIMATION_TIME } from '../../../../config';

import styles from './styles.module.scss';
import animationStyles from './animation.module.scss';

const ModalOverlay: FC<IModalOverlay> = ({ onClose, animationIn = false }) => {
  const backDropRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={animationIn}
      nodeRef={backDropRef}
      timeout={MODAL_ANIMATION_TIME}
      mountOnEnter
      unmountOnExit
      classNames={animationStyles}
    >
      <div
        ref={backDropRef}
        className={styles.overlay}
        onClick={onClose}
        data-testid="modal-overlay"
      />
    </CSSTransition>
  );
};

export default ModalOverlay;
