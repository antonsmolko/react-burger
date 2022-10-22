import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import throttle from 'lodash/throttle';
import TypeSection from './type-section';
import styles from './styles.module.scss';
import IngredientsProvider from '../../providers/IngredientsProvider';
import { getIngredients } from '../../services/reducers/rootReducer';

const genItemsMap = (items) => items.reduce((acc, item) => ({ ...acc, [item.type]: [...acc[item.type], item] }), {
  bun: [],
  sauce: [],
  main: []
});

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients);
  const initialCurrentState = 'bun';
  const [current, setCurrent] = useState(initialCurrentState);
  const [navTop, setNavTop] = useState(0);

  const itemsMap = useMemo(() => genItemsMap(ingredients), [ingredients]);

  const navRef = useRef(null);
  const scrollRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const setCurrentNav = throttle(() => {
    const { top: bunTop } = bunRef.current?.getBoundingClientRect();
    const { top: sauceTop } = sauceRef.current?.getBoundingClientRect();
    const { top: mainTop } = mainRef.current?.getBoundingClientRect();

    const getOffsetDiff = (offset) => Math.abs(navTop - offset);

    const offsetMap = {
      bun: getOffsetDiff(bunTop),
      sauce: getOffsetDiff(sauceTop),
      main: getOffsetDiff(mainTop)
    };

    const currentActive = Object.entries(offsetMap).reduce((acc, [key, value]) => {
      if (acc == null) { return key; }
      return value < offsetMap[acc] ? key : acc;
    }, initialCurrentState);

    setCurrent(currentActive);
  }, 200);

  useEffect(() => {
    setNavTop(navRef.current?.getBoundingClientRect().top);

    scrollRef.current.addEventListener('scroll', setCurrentNav);

    return () => (
      scrollRef.current.removeEventListener('scroll', setCurrentNav)
    );
  }, [bunRef, sauceRef, mainRef, scrollRef, navRef, navTop]);

  return (
    <IngredientsProvider>
      <section className="pt-10">
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <div ref={navRef} className="d-flex">
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
          <div ref={scrollRef} className="custom-scroll">
            <TypeSection ref={bunRef} type="bun" title="Булки" items={itemsMap.bun} />
            <TypeSection ref={sauceRef} type="sauce" title="Соусы" items={itemsMap.sauce} />
            <TypeSection ref={mainRef} type="main" title="Начинки" items={itemsMap.main} />
          </div>
        </div>
      </section>
    </IngredientsProvider>
  );
};

export default BurgerIngredients;
