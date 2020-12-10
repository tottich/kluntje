import { getValue } from '../lib/getValue';

const obj = {
  a: {
    b: {
      c: 1,
    },
    d: true,
    e: [
      {
        f: 'lorem',
      },
    ],
  },
};

test('should get correct values from object', () => {
  expect(getValue(obj, 'a.b.c')).toBe(1);
  expect(JSON.stringify(getValue(obj, 'a.b'))).toBe(JSON.stringify({ c: 1 }));
  expect(getValue(obj, 'a.e.0.f')).toBe('lorem');
  expect(getValue(obj, 'a.f')).toBe(undefined);
  expect(getValue(obj, 'a.f')).toBe(undefined);
});
