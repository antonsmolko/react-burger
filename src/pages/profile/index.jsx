import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileNavLink from '../../components/profile/profile-nav-link';
import styles from './profile.module.scss';
import { updateUser, logout as logoutUser } from '../../services/actions/auth';
import { useForm } from '../../hooks';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { name, email } = useSelector((store) => store.auth.user);

  const initialState = {
    name,
    email,
    password: ''
  };

  const { form, setForm, handleChange } = useForm(initialState);

  const [stateChanged, setStateChanged] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const changedState = pickBy(form, (value, key) => value !== initialState[key]);
    dispatch(updateUser(changedState));
  };

  const cancel = () => {
    setForm(initialState);
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    setForm(initialState);
  }, [name, email]);

  useEffect(() => {
    setStateChanged(!isEqual(initialState, form));
  }, [form]);

  return (
    <div className={'d-flex mt-30'}>
      <div className={cn([styles.aside, 'mr-15 mb-20']) }>
        <ProfileNavLink to={'/profile'}>Профиль</ProfileNavLink>
        <ProfileNavLink to={'/profile/orders'}>История заказов</ProfileNavLink>
        <ProfileNavLink onClick={logout}>Выход</ProfileNavLink>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form onSubmit={submit} className={styles.form}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          icon={'EditIcon'}
          value={form.name}
          name={'name'}
        />
        <Input
          type={'email'}
          placeholder={'Логин'}
          onChange={handleChange}
          icon={'EditIcon'}
          value={form.email}
          name={'email'}
        />
        <PasswordInput
          placeholder={'Пароль'}
          onChange={handleChange}
          icon={'EditIcon'}
          value={form.password}
          name={'password'}
        />
        {stateChanged &&
          <div className={'d-flex justify-end mt-6'}>
            <Button
              htmlType={'button'}
              type={'secondary'}
              size={'large'}
              onClick={cancel}
            >
              Отменить
            </Button>
            <Button
              htmlType={'submit'}
              type={'primary'}
              size={'large'}
            >
              Сохранить
            </Button>
          </div>
        }
      </form>
    </div>
  );
};
