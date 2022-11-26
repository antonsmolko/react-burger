import { ReactNode } from 'react';

export interface IGuestRoute {
  children?: ReactNode;
}

export type IProtectedRoute = IGuestRoute
