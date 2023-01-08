import React, { useEffect, useState, FC, FormEventHandler } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.scss';
import { updateUser } from '../../services/actions';
import { useForm } from '../../hooks';
import { TUseFormInitialState } from '../../services/types';
import { ProfileLayout } from './layout';

export const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const { name, email } = useSelector((store) => store.auth.user);

  const initialState: TUseFormInitialState = {
    name,
    email,
    password: ''
  };

  const { form, setForm, handleChange } = useForm(initialState);

  const [stateChanged, setStateChanged] = useState(false);

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const changedState = pickBy(form, (value, key) => value !== initialState[key]);

    dispatch(updateUser(changedState));
  };

  const cancel = () => {
    setForm(initialState);
  };

  useEffect(() => {
    setForm(initialState);
  }, [name, email]);

  useEffect(() => {
    setStateChanged(!isEqual(initialState, form));
  }, [form]);

  return (
    <ProfileLayout>
      <section className={'pt-30'}>
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
      </section>
    </ProfileLayout>
  );
};
