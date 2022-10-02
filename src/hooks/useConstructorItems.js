import { useState } from 'react';

export const useConstructorItems = (items) => {
  const [first] = useState(items[0]);
  const [last] = useState(items[items.length - 1]);
  const [rest] = useState(items.slice(1, -1));

  return {
    first,
    rest,
    last
  };
};
