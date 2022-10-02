import React from 'react';
import AppHeader from '../app-header';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';
import Main from '../main';

import itemsData from '../../utils/data.json';

function App() {
  return (
    <>
      <AppHeader />
      <Main>
        <BurgerIngredients items={itemsData} />
        <BurgerConstructor items={itemsData} price={610} />
      </Main>
    </>
  );
}

export default App;
