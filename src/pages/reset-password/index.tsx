import React, { FC } from 'react';
import { useDispatch } from '../../services/hooks';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/auth/form';
import { resetPassword } from '../../services/actions';
import { getQueryParams } from '../../services/utils';
import { useForm } from '../../hooks';
import { TApiResetPasswordRequestPayload } from '../../services/types';

export const ResetPasswordPage: FC = () => {
  const { search } = useLocation();
  const { token } = getQueryParams(search);

  if (!token) {
    return <Navigate to={'/'} />;
  }

  const dispatch = useDispatch();

  const { form, handleChange } = useForm<TApiResetPasswordRequestPayload>({
    password: '',
    token: ''
  });

  const submit = () => {
    dispatch(resetPassword(form));
  };

  return (
    <div className="d-flex flex-column align-center">
      <Form title={'Восстановление пароля'} buttonText={'Сохранить'} onSubmit={submit}>
        <PasswordInput
          name={'password'}
          placeholder={'Пароль'}
          value={form.password}
          onChange={handleChange}
        />
        <Input
          name={'token'}
          placeholder={'Введите код из письма'}
          value={form.token}
          type={'text'}
          onChange={handleChange}
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
