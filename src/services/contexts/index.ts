import { createContext } from 'react';
import { IAuthContext } from '../types';

const initialState = {
  user: {
    name: '',
    email: ''
  },
  loggedIn: false
};

export const AuthContext = createContext<IAuthContext>(initialState);
