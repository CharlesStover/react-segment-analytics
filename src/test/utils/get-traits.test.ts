import MISSING_IDENTIFY_ANALYTICS_ERROR from '../constants/missing-identify-analytics-error';
import initSegmentAnalytics from '../utils/init-segment-analytics';
import removeSegmentAnalytics from '../utils/remove-segment-analytics';
import getTraits from './get-traits';

describe('getTraits', (): void => {
  beforeEach(initSegmentAnalytics);

  afterEach(removeSegmentAnalytics);

  it('should throw an error if there are no identify analytics', (): void => {
    expect((): void => {
      getTraits();
    }).toThrowError(MISSING_IDENTIFY_ANALYTICS_ERROR);
  });
});
