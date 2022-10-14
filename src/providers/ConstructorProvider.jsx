import React, { useReducer, useEffect, useState, useMemo } from 'react';
import { ConstructorContext } from '../services';
import { normalizeItems } from '../utils';

const ingredientsInitialState = { bun: null, rest: [] };

const addIngredient = (state, item) => {
  switch (item.type) {
  case 'bun':
    return { ...state, bun: item._id };
  case 'sauce':
  case 'main':
    return { ...state, rest: [...state.rest, item._id] };
  default:
    throw new Error('Невалидный тип ингридиента!');
  }
};

const ingredientsReducer = (state, { item, type, removeIndex = null }) => {
  switch (type) {
  case 'add':
    return addIngredient(state, item);
  case 'remove':
    return { ...state, rest: state.rest.filter((itemId, index) => index !== removeIndex) };
  case 'reset':
    return ingredientsInitialState;
  default:
    throw new Error('Невалидный тип!');
  }
};

const ConstructorProvider = ({ items, children }) => {
  const [normalizedItems, setNormalizedItems] = useState({});
 	const [ingredients, dispatchIngredients] = useReducer(ingredientsReducer, ingredientsInitialState);

  const { bun, rest } = ingredients;

  const bunIngredient = normalizedItems[bun];
  const restIngredients = rest.map((id) => normalizedItems[id]);
  const ingredientIds = [bun, bun, ...rest].filter(Boolean);

  const countMap = useMemo(() => (
    ingredientIds.reduce((acc, id) => ({ ...acc, [id]: acc[id] ? acc[id] + 1 : 1 }), {})
  ), [ingredientIds]);

  const price = useMemo(() => (
    ingredientIds.reduce((acc, id) => acc + normalizedItems[id].price, 0)
  ), [ingredientIds]);

  useEffect(() => {
    setNormalizedItems(normalizeItems(items));
  }, [items]);

  return (
    <ConstructorContext.Provider value={{
      dispatchIngredients,
      bunIngredient,
      restIngredients,
      ingredientIds,
      countMap,
      price,
    }}>
      {children}
    </ConstructorContext.Provider>
  );
};

export default ConstructorProvider;
