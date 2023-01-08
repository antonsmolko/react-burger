import React, { FC } from 'react';
import styles from './main.module.scss';
import { IMain } from '../../services/types';

const Main: FC<IMain> = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className="container h-inherit">
        {children}
      </div>
    </main>
  );
};

export default Main;
