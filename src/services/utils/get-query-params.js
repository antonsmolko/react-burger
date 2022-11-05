export const getQueryParams = (search) => {
  const pairs = search.substring(1).split('&');
  const array = pairs.map(elem => elem.split('='));
  return Object.fromEntries(array);
};
