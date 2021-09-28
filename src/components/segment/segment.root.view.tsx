import type { ReactElement, ReactNode } from 'react';
import PageContext from '../../contexts/page';
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
  const { page, track } = useSegment({ eventPrefix, traits, writeKey });

  return (
    <PageContext.Provider value={page}>
      <TrackContext.Provider value={track}>{children}</TrackContext.Provider>
    </PageContext.Provider>
  );
}
