import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';
import Main from '../main';

import { API_INGREDIENTS_URL } from '../config';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(API_INGREDIENTS_URL)
      .then((response) => response.json())
      .then(({ data }) => {
        setIngredients(data);
      })
      .catch((error) => {
        // наверное здесь будет реализован вывод ошибки в snackbar
      });
  }, []);

  return (
    <>
      <AppHeader />
      <Main>
        <BurgerIngredients items={ingredients} />
        <BurgerConstructor items={ingredients} price={610} />
      </Main>
    </>
  );
}

export default App;
