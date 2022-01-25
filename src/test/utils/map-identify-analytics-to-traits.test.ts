import mapIdentifyAnalyticsToTraits from './map-identify-analytics-to-traits';

const TEST_TRAITS: Record<string, unknown> = {
  a: true,
  b: 1,
  c: 'str',
};

describe('mapIdentifyAnalyticsToTraits', (): void => {
  it('should support identities with IDs', (): void => {
    expect(
      mapIdentifyAnalyticsToTraits(['identify', 'test-id', TEST_TRAITS]),
    ).toEqual(TEST_TRAITS);
  });

  it('should support identities without IDs', (): void => {
    expect(mapIdentifyAnalyticsToTraits(['identify', TEST_TRAITS])).toEqual(
      TEST_TRAITS,
    );
  });
});
