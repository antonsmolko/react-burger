import React, {FC, FormEventHandler, ReactNode} from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form.module.scss';

interface IForm {
  onSubmit: () => void,
  disabled?: boolean,
  title?: string,
  buttonText?: string,
  children?: ReactNode
}

const Form: FC<IForm> = ({ children, onSubmit, disabled, title, buttonText }) => {
  const submit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      {title && <p className="text text_type_main-medium">{title}</p>}
      {children}
      {buttonText && <Button
        htmlType="submit"
        type="primary"
        size="large"
        disabled={disabled}
      >
        {buttonText}
      </Button>}
    </form>
  );
};

export default Form;
