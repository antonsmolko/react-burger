import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';
import ConstructorProvider from '../../providers/ConstructorProvider';
import Main from '../main';

import { API_INGREDIENTS_URL } from '../../config';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(API_INGREDIENTS_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка запроса!');
        }

        return response.json();
      })
      .then(({ data }) => {
        setIngredients(data);
      })
      .catch(console.log);
  }, []);

  return (
    <>
      <AppHeader />
      <Main>
        <ConstructorProvider items={ingredients}>
          <BurgerIngredients items={ingredients} />
          <BurgerConstructor />
        </ConstructorProvider>
      </Main>
    </>
  );
}

export default App;
