import { useContext } from 'react';
import { AuthContext } from '../services/contexts';

export const useAuth = () => useContext(AuthContext);
