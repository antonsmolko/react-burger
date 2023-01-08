import React, { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor';

export const HomePage: FC = () => {
  return (
    <div className={'content'}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
};
