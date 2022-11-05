import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/auth/form';
import { forgotPassword } from '../../services/actions/auth';
import { useForm } from '../../hooks';

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { form, handleChange } = useForm({ email: '' });

  const submit = async () => {
    dispatch(forgotPassword(form));
  };

  return (
    <div className="d-flex flex-column align-center">
      <Form title={'Восстановление пароля'} buttonText={'Восстановить'} onSubmit={submit}>
        <Input
          name={'email'}
          placeholder={'E-mail'}
          value={form.email}
          type={'email'}
          onChange={handleChange}
        />
      </Form>

      <div className={'mt-10'}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? <Link to={'/login'} className={'text_color_accent'}>Войти</Link>
        </p>
      </div>
    </div>
  );
};
