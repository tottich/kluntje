/**
 * Returns a list of strings with localized month names in given format
 * @param {string} locale
 * @param {'long' | 'short' | 'narrow' | '2-digit' | 'numeric'} format
 * @returns {Array<String>}
 * @example
 * console.log(getLocaleMonths("en-US", "short")); //output: [Jan, Feb, Mar, ...]
 */

export const getLocaleMonths = (
  locale: string | undefined = undefined,
  format: 'long' | 'short' | 'narrow' | '2-digit' | 'numeric' = 'long',
): Array<String> => {
  return Array.from(Array(12).keys(), (i: number) => new Date(0, i).toLocaleString(locale, { month: format }));
};
