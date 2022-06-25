import type { Analytics } from '@segment/analytics-next';
import TEST_ANALYTICS from './test-analytics';
import TestAnalyticsBrowser from './test-analytics-browser';

describe('TestAnalyticsBrowser', (): void => {
  describe('standalone', (): void => {
    it('should return test analytics', async (): Promise<void> => {
      const analytics: Analytics = await TestAnalyticsBrowser.standalone();
      expect(analytics).toBe(TEST_ANALYTICS);
    });
  });
});
