import { FC } from 'react';
import styles from './app-loader.module.scss';

const AppLoader: FC = () => {
  return (
    <div className={styles.loader}>
      <p className="text text_type_main-default text_color_inactive">
				Загрузка...
      </p>
    </div>
  );
};

export default AppLoader;
