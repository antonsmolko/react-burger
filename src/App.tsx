import React from 'react';
import './app.scss';
import AppHeader from "./components/app-header";
import BurgerIngredients from "./components/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor";
import Main from "./components/main";

import itemsData from "./utils/data.json"

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
