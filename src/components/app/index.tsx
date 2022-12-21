import React, { useEffect } from 'react';
import { useDispatch } from '../../services/hooks';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../services/providers';
import AppHeader from '../app-header';
import Main from '../main';
import ProtectedRoute from '../protected-route';
import GuestRoute from '../guest-route';
import {
  HomePage,
  FeedPage,
  FeedItemPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  ProfileOrdersPage,
  ProfileOrderPage,
  IngredientPage
} from '../../pages';
import { getIngredients } from '../../services/actions';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';
import OrderInfo from '../order-info';

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
            <Route path={'/feed'} element={<FeedPage />} />
            <Route path={'/feed/:orderNumber'} element={<FeedItemPage />} />
            <Route path={'/login'} element={<GuestRoute><LoginPage /></GuestRoute>} />
            <Route path={'/register'} element={<GuestRoute><RegisterPage /></GuestRoute>} />
            <Route path={'/forgot-password'} element={<GuestRoute><ForgotPasswordPage /></GuestRoute>} />
            <Route path={'/reset-password'} element={<GuestRoute><ResetPasswordPage /></GuestRoute>} />

            <Route path="/profile">
              <Route index element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path={'orders'} element={<ProtectedRoute><ProfileOrdersPage /></ProtectedRoute>} />
              <Route
                path={'orders/:orderNumber'}
                element={<ProtectedRoute><ProfileOrderPage /></ProtectedRoute>}
              />
            </Route>
            <Route path={'/ingredients/:ingredientId'} element={<IngredientPage />} />
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
              <Route
                path={'/feed/:orderNumber'}
                element={
                  <Modal onClose={handleModalClose}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path={'/profile/orders/:orderNumber'}
                element={
                  <Modal onClose={handleModalClose}>
                    <OrderInfo isOwn={true} />
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
    <Router basename={process.env.PUBLIC_URL}>
      <ModalSwitch />
    </Router>
  );
}

export default App;
