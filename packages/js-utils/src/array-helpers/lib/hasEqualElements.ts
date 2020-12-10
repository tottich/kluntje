import { getValue } from '../../object-helpers';

/**
 * checks, if all elements in array are equal with optionals testing for a deeply nested property
 * @param {Array<T>} array
 * @param {string} prop
 * @returns {boolean}
 * @example
 * const fruits = ["Banana", "Banana", "Banana"];
 *
 * if (hasEqualElements(fruits)) {
 *   console.log("Anywhere bananas");
 * }
 *
 * const salad = [{name: "Banana"}, {name: "Pineapple"}, {name: "Apple"}];
 *
 * if (hasEqualElements(salad, "name")) {
 *   console.log("We have a mixed salad");
 * }*
 */

export const hasEqualElements = <T>(array: Array<T>, prop: string | null = null): boolean =>
  array.every((v: any) => {
    return !prop ? v === array[0] : getValue(v, prop) === getValue(array[0], prop);
  });
