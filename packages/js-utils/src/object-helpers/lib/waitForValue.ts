import { getValue } from '..';

/**
 * waits until a property exists in given object
 * @param {HTMLElement} target
 * @param {string} selector
 * @param {number} timeout - timeout in milliseconds
 * @param {number} inv - poll interval
 * @returns {Promise<void>}
 * @example
 * waitForValue(window, 'some.api.config', 500).then(() => doSomethingWithAPI());
 */
export const waitForValue = <T = any>(
  target: Object = {},
  path: string,
  timeout?: number,
  inv: number = 10,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const invCheck = setInterval(() => {
      const value = getValue(target, path);
      if (value !== undefined) {
        clearInterval(invCheck);
        resolve(value);
      }
    }, inv);
    if (timeout !== undefined) {
      setTimeout(() => {
        clearInterval(invCheck);
        reject(new Error(`waitForValue: max timeout reached`));
      }, timeout);
    }
  });
};
