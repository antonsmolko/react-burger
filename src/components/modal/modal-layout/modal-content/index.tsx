import { useRef, FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { IModalContent } from '../../../../services/types';
import ModalHeader from './modal-header';
import { MODAL_ANIMATION_TIME } from '../../../../config';
import contentStyles from './styles.module.scss';
import animationStyles from './animation.module.scss';

const ModalContent: FC<IModalContent> = ({ animationIn, title, onClose, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={animationIn}
      nodeRef={contentRef}
      timeout={MODAL_ANIMATION_TIME}
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

export default ModalContent;
