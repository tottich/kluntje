/**
 * Returns a list of strings with localized names of weekdays in given format
 * @param {string | undefined} locale
 * @param {'long' | 'short' | 'narrow'} format
 * @returns {Array<String>}
 * @example
 * console.log(getLocaleMonths("en-US", "short")); //output: [Jan, Feb, Mar, ...]
 */

export const getLocaleWeekdays = (
  locale: string | undefined = undefined,
  format: 'long' | 'short' | 'narrow' = 'long',
): Array<String> => {
  return Array.from(Array(7).keys(), (i: number) => new Date(0, 0, i + 1).toLocaleString(locale, { weekday: format }));
};
