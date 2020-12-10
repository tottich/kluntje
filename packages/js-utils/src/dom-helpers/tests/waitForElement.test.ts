import { waitForElement } from '../lib/waitForElement';

let container: HTMLElement;

const appendChild = (): HTMLElement => {
  const child = document.createElement('div');
  child.classList.add('existing-child');
  container.appendChild(child);
  return child;
};

beforeEach(() => {
  container = document.createElement('div');
});

afterEach(() => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
});

describe('waitForElement helper tests:', () => {
  test('should reject if container is null', async () => {
    await expect(
      waitForElement(document.createElement('undefined'), '.non-existing-child', 1000),
    ).rejects.toThrowError();
  });

  test('should reject if child selector does not match', async () => {
    await expect(waitForElement(container, '.non-existing-child', 1000)).rejects.toThrowError();
  });

  test('should reject if max time-out is reached', async () => {
    const promise = waitForElement(container, '.existing-child', 50);
    setTimeout(() => appendChild, 100);
    await expect(promise).rejects.toThrowError();
  });

  test('should resolve for an already existing child in container', async () => {
    const child = appendChild();
    await expect(waitForElement(container, '.existing-child', 1000)).resolves.toBe(child);
  });

  test('should resolve for an appended child after be queried', async () => {
    const promise = waitForElement(container, '.existing-child', 1000);
    const child = appendChild();
    await expect(promise).resolves.toBe(child);
  });
});
