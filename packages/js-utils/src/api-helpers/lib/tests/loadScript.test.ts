import { loadScript } from '../loadScript';
import { isIterable } from '../../../dom-helpers/lib/iterable';

describe('loadScript helper tests:', () => {
  const mockScriptId = 'mock-script-id';
  const mockScriptSrc = 'http://someapi.url';

  const mockOptions = {
    async: true,
    noModule: true,
    type: 'text/javascript',
    text: 'Test',
  };

  afterEach(() => {
    jest.clearAllMocks();
    const scriptElements = document.getElementsByTagName('script') as HTMLCollection;
    if (isIterable<HTMLElement>(scriptElements)) {
      for (const element of scriptElements) {
        if (element.parentElement) {
          element.parentElement.removeChild(element);
        }
      }
      return;
    }
  });

  test('should append the script element to the document.body', () => {
    loadScript(mockScriptId, mockScriptSrc);
    const scriptElement = document.getElementById(mockScriptId) as HTMLScriptElement;
    expect(scriptElement instanceof HTMLScriptElement).toBeTruthy();
  });

  test('should append the script element to a custom target element', () => {
    const customTarget = document.createElement('div');
    document.body.append(customTarget);

    loadScript(mockScriptId, mockScriptSrc, { targetElement: customTarget });
    const scriptElement = document.getElementById(mockScriptId) as HTMLScriptElement;
    expect(scriptElement).toBeTruthy();
    expect(scriptElement.parentNode).toBe(customTarget);
    document.body.removeChild(customTarget);
  });

  test('should apply given options to the script element', () => {
    loadScript(mockScriptId, mockScriptSrc, mockOptions);
    const scriptElement = document.getElementById(mockScriptId) as HTMLScriptElement;

    expect(scriptElement.async).toBe(mockOptions.async);
    expect(scriptElement.noModule).toBe(mockOptions.noModule);
    expect(scriptElement.type).toBe(mockOptions.type);
    expect(scriptElement.text).toBe(mockOptions.text);
  });

  test('should not append script element with same id multiple times', () => {
    loadScript(mockScriptId, mockScriptSrc);
    loadScript(mockScriptId, mockScriptSrc);
    const scriptElements = document.getElementsByTagName('script') as HTMLCollection;
    expect(scriptElements.length).toBe(1);
  });

  test('should resolve when script has loaded and set loaded flag', () => {
    const promise = loadScript(mockScriptId, mockScriptSrc);
    const scriptElement = document.getElementById(mockScriptId) as HTMLScriptElement;
    scriptElement.dispatchEvent(new CustomEvent('load'));
    expect(scriptElement.dataset.loadedState).toBe('loaded');
    expect(promise).resolves.toEqual(undefined);
  });

  test('should resolve if script was already loaded and remove listeners', async () => {
    const scriptElement = document.createElement('script');
    scriptElement.id = mockScriptId;
    scriptElement.dataset.loadedState = String('loaded');
    document.body.appendChild(scriptElement);
    await expect(loadScript(mockScriptId, mockScriptSrc)).resolves.toEqual(undefined);
  });

  test('should resolve all when called multiple times but script was not yet loaded', async () => {
    const promiseA = loadScript(mockScriptId, mockScriptSrc);
    const promiseB = loadScript(mockScriptId, mockScriptSrc);
    const scriptElement = document.getElementById(mockScriptId) as HTMLScriptElement;
    scriptElement.dispatchEvent(new CustomEvent('load'));
    await expect(promiseA).resolves.toEqual(undefined);
    await expect(promiseB).resolves.toEqual(undefined);
  });

  test('should reject if script was not loaded', async () => {
    const promise = loadScript(mockScriptId, mockScriptSrc);
    const scriptElement = document.getElementById(mockScriptId) as HTMLScriptElement;
    scriptElement.dispatchEvent(new ErrorEvent('error'));
    await expect(promise).rejects.toThrowError();
  });

  test('should reject if script element already exists with error state', async () => {
    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('id', mockScriptId);
    scriptElement.dataset.loadedState = String('error');
    document.body.appendChild(scriptElement);
    await expect(loadScript(mockScriptId, mockScriptSrc)).rejects.toThrowError();
  });
});
