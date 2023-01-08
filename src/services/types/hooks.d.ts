import { TIngredient } from './common';

export type TUseConstructorIngredientsQtyMap = () => {
  [id: string | number]: number;
}

type TUseFormInitialState = {
  [name: string]: string;
}

type TUseFormHandleChange = (event: ChangeEvent<HTMLInputElement>) => void

export type TUseForm = <T extends TUseFormInitialState>(T) => {
  form: T;
  handleChange: TUseFormHandleChange;
  setForm: (TUseFormHandleChange) => void;
}

export type TUsePreview = () => ({
  [name: string]: TIngredient
})

export type TUseIngredients = () => ({
  [id: string]: TIngredient
})

export type TUseLocalStorageSetValue = (unknown) => void

export type TUseLocalStorage = (key: string, initialValue: unknown) => [unknown, TUseLocalStorageSetValue]
