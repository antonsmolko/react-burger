import { useContext } from 'react';
import { IngredientsContext } from '../contexts';

export const useIngredients = () => useContext(IngredientsContext);
