export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function toSpaceCase(text: string, delimiter: RegExp = /(_)/gi) {
  return text.replace(delimiter, " ");
}

export function ccc(...arr) {
  // 1. Base case:
  if (!arr.length) return ""; // {1}

  // 2. Recursive case:
  return arr
    .reduce((acc, item) => {
      if (item && isStringOrNumber(item)) {
        return acc.concat(item);
      } else if (isArray(item)) {
        // {2}
        return acc.concat(ccc(...item));
      } else if (isObject(item)) {
        return acc.concat(extractTruthyObjectPropertyNames(item));
      }
      return acc;
    }, [])
    .join(" ");
}

export const extractTruthyObjectPropertyNames = (obj) => {
  // 1. remove any properties with falsy values
  // 2. concatenate the keys of the remaining properties
  // 3. join the keys as a space case string
  return Object.entries(obj)
    .filter(([, val]) => !!val) // {1}
    .reduce(
      (
        acc,
        [key, val] // {2}
      ) => (!!val ? acc.concat([key]) : acc),
      []
    )
    .join(" "); // {3}
};

export const isString = (item) => typeof item === "string";
export const isNumber = (item) => typeof item === "number";
export const isStringOrNumber = (item) => isString(item) || isNumber(item);
export const isObject = (item) =>
  typeof item === "object" && item?.constructor === Object;
export const isArray = (item) => Array.isArray(item);
