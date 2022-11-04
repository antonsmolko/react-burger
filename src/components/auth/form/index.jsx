import React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './form.module.scss';
import { childrenPropTypes } from '../../../prop-types';

const Form = ({ children, onSubmit, disabled = false, title = null, buttonText = null }) => {
  const submit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
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
    </>
  );
};

Form.prototype = {
  children: childrenPropTypes,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])
};

export default Form;
