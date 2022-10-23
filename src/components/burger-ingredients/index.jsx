import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import throttle from 'lodash/throttle';
import TypeSection from './type-section';
import styles from './styles.module.scss';
import { getIngredients } from '../../services/actions/ingredients';
import { removeCurrentIngredient, closeModal } from '../../services/actions/ingredient-details';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';

const genItemsMap = (items) => items.reduce((acc, item) => ({ ...acc, [item.type]: [...acc[item.type], item] }), {
  bun: [],
  sauce: [],
  main: []
});

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((store) => store.ingredientDetails.modal);
  const ingredients = useSelector((store) => store.ingredients.items);
  const currentIngredient = useSelector((store) => store.ingredientDetails.current);
  const initialCurrentState = 'bun';
  const [current, setCurrent] = useState(initialCurrentState);
  const [navTop, setNavTop] = useState(0);

  const itemsMap = useMemo(() => genItemsMap(ingredients), [ingredients]);

  const navRef = useRef(null);
  const scrollRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const handleClose = () => {
    dispatch(closeModal());
    dispatch(removeCurrentIngredient());
  };

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

  const handleTabClick = (tab) => {
    setCurrent(tab);

    const refsMap = {
      bun: bunRef,
      sauce: sauceRef,
      main: mainRef
    };

    refsMap[tab].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    setNavTop(navRef.current?.getBoundingClientRect().top);
    scrollRef.current.addEventListener('scroll', setCurrentNav);

    return () => (
      scrollRef.current.removeEventListener('scroll', setCurrentNav)
    );
  }, [bunRef, sauceRef, mainRef, scrollRef, navRef, navTop]);

  return (
    <>
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
            <TypeSection ref={bunRef} type="bun" title="Булки" items={itemsMap.bun} />
            <TypeSection ref={sauceRef} type="sauce" title="Соусы" items={itemsMap.sauce} />
            <TypeSection ref={mainRef} type="main" title="Начинки" items={itemsMap.main} />
          </div>
        </div>
      </section>
      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={handleClose}>
          <IngredientDetails item={currentIngredient} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredients;
