import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './profile-nav-link.module.scss';
import { childrenPropTypes } from '../../../prop-types';

const ProfileNavLink = ({ children, to, onClick }) => {
  const genClassName = ({ isActive } = {}) => cn([
    styles.profileNavLink,
    'text text_type_main-medium',
    {
      text_color_inactive: !isActive,
    }
  ]);

  return to
    ? <NavLink to={to} className={genClassName}>{children}</NavLink>
    : <div className={genClassName()} onClick={onClick}>{children}</div>;
};

ProfileNavLink.propType = {
  children: childrenPropTypes,
  to: PropTypes.string,
  onClick: PropTypes.func
};

export default ProfileNavLink;
