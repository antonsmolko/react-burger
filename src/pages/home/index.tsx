import React, { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor';
import styles from './home.module.scss';


export const HomePage: FC = () => {
  return (
    <div className={styles.content}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
};
