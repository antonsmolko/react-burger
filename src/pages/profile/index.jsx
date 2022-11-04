import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileNavLink from '../../components/profile/profile-nav-link';
import styles from './profile.module.scss';
import { updateUser, logout as logoutUser } from '../../services/actions/auth';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { name, email } = useSelector((store) => store.auth.user);

  const initialState = {
    name,
    email,
    password: ''
  };

  const [state, setState] = useState(initialState);
  const [stateChanged, setStateChanged] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const changedState = pickBy(state, (value, key) => value !== initialState[key]);
    dispatch(updateUser(changedState));
  };

  const cancel = () => {
    setState(initialState);
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    setState(initialState);
  }, [name, email]);

  useEffect(() => {
    setStateChanged(!isEqual(initialState, state));
  }, [state]);

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
          onChange={handleInputChange}
          icon={'EditIcon'}
          value={state.name}
          name={'name'}
        />
        <Input
          type={'email'}
          placeholder={'Логин'}
          onChange={handleInputChange}
          icon={'EditIcon'}
          value={state.email}
          name={'email'}
        />
        <PasswordInput
          placeholder={'Пароль'}
          onChange={handleInputChange}
          icon={'EditIcon'}
          value={state.password}
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
