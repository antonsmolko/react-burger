import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { IGuestRoute } from '../../services/types';

const GuestRoute: FC<IGuestRoute> = ({ children }) => {
  const location = useLocation();
  const { loggedIn } = useAuth();

  return (
    <>
      {loggedIn ? <Navigate to={ location.state?.from || '/' }/> : children}
    </>
  );
};

export default GuestRoute;
