export const normalizeItems = (items) => items.reduce((acc, item) => ({ ...acc, [item._id]: item }), {});
