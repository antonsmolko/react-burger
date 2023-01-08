import { ReactNode } from 'react';

export interface IModalHeader {
  children?: ReactNode;
  onClose?: () => void;
}

export interface IModalOverlay {
  onClose?: () => void;
  animationIn: boolean;
}

export interface IModalContent extends IModalOverlay {
  children: ReactNode;
  title?: string;
}

export interface IModalLayout {
  children: ReactNode;
  onClose: () => void;
  title?: string;
}
