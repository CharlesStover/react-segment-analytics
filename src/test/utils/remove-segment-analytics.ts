import ANALYTICS_WINDOW from '../constants/analytics-window';

export default function removeSegmentAnalytics(): void {
  delete ANALYTICS_WINDOW.analytics;
}
