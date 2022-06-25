import type {
  Analytics,
  AnalyticsBrowser as AnalyticsBrowserType,
  AnalyticsBrowserSettings,
  InitOptions,
} from '@segment/analytics-next';
import { useMemo } from 'react';
import useIdentify from '../../hooks/use-identify';
import type Traits from '../../types/traits';
import mapObjectToDependencyArray from '../../utils/map-object-to-dependency-array';

interface Props extends AnalyticsBrowserSettings, InitOptions {
  readonly AnalyticsBrowser: typeof AnalyticsBrowserType;
  readonly traits?: Readonly<Traits> | undefined;
}

interface State {
  readonly page: Analytics['page'];
  readonly track: Analytics['track'];
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default function useSegment({
  AnalyticsBrowser,
  traits,
  ...rest
}: Readonly<Props>): State {
  const loadDependencies: unknown[] = mapObjectToDependencyArray(rest);

  //States
  const analytics: AnalyticsBrowserType = useMemo(
    (): AnalyticsBrowserType => {
      const {
        cdnSettings,
        cdnURL,
        plugins,
        timeout,
        writeKey,
        ...initOptions
      } = rest;

      // We use `as AnalyticsBrowserSettings` here, because Segment does not
      //   support `exactOptionalPropertyTypes`.
      const analyticsSettings: AnalyticsBrowserSettings = {
        cdnSettings,
        cdnURL,
        plugins,
        timeout,
        writeKey,
      } as AnalyticsBrowserSettings;
      return AnalyticsBrowser.load(analyticsSettings, initOptions);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [AnalyticsBrowser, ...loadDependencies],
  );

  // Effects
  useIdentify(analytics, traits);

  return {
    page: analytics.page,
    track: analytics.track,
  };
}
