import type Traits from '../../types/traits';
import hasUserId from '../utils/has-user-id';

const SECOND_ITEM = 1;
const THIRD_ITEM = 2;

export default function mapIdentifyAnalyticsToTraits(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  identifyAnalytics:
    | readonly ['identify', Readonly<Traits>, ...(readonly unknown[])]
    | readonly ['identify', string, Readonly<Traits>, ...(readonly unknown[])],
): Traits {
  if (hasUserId(identifyAnalytics)) {
    return identifyAnalytics[THIRD_ITEM];
  }
  return identifyAnalytics[SECOND_ITEM];
}
