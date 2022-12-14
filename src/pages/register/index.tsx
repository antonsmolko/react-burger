import React, { FC }  from 'react';
import { useDispatch } from '../../services/hooks';
import { Link } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/auth/form';
import { register } from '../../services/actions';
import { useForm } from '../../hooks';
import { TUserRegisterRequest } from '../../services/types';

export const RegisterPage: FC = () => {
  const dispatch = useDispatch();
  const { form, handleChange } = useForm<TUserRegisterRequest>({
    name: '',
    email: '',
    password: ''
  });

  const submit = () => {
    dispatch(register(form));
  };

  return (
    <div className="d-flex flex-column align-center">
      <Form title={'Регистрация'} buttonText={'Зарегистрироваться'} onSubmit={submit}>
        <Input
          name={'name'}
          placeholder={'Имя'}
          value={form.name}
          type={'text'}
          onChange={handleChange}
        />
        <Input
          name={'email'}
          placeholder={'E-mail'}
          value={form.email}
          type={'email'}
          onChange={handleChange}
        />
        <PasswordInput
          name={'password'}
          placeholder={'Пароль'}
          value={form.password}
          onChange={handleChange}
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
