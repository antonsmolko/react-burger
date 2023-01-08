import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSelector } from '../../services/hooks';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import throttle from 'lodash/throttle';
import TypeSection from './type-section';
import styles from './styles.module.scss';
import {
  TIngredientsItemsMap,
  TIngredientsOffsetMap,
  TIngredientType,
  TIngredientsRefsMap,
  TIngredientsIngredient
} from '../../services/types';

const genItemsMap = <T extends TIngredientsIngredient>(items: Array<T>) => items
  .reduce((acc, item) => ({ ...acc, [item.type]: [...acc[item.type], item] }), {
    bun: [],
    sauce: [],
    main: []
  });

const BurgerIngredients = () => {
  const ingredients = useSelector((store) => store.ingredients.items);
  const initialCurrentState: TIngredientType = 'bun';
  const [current, setCurrent] = useState<TIngredientType>(initialCurrentState);
  const [navTop, setNavTop] = useState<number>(0);

  const itemsMap = useMemo<TIngredientsItemsMap>(() => genItemsMap(ingredients), [ingredients]);

  const navRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const setCurrentNav = throttle(() => {
    const { top: bunTop } = bunRef.current?.getBoundingClientRect() ?? {};
    const { top: sauceTop } = sauceRef.current?.getBoundingClientRect() ?? {};
    const { top: mainTop } = mainRef.current?.getBoundingClientRect() ?? {};

    const getOffsetDiff = (offset: number): number => Math.abs(navTop - offset);

    const offsetMap: TIngredientsOffsetMap = {
      bun: getOffsetDiff(bunTop ?? 0),
      sauce: getOffsetDiff(sauceTop ?? 0),
      main: getOffsetDiff(mainTop ?? 0)
    };

    const currentActive = (Object.entries(offsetMap) as Array<[TIngredientType, number]>)
      .reduce((acc: TIngredientType, [key, value]) => {
        if (acc == null) { return key; }
        return value < offsetMap[acc] ? key : acc;
      }, initialCurrentState);

    setCurrent(currentActive);
  }, 200);

  const handleTabClick = (tab: TIngredientType) => {
    setCurrent(tab);

    const refsMap: TIngredientsRefsMap = {
      bun: bunRef,
      sauce: sauceRef,
      main: mainRef
    };

    refsMap[tab]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    const navTop = navRef.current?.getBoundingClientRect().top ?? 0;
    setNavTop(navTop);
    scrollRef.current && scrollRef.current.addEventListener('scroll', setCurrentNav);

    return () => {
      scrollRef.current && scrollRef.current.removeEventListener('scroll', setCurrentNav);
    };
  }, [bunRef, sauceRef, mainRef, scrollRef, navRef, navTop]);

  return (
    <section className="pt-10">
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div ref={navRef} className="d-flex">
        <Tab value="bun" active={current === 'bun'} onClick={() => handleTabClick('bun')}>
          <a>Булки</a>
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={() => handleTabClick('sauce')}>
          <a>Соусы</a>
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={() => handleTabClick('main')}>
          <a>Начинки</a>
        </Tab>
      </div>

      <div className={styles.items}>
        <div ref={scrollRef} className="custom-scroll">
          <TypeSection ref={bunRef} title="Булки" items={itemsMap.bun} />
          <TypeSection ref={sauceRef} title="Соусы" items={itemsMap.sauce} />
          <TypeSection ref={mainRef} title="Начинки" items={itemsMap.main} />
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
