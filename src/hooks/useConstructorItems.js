export const useConstructorItems = (items) => {
  const first = items[0];
  const last = items[items.length - 1];
  const rest = items.slice(1, -1);

  return {
    first,
    rest,
    last
  };
};
