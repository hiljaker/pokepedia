import { capitalizeEveryWord } from "./capitalizeWord";

export const unslugString = (string: string) => {
  const withoutSlug = string.split("-").join(" ");
  return capitalizeEveryWord(withoutSlug);
};
