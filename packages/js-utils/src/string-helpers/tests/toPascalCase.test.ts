import { toPascalCase } from '../lib/toPascalCase';

test('(toPascalCase) should convert text to PascalCase', () => {
  expect(() => {
    //@ts-ignore
    toPascalCase(null);
  }).toThrow(TypeError);
  expect(toPascalCase('')).toBe('');
  expect(toPascalCase('U')).toBe('U');
  expect(toPascalCase('U')).toBe('U');
  expect(toPascalCase('some-kebab-string')).toBe('SomeKebabString');
  expect(toPascalCase('someCamelString')).toBe('SomeCamelString');
  expect(toPascalCase('some text with spaces')).toBe('SomeTextWithSpaces');
  expect(toPascalCase('some - some_Some - thingThing')).toBe('SomeSomeSomeThingThing');
  expect(toPascalCase('1 two 3fourFive 6-seven')).toBe('1Two3FourFive6Seven');
});
