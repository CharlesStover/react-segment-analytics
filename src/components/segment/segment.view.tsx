import type { ReactElement, ReactNode } from 'react';
import PageContext from '../../contexts/page';
import TrackContext from '../../contexts/track';
import type Traits from '../../types/traits';
import useSegment from './segment.hook';

interface Props {
  readonly children: ReactNode;
  readonly eventPrefix?: string | undefined;
  readonly traits?: Readonly<Traits> | undefined;
  readonly writeKey: string;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default function Segment({
  children,
  eventPrefix,
  traits,
  writeKey,
}: Readonly<Props>): ReactElement {
  const { page, track } = useSegment({ eventPrefix, traits, writeKey });

  return (
    <PageContext.Provider value={page}>
      <TrackContext.Provider value={track}>{children}</TrackContext.Provider>
    </PageContext.Provider>
  );
}
