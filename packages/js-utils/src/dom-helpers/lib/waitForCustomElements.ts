/**
 * waits for custom elements to be upgraded within given ´ element
 * note that :defined pseudo selector is unsupported in IE11
 * @param {HTMLElement} element
 * @returns {Promise<void>}
 * @example
 * await waitForCustomElements(container);
 * doSomething();
 */

export const waitForCustomElements = (target: Element): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (target === null || target === undefined) reject(new TypeError(`waitForCustomElements: target is null`));
    const undefinedCustomElements = target.querySelectorAll(':not(:defined)');
    Promise.all(Array.from(undefinedCustomElements).map(el => customElements.whenDefined(el.localName))).then(() => {
      resolve();
    });
  });
};
