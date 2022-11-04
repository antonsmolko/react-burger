import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/auth/form';
import { register } from '../../services/actions/auth';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  const submit = async () => {
    dispatch(register(state));
  };

  return (
    <div className="d-flex flex-column align-center">
      <Form title={'Регистрация'} buttonText={'Зарегистрироваться'} onSubmit={submit}>
        <Input
          name={'name'}
          placeholder={'Имя'}
          value={state.name}
          type={'text'}
          onChange={handleInputChange}
        />
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

      <div className={'mt-10'}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы? <Link to={'/login'} className={'text_color_accent'}>Войти</Link>
        </p>
      </div>
    </div>
  );
};
