import type Traits from '../../types/traits';

const SECOND_ITEM = 1;

export default function hasUserId(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  identifyAnalytics:
    | readonly ['identify', Readonly<Traits>, ...(readonly unknown[])]
    | readonly ['identify', string, Readonly<Traits>, ...(readonly unknown[])],
): identifyAnalytics is readonly [
  'identify',
  string,
  Traits,
  ...(readonly unknown[]),
] {
  return typeof identifyAnalytics[SECOND_ITEM] === 'string';
}
