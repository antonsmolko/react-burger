import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import navItemStyles from './nav-item.module.scss';

interface INavItem {
  icon: string,
  to: string,
  label: string
}

type TIconMap = {
  [name: string]: FC<TIconProps>
}

const iconMap: TIconMap = {
  burger: BurgerIcon,
  list: ListIcon,
  profile: ProfileIcon
};

type TStyles = (props: { isActive: boolean }) => string

const NavItem: FC<INavItem> = ({ icon, to, label }) => {
  const styles: TStyles = ({ isActive }) => cn([
    navItemStyles.navItem,
    'pl-5 pt-4 pb-4 pr-5',
    {
      text_color_inactive: !isActive
    }
  ]);

  const Icon = iconMap[icon];
  const getIconType = (isActive: boolean) => (isActive  ? 'primary' : 'secondary');

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

export default NavItem;
