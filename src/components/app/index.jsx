import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../services/providers';
import AppHeader from '../app-header';
import Main from '../main';
import ProtectedRoute from '../protected-route';
import GuestRoute from '../guest-route';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage
} from '../../pages';
import { getIngredients } from '../../services/actions/ingredients';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
      navigate(-1);
    };

    return (
      <AuthProvider>
        <AppHeader />
        <Main>
          <Routes location={background || location}>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/login'} element={<GuestRoute><LoginPage /></GuestRoute>} />
            <Route path={'/register'} element={<GuestRoute><RegisterPage /></GuestRoute>} />
            <Route path={'/forgot-password'} element={<GuestRoute><ForgotPasswordPage /></GuestRoute>} />
            <Route path={'/reset-password'} element={<GuestRoute><ResetPasswordPage /></GuestRoute>} />
            <Route path={'/profile'} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path={'/ingredients/:ingredientId'} exact={true} element={<IngredientPage />} />
          </Routes>
          {background &&
            <Routes>
              <Route
                path={'/ingredients/:ingredientId'}
                element={
                  <Modal title="Детали ингредиента" onClose={handleModalClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          }
        </Main>
      </AuthProvider>
    );
  };

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

export default App;
