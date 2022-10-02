import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.scss';
import NavItem from './nav-item';

const AppHeader = () => {

  return (
    <header className={appHeaderStyles.header}>
      <div className="container">
        <nav className={appHeaderStyles.nav}>
          <div className={appHeaderStyles.navLeft}>
            <NavItem icon="burger" label="Конструктор" isActive={true} />
            <NavItem icon="list" label="Лента заказов" />
          </div>
          <Logo />
          <div className={appHeaderStyles.navRight}>
            <NavItem icon="profile" label="Личный кабинет" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
