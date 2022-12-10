import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../hooks';
import { AuthContext } from '../contexts';
import { fetchUser } from '../actions';
import AppLoader from '../../components/app-loader';
import { IAuthProvider } from '../types';

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const { ready, user, loggedIn } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ user, loggedIn }}>
      {ready ? children : <AppLoader />}
    </AuthContext.Provider>
  );
};
