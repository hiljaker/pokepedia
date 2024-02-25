export const capitalizeEveryWord = (string: string): string => {
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
};
