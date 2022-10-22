import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IngredientsContext } from '../services';
import { useModal } from '../hooks';
import Modal from '../components/modal';
import IngredientDetails from '../components/ingredient-details';
import { SET_CURRENT_INGREDIENT } from '../services/actions';

const IngredientsProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { isOpen, open, close } = useModal();
  const currentIngredient = useSelector((store) => store.currentIngredient);

  const handleUnMount = () => {
    dispatch({ type: SET_CURRENT_INGREDIENT, payload: {} });
  };

  return (
    <IngredientsContext.Provider value={{ modalOpen: open }}>
      {children}
      <Modal title="Детали ингредиента" isOpen={isOpen} onClose={close} unMount={handleUnMount}>
        <IngredientDetails item={currentIngredient} />
      </Modal>
    </IngredientsContext.Provider>
  );
};



export default IngredientsProvider;
