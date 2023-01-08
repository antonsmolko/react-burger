import { ReactNode } from 'react';

export interface IProfile {
  children?: ReactNode;
  to?: string;
  onClick?: () => void;
}
