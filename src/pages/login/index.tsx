import React, { FC } from 'react';
import { useDispatch } from '../../services/hooks';
import { Link } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/auth/form';
import { login } from '../../services/actions';
import { useForm } from '../../hooks';
import { TUserRegisterRequest } from '../../services/types';

export const LoginPage: FC = () => {
  const dispatch = useDispatch();

  const { form, handleChange } = useForm<TUserRegisterRequest>({
    email: '',
    password: ''
  });

  const submit = () => dispatch(login(form));

  return (
    <div className="d-flex flex-column align-center">
      <Form title={'Вход'} buttonText={'Войти'} onSubmit={submit}>
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
