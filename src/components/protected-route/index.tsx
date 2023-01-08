import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { IProtectedRoute } from '../../services/types';

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const location = useLocation();
  const { loggedIn } = useAuth();

  return (
    <>
      {loggedIn ? children : <Navigate to={'/login'} state={{ from: location }} />}
    </>
  );
};

export default ProtectedRoute;
