import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import navItemStyles from './nav-item.module.scss';

const iconMap = {
  burger: BurgerIcon,
  list: ListIcon,
  profile: ProfileIcon
};

const NavItem = ({ icon, label, isActive = false }) => {
  const styles = cn([
    navItemStyles.navItem,
    'pl-5 pt-4 pb-4 pr-5',
    {
      text_color_inactive: !isActive
    }
  ]);

  const Icon = iconMap[icon];
  const iconType = isActive ? 'primary' : 'secondary';

  return (
    <a href="#" className={styles}>
      <Icon type={iconType} />
      <span className="text text_type_main-default ml-2">{label}</span>
    </a>
  );
};

NavItem.propTypes = {
  icon: PropTypes.oneOf(['burger', 'list', 'profile']).isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool
};

export default NavItem;
