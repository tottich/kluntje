import { hasEqualElements } from '../lib/hasEqualElements';

const testObj1 = {
  equal: {
    prop: true,
  },
  unequal: {
    prop: true,
  },
};

const testObj2 = {
  equal: {
    prop: true,
  },
  unequal: {
    prop: false,
  },
};

test('should succeed if all array elements are equal', () => {
  expect(hasEqualElements([null, null, null])).toBeTruthy();
  expect(hasEqualElements([false, false, false])).toBeTruthy();
  expect(hasEqualElements(['a', 'a', 'a'])).toBeTruthy();
  expect(hasEqualElements([1, 1, 1])).toBeTruthy();
  expect(hasEqualElements([testObj1, testObj1, testObj1])).toBeTruthy();
  expect(hasEqualElements([testObj1, testObj2], 'equal.prop')).toBeTruthy();
});

test('should fail if any array element is unequal', () => {
  expect(hasEqualElements([null, null, undefined])).toBeFalsy();
  expect(hasEqualElements([false, false, true])).toBeFalsy();
  expect(hasEqualElements(['a', 'a', 'b'])).toBeFalsy();
  expect(hasEqualElements([1, 1, 2])).toBeFalsy();
  expect(hasEqualElements([testObj1, testObj1, {}])).toBeFalsy();
  expect(hasEqualElements([testObj1, testObj2], 'unequal.prop')).toBeFalsy();
});
