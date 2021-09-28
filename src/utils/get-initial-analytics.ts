import type { SegmentAnalytics } from '@segment/analytics.js-core';
import ANALYTICS_WINDOW from '../constants/analytics-window';
import type InitialAnalytics from '../types/initial-analytics';

// Segment's AnalyticsJS definition is incompatible with their boilerplate. This
// fo;e should be the only location where we have to force accuracy with `as`.

export default function getInitialAnalytics(): InitialAnalytics {
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
