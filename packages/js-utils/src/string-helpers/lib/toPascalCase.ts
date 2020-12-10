/**
 * function to convert texts to toPascalCase
 *
 * @param {string} str - sequence of letters, dashes and spaces to be converted to toPascalCase
 *
 * @returns {string}
 * @example
 * toPascalCase("some-text") === "SomeText";
 * toPascalCase("some other text") === "SomeOtherText";
 */
export function toPascalCase(str: string) {
  if (typeof str !== 'string') throw new TypeError('toPascalCase: input is not a string');
  else if (str.length === 1) return str.toUpperCase();
  return str
    .replace(/(^[^a-zA-Z0-9])+/g, '')
    .replace(/(^|[^a-zA-Z]+)[a-z]/g, txt => txt.toUpperCase())
    .replace(/([^a-zA-Z0-9]|\s)+/g, '');
}
