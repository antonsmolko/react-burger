import { useContext } from 'react';
import { ConstructorContext } from '../services';

export const useConstructor = () => useContext(ConstructorContext);
