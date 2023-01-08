import React, { FC, ReactNode } from 'react';
import { useDispatch } from '../../services/hooks';
import cn from 'classnames';
import ProfileNavLink from '../../components/profile/profile-nav-link';
import styles from './profile.module.scss';
import { logout as logoutUser } from '../../services/actions/auth';

type TProfileLayout = {
  children: ReactNode
}

const contentStyles = cn('content', styles.content);

export const ProfileLayout: FC<TProfileLayout> = ({ children }) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={contentStyles}>
      <section className={cn([styles.aside, 'mr-15 pt-30']) }>
        <ProfileNavLink to={'/profile'}>Профиль</ProfileNavLink>
        <ProfileNavLink to={'/profile/orders'}>История заказов</ProfileNavLink>
        <ProfileNavLink onClick={logout}>Выход</ProfileNavLink>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </section>
      { children }
    </div>
  );
};
