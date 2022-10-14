import { useContext } from 'react';
import { IngredientsContext } from '../services';

export const useIngredients = () => useContext(IngredientsContext);
