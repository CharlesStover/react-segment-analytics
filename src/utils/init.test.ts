import type { SegmentAnalytics } from '@segment/analytics.js-core';
import ANALYTICS_WINDOW from '../constants/analytics-window';
import init from './init';

const ONCE = 1;
const TEST_CONSOLE_ERROR = jest.fn();

describe('init', (): void => {
  beforeEach((): void => {
    delete ANALYTICS_WINDOW.analytics;
  });

  it('should not throw an error if `initialize` exists', (): void => {
    init('test-write-key');
    const analytics: SegmentAnalytics.AnalyticsJS | undefined =
      ANALYTICS_WINDOW.analytics;
    if (typeof analytics === 'undefined') {
      throw new Error('Expected Segment Analytics to be initialized.');
    }
    analytics.initialize = (): SegmentAnalytics.AnalyticsJS => analytics;
    init('test-write-key');
  });

  describe('invoked', (): void => {
    const consoleError = console.error;
    beforeEach((): void => {
      console.error = TEST_CONSOLE_ERROR;
    });

    afterEach((): void => {
      console.error = consoleError;
    });

    it('should console.error if invoked twice', (): void => {
      init('test-write-key');
      init('test-write-key');
      expect(TEST_CONSOLE_ERROR).toHaveBeenCalledTimes(ONCE);
      expect(TEST_CONSOLE_ERROR).toHaveBeenLastCalledWith(
        'Segment snippet included twice.',
      );
    });
  });
});
