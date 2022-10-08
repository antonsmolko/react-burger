import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import TypeSection from './type-section';
import styles from './styles.module.scss';
import { constructorItemsPropTypes } from '../../prop-types';
import IngredientsProvider from '../../providers/IngredientsProvider';

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

const renderTypeSections = (items) => Object.entries(typesMap).map(([key, title]) => (
  <TypeSection type={key} title={title} items={items[key]} key={key} />
));

const BurgerIngredients = ({ items }) => {
  const [current, setCurrent] = useState('bun');

  const itemsMap = genItemsMap(items);

  return (
    <IngredientsProvider>
      <section className="pt-10">
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <div className="d-flex">
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
            <a href="#bun">Булки</a>
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            <a href="#sauce">Соусы</a>
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            <a href="#main">Начинки</a>
          </Tab>
        </div>

        <div className={styles.items}>
          <div className="custom-scroll">
            {renderTypeSections(itemsMap)}
          </div>
        </div>
      </section>
    </IngredientsProvider>
  );
};

BurgerIngredients.propTypes = {
  items: constructorItemsPropTypes
};

export default BurgerIngredients;
