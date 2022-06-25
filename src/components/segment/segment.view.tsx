import type {
  AnalyticsBrowserSettings,
  InitOptions,
} from '@segment/analytics-next';
import { AnalyticsBrowser as AnalyticsBrowserClass } from '@segment/analytics-next';
import type { ReactElement, ReactNode } from 'react';
import PageContext from '../../contexts/page';
import TrackContext from '../../contexts/track';
import type Traits from '../../types/traits';
import useSegment from './segment.hook';

interface Props extends AnalyticsBrowserSettings, InitOptions {
  readonly AnalyticsBrowser?: typeof AnalyticsBrowserClass | undefined;
  readonly children: ReactNode;
  readonly traits?: Readonly<Traits> | undefined;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default function Segment({
  AnalyticsBrowser = AnalyticsBrowserClass,
  children,
  traits,
  ...rest
}: Readonly<Props>): ReactElement {
  const { page, track } = useSegment({
    AnalyticsBrowser,
    traits,
    ...rest,
  });

  return (
    <PageContext.Provider value={page}>
      <TrackContext.Provider value={track}>{children}</TrackContext.Provider>
    </PageContext.Provider>
  );
}
