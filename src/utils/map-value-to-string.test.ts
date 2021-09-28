import mapValueToString from './map-value-to-string';

describe('mapValueToString', (): void => {
  it('should support undefined', (): void => {
    expect(mapValueToString(undefined)).toBeUndefined();
  });

  it('should support numbers', (): void => {
    const TEST_NUMBER = 0;
    expect(mapValueToString(TEST_NUMBER)).toBe('0');
  });

  it('should support strings', (): void => {
    expect(mapValueToString('foo')).toBe('foo');
  });
});
