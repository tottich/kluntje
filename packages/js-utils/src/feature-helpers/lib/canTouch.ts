/**
 * checks whether device has touch events
 * @returns {boolean}
 *
 * @example
 * // test for touch capabilities
 * if (canTouch()) {
 *  addTouchListeners();
 * }
 */
export const canTouch = (): boolean => {
  return Boolean('ontouchstart' in window || navigator.msMaxTouchPoints);
};
