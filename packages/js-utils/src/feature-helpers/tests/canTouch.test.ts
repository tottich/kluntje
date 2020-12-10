import { canTouch } from '..';

describe('canTouch helper tests:', () => {
  let originalTouchStart: any;
  let originalNavigator: any;

  beforeEach(() => {
    originalTouchStart = window.ontouchstart;
    originalNavigator = window.navigator;
    // @ts-ignore: read-only property
    delete window.ontouchstart;
    // @ts-ignore: read-only property
    delete window.navigator;
  });

  afterEach(() => {
    window.ontouchstart = originalTouchStart;
    // @ts-ignore: read-only property
    window.navigator = originalNavigator;
  });

  test('should return true if onTouchstart is available', () => {
    delete window.ontouchstart;
    window.ontouchstart = (e: TouchEvent) => e.type;
    expect(canTouch()).toBeTruthy();
  });

  test('should return true if navigator.msMaxTouchPoints is available', () => {
    Object.defineProperty(window, 'navigator', {
      configurable: true,
      writable: true,
      value: { msMaxTouchPoints: [1] },
    });
    expect(canTouch()).toBeTruthy();
  });

  test('should return false if neither onTouchstart nor navigator.msMaxTouchPoints is available', () => {
    Object.defineProperty(window, 'navigator', {
      configurable: true,
      writable: true,
      value: {},
    });
    expect(canTouch()).toBeFalsy();
  });
});
