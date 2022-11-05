import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { childrenPropTypes } from '../../prop-types';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { loggedIn } = useAuth();

  return (
    loggedIn
      ? children
      : <Navigate to={'/login'} state={{ from: location }} />
  );
};

ProtectedRoute.propType = {
  children: childrenPropTypes
};

export default ProtectedRoute;
