import mapValueToIsoDate from './map-value-to-iso-date';

const EPOCH = 0;

describe('mapValueToIsoDate', (): void => {
  it('should support Unix timestamps', (): void => {
    expect(mapValueToIsoDate(EPOCH)).toBe('1970-01-01T00:00:00.000Z');
  });

  it('should ignore strings (assume already ISO)', (): void => {
    expect(mapValueToIsoDate('test')).toBe('test');
  });
});
