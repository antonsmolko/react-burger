import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { childrenPropTypes } from '../../prop-types';

const GuestRoute = ({ children }) => {
  const location = useLocation();
  const { loggedIn } = useAuth();

  return (
    loggedIn ? <Navigate to={ location.state?.from || '/' }/> : children
  );
};

GuestRoute.propType = {
  children: childrenPropTypes
};

export default GuestRoute;
