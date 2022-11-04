import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/auth/form';
import { resetPassword } from '../../services/actions/auth';
import { getQueryParams } from '../../services/utils';

export const ResetPasswordPage = () => {
  const { search } = useLocation();
  const { token } = getQueryParams(search);

  if (!token) {
    return <Navigate to={'/'} />;
  }

  const dispatch = useDispatch();

  const [state, setState] = useState({
    password: '',
    token: '',
  });

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  const submit = async () => {
    dispatch(resetPassword(state));
  };

  return (
    <div className="d-flex flex-column align-center">
      <Form title={'Восстановление пароля'} buttonText={'Сохранить'} onSubmit={submit}>
        <PasswordInput
          name={'password'}
          placeholder={'Пароль'}
          value={state.password}
          onChange={handleInputChange}
        />
        <Input
          name={'token'}
          placeholder={'Введите код из письма'}
          value={state.token}
          type={'text'}
          onChange={handleInputChange}
        />
      </Form>

      <div className={'text-center mt-10'}>
        <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль? <Link to={'/login'} className={'text_color_accent'}>Войти</Link>
        </p>
      </div>
    </div>
  );
};
