import React from 'react';
import mainStyles from './main.module.scss';

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

export default Main;
