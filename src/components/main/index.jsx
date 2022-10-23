import React from 'react';
import mainStyles from './main.module.scss';
import { childrenPropTypes } from '../../prop-types';

const Main = ({ children }) => {
  return (
    <main className={mainStyles.main}>
      <div className="container h-inherit">
        <div className={mainStyles.content}>
          {children}
        </div>
      </div>
    </main>
  );
};

Main.propTypes = {
  children: childrenPropTypes
};

export default Main;
