export const generateSecureRandomId = (min = 0, max = 99999) => {
  const range = max - min + 1;
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return min + (array[0] % range);
};
