export const addIfTrue = (object) => {
  const allKeys = Object.keys(object);
  const result = {};
  allKeys.forEach((key) => {
    if (object[key]) result[key] = object[key];
  });
  return result;
};
