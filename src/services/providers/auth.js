import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../contexts';
import { fetchUser } from '../actions/auth';
import AppLoader from '../../components/app-loader';

export const AuthProvider = ({ children }) => {
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
