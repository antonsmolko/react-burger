import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import TypeSection from './type-section';
import burgerIngredientsStyles from './burger-ingredients.module.scss';
import { constructorItemsPropTypes } from '../../prop-types';

const genItemsMap = (items) => items.reduce((acc, item) => ({ ...acc, [item.type]: [...acc[item.type], item] }), {
  bun: [],
  sauce: [],
  main: []
});

const typesMap = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки'
};

const renderItems = (items) => Object.entries(typesMap).map(([key, title]) => (
  <TypeSection title={title} items={items[key]} key={key} />
));

const BurgerIngredients = ({ items }) => {
  const [current, setCurrent] = useState('bun');

  const itemsMap = genItemsMap(items);

  return (
    <section className="pt-10">
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className="d-flex">
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={burgerIngredientsStyles.items}>
        <div className="custom-scroll">
          {renderItems(itemsMap)}
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  items: constructorItemsPropTypes
};

export default BurgerIngredients;
