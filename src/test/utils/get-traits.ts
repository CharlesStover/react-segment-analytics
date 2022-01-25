import type Traits from '../../types/traits';
import ANALYTICS_WINDOW from '../constants/analytics-window';
import MISSING_IDENTIFY_ANALYTICS_ERROR from '../constants/missing-identify-analytics-error';
import findIdentifyAnalytics from '../utils/find-identify-analytics';
import mapIdentifyAnalyticsToTraits from '../utils/map-identify-analytics-to-traits';

export default function getTraits(): Traits {
  const analytics: [string, ...unknown[]][] =
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    ANALYTICS_WINDOW.analytics as unknown as [string, ...unknown[]][];
  const identifyAnalytics:
    | ['identify', string, Traits, ...unknown[]]
    | ['identify', Traits, ...unknown[]]
    | undefined = analytics.find(findIdentifyAnalytics);
  if (typeof identifyAnalytics === 'undefined') {
    throw MISSING_IDENTIFY_ANALYTICS_ERROR;
  }
  return mapIdentifyAnalyticsToTraits(identifyAnalytics);
}
