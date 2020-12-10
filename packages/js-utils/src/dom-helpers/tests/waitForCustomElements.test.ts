import { waitForCustomElements } from '..';

// successful test cases cant be tested due to lack of support of :defined pseudo selector in JSDom/nwsapi lib

describe('waitForCustomElements helper tests:', () => {
  test('should reject if called with undefined container element', async () => {
    const element = document.createElement('undefined') as HTMLElement;
    await waitForCustomElements(element).catch((e: Error) => {
      expect(e).toBeTruthy();
    });
  });
});
