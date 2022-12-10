import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './profile-nav-link.module.scss';
import { IProfile, TStyles } from '../../../services/types';

const ProfileNavLink: FC<IProfile> = ({ children, to, onClick }) => {
  const genClassName: TStyles = (props) => cn([
    styles.profileNavLink,
    'text text_type_main-medium',
    {
      text_color_inactive: !props?.isActive,
    }
  ]);

  return to
    ? <NavLink end to={to} className={genClassName}>{children}</NavLink>
    : <div className={genClassName()} onClick={onClick}>{children}</div>;
};

export default ProfileNavLink;
