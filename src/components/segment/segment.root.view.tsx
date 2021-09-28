import type { ReactElement, ReactNode } from 'react';
import TrackContext from '../../contexts/track';
import type Traits from '../../types/traits';
import useSegment from './segment.root.hook';

interface Props {
  readonly children: ReactNode;
  readonly eventPrefix?: string | undefined;
  readonly traits?: Traits | undefined;
  readonly writeKey: string;
}

export default function Segment({
  children,
  eventPrefix,
  traits,
  writeKey,
}: Props): ReactElement {
  const { track } = useSegment({ eventPrefix, traits, writeKey });

  return (
    <TrackContext.Provider value={track}>{children}</TrackContext.Provider>
  );
}
