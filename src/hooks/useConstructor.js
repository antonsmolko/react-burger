import { useContext } from 'react';
import { ConstructorContext } from '../contexts';

export const useConstructor = () => useContext(ConstructorContext);
