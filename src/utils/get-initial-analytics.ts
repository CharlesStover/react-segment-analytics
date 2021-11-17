import type { SegmentAnalytics } from '@segment/analytics.js-core';
import type AnalyticsWindow from '../types/analytics-window';
import type InitialAnalytics from '../types/initial-analytics';
import getAnalyticsWindow from '../utils/get-analytics-window';

// Segment's AnalyticsJS definition is incompatible with their boilerplate. This
// fo;e should be the only location where we have to force accuracy with `as`.

export default function getInitialAnalytics(): InitialAnalytics {
  const ANALYTICS_WINDOW: AnalyticsWindow = getAnalyticsWindow();

  if (typeof ANALYTICS_WINDOW.analytics === 'undefined') {
    const newInitialAnalytics: InitialAnalytics = [];
    ANALYTICS_WINDOW.analytics =
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      newInitialAnalytics as unknown as SegmentAnalytics.AnalyticsJS;
    return newInitialAnalytics;
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return ANALYTICS_WINDOW.analytics as unknown as InitialAnalytics;
}
