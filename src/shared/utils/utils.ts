export function pickDefined<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  ) as Partial<T>;
}

export const toSentenceCase = (str: string) => {
  // replace all _ with spaces
  str = str.replace(/_/g, " ");
  // capitalize the first letter
  str = str.charAt(0).toUpperCase() + str.slice(1);
  // return the string
  return str;
};
