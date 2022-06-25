import type { Analytics, AnalyticsBrowser } from '@segment/analytics-next';
import { AnalyticsBuffered } from '@segment/analytics-next/dist/pkg/core/buffer';
import testAnalyticsLoader from '../utils/test-analytics-loader';
import TEST_ANALYTICS from './test-analytics';
import TEST_IDENTIFY from './test-identify';

export default class TestAnalyticsBrowser
  extends AnalyticsBuffered
  implements AnalyticsBrowser
{
  public identify = TEST_IDENTIFY;

  private constructor() {
    super(testAnalyticsLoader);
  }

  public static load(): AnalyticsBrowser {
    return new this();
  }

  public static async standalone(): Promise<Analytics> {
    return Promise.resolve(TEST_ANALYTICS);
  }
}
