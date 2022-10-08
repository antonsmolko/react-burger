import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import ModalHeader from './modal-header';

import { ANIMATION_TIME } from '../../config';

import contentStyles from './styles.module.scss';
import animationStyles from './animation.module.scss';
import { modalContentPropTypes } from '../../../../prop-types';

const ModalContent = ({ animationIn, title, onClose, children }) => {
  const contentRef = useRef();

  return (
    <CSSTransition
      in={animationIn}
      nodeRef={contentRef}
      timeout={ANIMATION_TIME}
      mountOnEnter
      unmountOnExit
      classNames={animationStyles}
    >
      <div ref={contentRef} className={`${contentStyles.content} pl-10 pr-10 pt-10 pb-15`}>
        <ModalHeader onClose={onClose}>{title}</ModalHeader>
        <div className={contentStyles.container}>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

ModalContent.propTypes = modalContentPropTypes;

export default ModalContent;
