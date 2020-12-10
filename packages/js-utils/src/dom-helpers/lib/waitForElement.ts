import { find } from './find';

/**
 * waits until a given element selector matches within parent container for a (optional) max-timeout
 * @param {HTMLElement} target
 * @param {string} selector
 * @param {number} timeout - timeout in milliseconds
 * @returns {Promise<void>}
 * @example
 * waitForElement(container, '.i-was-added-to-container-somewhen', 500).then(() => doSomething());
 */
export const waitForElement = (target: HTMLElement, selector: string, timeout?: number): Promise<HTMLElement> => {
  return new Promise((resolve, reject) => {
    let timeoutId: null | ReturnType<typeof setTimeout> = null;
    let mo: null | MutationObserver = null;
    let element = null;
    if (target === null) reject(new TypeError(`waitForElement: target is null`));
    if (timeout !== undefined) {
      timeoutId = setTimeout(() => reject(new Error(`waitForElement: max timeout reached`)), timeout);
    }

    const checkElement = (): boolean => {
      element = find(target, selector);
      if (element !== null) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        resolve(element);
      }
      return element !== null;
    };

    if (!checkElement()) {
      mo = new MutationObserver(() => {
        if (checkElement()) {
          mo?.disconnect();
          mo = null;
        }
      });
      mo.observe(target, { childList: true, subtree: true } as MutationObserverInit);
    }
  });
};
