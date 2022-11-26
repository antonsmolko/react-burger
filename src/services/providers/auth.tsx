import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../contexts';
import { fetchUser } from '../actions/auth';
import AppLoader from '../../components/app-loader';
import { IAuthProvider } from '../types';

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  // @FIXME: next sprint
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { ready, user, loggedIn } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    // @FIXME: next sprint
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ user, loggedIn }}>
      {ready ? children : <AppLoader />}
    </AuthContext.Provider>
  );
};
