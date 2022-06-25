import type { Analytics, Context } from '@segment/analytics-next';
import TEST_ANALYTICS from '../constants/test-analytics';
import TEST_CONTEXT from '../constants/test-context';

export default async function testAnalyticsLoader(): Promise<
  [Analytics, Context]
> {
  return Promise.resolve([TEST_ANALYTICS, TEST_CONTEXT]);
}
