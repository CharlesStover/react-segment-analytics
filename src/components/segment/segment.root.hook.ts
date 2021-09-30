import type { MutableRefObject } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import ANALYTICS_WINDOW from '../../constants/analytics-window';
import MISSING_WINDOW_ANALYTICS_ERROR from '../../constants/missing-window-analytics-error';
import type SegmentPage from '../../types/segment-page';
import type SegmentTrack from '../../types/segment-track';
import type Traits from '../../types/traits';
import init from '../../utils/init';
import useIdentify from './segment.root.hook.identify';

interface Props {
  readonly eventPrefix?: string | undefined;
  readonly traits?: Traits | undefined;
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

export default function useSegment({
  eventPrefix,
  traits,
  writeKey,
}: Props): State {
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
      delete ANALYTICS_WINDOW.analytics;
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
        category?: string,
        pageName?: string,
        properties?: Record<string, unknown>,
        options?: unknown,
      ): Promise<void> => {
        const newPage: Promise<void> = new Promise((resolve, reject): void => {
          asyncPageResolve.current = resolve;

          if (typeof ANALYTICS_WINDOW.analytics === 'undefined') {
            reject(MISSING_WINDOW_ANALYTICS_ERROR);
            return;
          }

          ANALYTICS_WINDOW.analytics.page(
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
        properties?: Record<string, unknown>,
        options?: unknown,
      ): Promise<void> => {
        const getEvent = (): string => {
          if (typeof eventPrefix === 'string') {
            return `${eventPrefix} ${event}`;
          }
          return event;
        };

        const newTrack: Promise<void> = new Promise((resolve, reject): void => {
          asyncTrackResolve.current = resolve;

          if (typeof ANALYTICS_WINDOW.analytics === 'undefined') {
            reject(MISSING_WINDOW_ANALYTICS_ERROR);
            return;
          }

          ANALYTICS_WINDOW.analytics.track(
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
