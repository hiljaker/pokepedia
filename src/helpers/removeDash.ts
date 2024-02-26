export const unslugString = (string: string) => {
  const withoutSlug = string.split("-").join(" ");
  const capitalized = withoutSlug.replace(/\b\w/g, (char) =>
    char.toUpperCase()
  );

  return capitalized;
};
