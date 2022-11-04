import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/auth/form';
import { login } from '../../services/actions/auth';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  const submit = () => {
    dispatch(login(state));
  };

  return (
    <div className="d-flex flex-column align-center">
      <Form title={'Вход'} buttonText={'Войти'} onSubmit={submit}>
        <Input
          name={'email'}
          placeholder={'E-mail'}
          value={state.email}
          type={'email'}
          onChange={handleInputChange}
        />
        <PasswordInput
          name={'password'}
          placeholder={'Пароль'}
          value={state.password}
          onChange={handleInputChange}
        />
      </Form>

      <div className={'text-center mt-10'}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь? <Link to={'/register'} className={'text_color_accent'}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль? <Link to={'/forgot-password'} className={'text_color_accent'}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
};
