import { isStorageAvailable } from '..';

describe('isStorageAvailable helper tests:', () => {
  let originalLocalStorage: Storage;
  let originalSessionStorage: Storage;
  const CHECK_VALUE = 'kl-is-storage-available-check';

  const storageMock = (() => {
    let store = {} as { [key: string]: string };
    return {
      getItem: (key: string): string | null => store[key] || null,
      setItem: (key: string, value: string): void => {
        store[key] = value;
      },
      clear: () => {
        store = {};
      },
      removeItem: (key: string) => {
        delete store[key];
      },
    };
  })() as Storage;

  const disabledStorageMock = (() => {
    return {
      setItem: (): void => {
        throw new Error('cant write to storage');
      },
    };
  })();

  beforeEach(() => {
    originalLocalStorage = window.localStorage;
    originalSessionStorage = window.sessionStorage;
    // @ts-ignore
    delete window.localStorage;
    // @ts-ignore
    delete window.sessionStorage;

    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      writable: true,
      value: storageMock,
    });
    Object.defineProperty(window, 'sessionStorage', {
      configurable: true,
      writable: true,
      value: storageMock,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      configurable: true,
      enumerable: true,
      value: originalLocalStorage,
    });
    Object.defineProperty(window, 'sessionStorage', {
      writable: true,
      configurable: true,
      enumerable: true,
      value: originalSessionStorage,
    });
  });

  test('should return true if localStorage is available and clear storage from test value', () => {
    expect(isStorageAvailable('localStorage')).toBeTruthy();
    expect(window.localStorage.getItem(CHECK_VALUE)).toBeNull();
  });

  test('should return true if sessionStorage is available and clear storage from test value', () => {
    expect(isStorageAvailable('sessionStorage')).toBeTruthy();
    expect(window.sessionStorage.getItem(CHECK_VALUE)).toBeNull();
  });

  test('should return false if localStorage is not available or write operation failed', () => {
    // @ts-ignore
    delete window.localStorage;
    expect(isStorageAvailable('localStorage')).toBeFalsy();

    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      writable: true,
      value: disabledStorageMock,
    });
    expect(isStorageAvailable('localStorage')).toBeFalsy();
  });

  test('should return false if sessionStorage is not available or write operation failed', () => {
    // @ts-ignore
    delete window.sessionStorage;
    expect(isStorageAvailable('sessionStorage')).toBeFalsy();

    Object.defineProperty(window, 'sessionStorage', {
      configurable: true,
      writable: true,
      value: disabledStorageMock,
    });
    expect(isStorageAvailable('sessionStorage')).toBeFalsy();
  });
});
