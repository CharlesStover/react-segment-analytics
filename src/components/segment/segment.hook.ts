import type { MutableRefObject } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import MISSING_WINDOW_ANALYTICS_ERROR from '../../constants/missing-window-analytics-error';
import useIdentify from '../../hooks/use-identify';
import type AnalyticsWindow from '../../types/analytics-window';
import type SegmentPage from '../../types/segment-page';
import type SegmentTrack from '../../types/segment-track';
import type Traits from '../../types/traits';
import getAnalyticsWindow from '../../utils/get-analytics-window';
import init from '../../utils/init';

interface Props {
  readonly eventPrefix?: string | undefined;
  readonly traits?: Readonly<Traits> | undefined;
  readonly writeKey: string;
}

interface State {
  readonly asyncPageCallback: MutableRefObject<Promise<unknown> | undefined>;
  readonly asyncPageResolve: MutableRefObject<VoidFunction | undefined>;
  readonly asyncTrackCallback: MutableRefObject<Promise<unknown> | undefined>;
  readonly asyncTrackResolve: MutableRefObject<VoidFunction | undefined>;
  readonly page: SegmentPage;
  readonly track: SegmentTrack;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default function useSegment({
  eventPrefix,
  traits,
  writeKey,
}: Readonly<Props>): State {
  //States
  const asyncPageCallback: MutableRefObject<Promise<unknown> | undefined> =
    useRef();
  const asyncPageResolve: MutableRefObject<VoidFunction | undefined> = useRef();
  const asyncTrackCallback: MutableRefObject<Promise<unknown> | undefined> =
    useRef();
  const asyncTrackResolve: MutableRefObject<VoidFunction | undefined> =
    useRef();

  // Effects
  useEffect((): VoidFunction => {
    init(writeKey);
    return (): void => {
      const analyticsWindow: AnalyticsWindow = getAnalyticsWindow();
      delete analyticsWindow.analytics;
    };
  }, [writeKey]);

  useIdentify(traits);

  return {
    asyncPageCallback,
    asyncPageResolve,
    asyncTrackCallback,
    asyncTrackResolve,

    page: useCallback(
      async (
        category?: string | undefined,
        pageName?: string | undefined,
        properties?: Readonly<Record<string, unknown>> | undefined,
        options?: unknown | undefined,
      ): Promise<void> => {
        const newPage: Promise<void> = new Promise((resolve, reject): void => {
          asyncPageResolve.current = resolve;

          const analyticsWindow: AnalyticsWindow = getAnalyticsWindow();
          if (typeof analyticsWindow.analytics === 'undefined') {
            reject(MISSING_WINDOW_ANALYTICS_ERROR);
            return;
          }

          analyticsWindow.analytics.page(
            category,
            pageName,
            properties,
            options,
            resolve,
          );
        });

        asyncPageCallback.current = newPage;

        return newPage;
      },
      [],
    ),

    track: useCallback(
      async (
        event: string,
        properties?: Readonly<Record<string, unknown>> | undefined,
        options?: unknown | undefined,
      ): Promise<void> => {
        const getEvent = (): string => {
          if (typeof eventPrefix === 'string') {
            return `${eventPrefix} ${event}`;
          }
          return event;
        };

        const newTrack: Promise<void> = new Promise((resolve, reject): void => {
          asyncTrackResolve.current = resolve;

          const analyticsWindow: AnalyticsWindow = getAnalyticsWindow();
          if (typeof analyticsWindow.analytics === 'undefined') {
            reject(MISSING_WINDOW_ANALYTICS_ERROR);
            return;
          }

          analyticsWindow.analytics.track(
            getEvent(),
            properties,
            options,
            resolve,
          );
        });

        asyncTrackCallback.current = newTrack;

        return newTrack;
      },
      [eventPrefix],
    ),
  };
}
