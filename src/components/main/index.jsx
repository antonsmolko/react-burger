import React from 'react';
import styles from './main.module.scss';
import { childrenPropTypes } from '../../prop-types';

const Main = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className="container h-inherit">
        {children}
      </div>
    </main>
  );
};

Main.propTypes = {
  children: childrenPropTypes
};

export default Main;
