import { useState } from 'react';
import { TUseForm, TUseFormHandleChange } from '../services/types';

export const useForm: TUseForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  const handleChange: TUseFormHandleChange = (event) => {
    const { value, name } = event.target as HTMLInputElement;
    setForm({ ...form, [name]: value });
  };

  return { form, handleChange, setForm };
};
