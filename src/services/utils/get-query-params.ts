import { TGetQueryParams } from '../types';

export const getQueryParams: TGetQueryParams = (search) => {
  const pairs = search.substring(1).split('&');
  const array = pairs.map(elem => elem.split('='));
  return Object.fromEntries(array);
};
