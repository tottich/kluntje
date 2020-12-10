/**
 * helper to check if either local or session storage is available and writeable
 * @param {'localStorage' | 'sessionStorage'} type
 * @returns {boolean}
 *
 * @example
 * // test for localStorage
 * if (isStorageAvailable("localStorage")) {
 *  window.localStorage.setItem("foo", "bar");
 * }
 *
 *  * // test for sessionStorage
 * if (isStorageAvailable("sessionStorage")) {
 *  window.sessionStorage.setItem("foo", "bar");
 * }
 */
export const isStorageAvailable = (type: 'localStorage' | 'sessionStorage'): boolean => {
  const storage = window[type] as Storage;
  try {
    const value: string = 'kl-is-storage-available-check';
    storage.setItem(value, value);
    storage.removeItem(value);
    return true;
  } catch (e) {
    return false;
  }
};
