import ANALYTICS_METHODS from '../constants/analytics-methods';
import type InitialAnalytics from '../types/initial-analytics';
import analyticsFactory from '../utils/analytics-factory';
import analyticsLoad from '../utils/analytics-load';
import getInitialAnalytics from '../utils/get-initial-analytics';

export default function init(writeKey: string): void {
  const initialAnalytics: InitialAnalytics = getInitialAnalytics();

  if (typeof initialAnalytics.initialize !== 'undefined') {
    return;
  }

  if (initialAnalytics.invoked === true) {
    console.error('Segment snippet included twice.');
    return;
  }

  initialAnalytics.factory = analyticsFactory;
  initialAnalytics.invoked = true;
  initialAnalytics.load = analyticsLoad;
  initialAnalytics.methods = ANALYTICS_METHODS;
  initialAnalytics.SNIPPET_VERSION = '4.1.0';

  for (const method of ANALYTICS_METHODS) {
    initialAnalytics[method] = analyticsFactory(method);
  }

  initialAnalytics.load(writeKey);
}
