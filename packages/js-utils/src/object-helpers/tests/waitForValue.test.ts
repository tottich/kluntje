import { waitForValue } from '..';

const createObject = (): { [key: string]: any } => {
  return {};
};

describe('waitForValue helper tests:', () => {
  test('should reject if max time-out is reached', async () => {
    const obj = createObject();
    const promise = waitForValue(obj, 'someProp', 50);
    setTimeout(() => {
      obj.someProp = true;
    }, 100);
    await expect(promise).rejects.toThrowError();
  });

  test('should resolve with value for an already existing value in object', async () => {
    const obj = createObject();
    obj.someProp = true;
    //@ts-ignore
    window.somenamespace = {};
    //@ts-ignore
    window.somenamespace.config = obj;
    await expect(waitForValue(obj, 'someProp', 1000)).resolves.toBe(true);
    await expect(waitForValue(window, 'somenamespace.config', 1000)).resolves.toBe(obj);
    //@ts-ignore
    delete window.somenamespace;
  });

  test('should resolve with value for an inserted value after be queried', async () => {
    const obj = createObject();
    const promise = waitForValue(obj, 'someProp', 1000);
    await setTimeout(() => {
      obj.someProp = 'some-value';
    }, 50);
    await expect(promise).resolves.toBe('some-value');
  });
});
