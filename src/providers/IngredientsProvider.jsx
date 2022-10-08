import React from 'react';
import { IngredientsContext } from '../contexts';
import { useContentModal } from '../hooks';
import Modal from '../components/modal';
import IngredientDetails from '../components/ingredient-details';

const IngredientsProvider = ({ children }) => {
  const { isOpen, open, close, payload, unMount } = useContentModal();

  return (
    <IngredientsContext.Provider value={{ modalOpen: open }}>
      {children}
      <Modal title="Детали ингредиента" isOpen={isOpen} onClose={close} unMount={unMount}>
        <IngredientDetails item={payload} />
      </Modal>
    </IngredientsContext.Provider>
  );
};



export default IngredientsProvider;
