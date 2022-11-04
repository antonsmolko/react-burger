import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import navItemStyles from './nav-item.module.scss';

const iconMap = {
  burger: BurgerIcon,
  list: ListIcon,
  profile: ProfileIcon
};

const NavItem = ({ icon, to, label }) => {
  const styles = ({ isActive }) => cn([
    navItemStyles.navItem,
    'pl-5 pt-4 pb-4 pr-5',
    {
      text_color_inactive: !isActive
    }
  ]);

  const Icon = iconMap[icon];
  const getIconType = (isActive) => (isActive  ? 'primary' : 'secondary');

  return (
    <NavLink to={to} className={styles} end>
      {({ isActive }) => (
        <>
          <Icon type={getIconType(isActive)} />
          <span className="text text_type_main-default ml-2">{label}</span>
        </>
      )}
    </NavLink>
  );
};

NavItem.propTypes = {
  icon: PropTypes.oneOf(['burger', 'list', 'profile']).isRequired,
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default NavItem;
