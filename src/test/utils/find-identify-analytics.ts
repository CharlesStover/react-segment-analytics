import type Traits from '../../types/traits';

const FIRST_ITEM = 0;

export default function findIdentifyAnalytics(
  entry: readonly [string, ...unknown[]],
): entry is
  | ['identify', string, Traits, ...unknown[]]
  | ['identify', Traits, ...unknown[]] {
  return entry[FIRST_ITEM] === 'identify';
}
