import type { SegmentAnalytics } from '@segment/analytics.js-core';

export default interface AnalyticsWindow extends Window {
  analytics?: SegmentAnalytics.AnalyticsJS;
}
