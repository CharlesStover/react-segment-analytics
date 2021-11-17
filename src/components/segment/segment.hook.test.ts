import { act, renderHook } from '@testing-library/react-hooks';
import type { MutableRefObject } from 'react';
import MISSING_WINDOW_ANALYTICS_ERROR from '../../constants/missing-window-analytics-error';
import type AnalyticsWindow from '../../types/analytics-window';
import getAnalyticsWindow from '../../utils/get-analytics-window';
import useSegment from './segment.hook';

const ANALYTICS_WINDOW: AnalyticsWindow = getAnalyticsWindow();

const resolveRef = (
  ref: Readonly<MutableRefObject<VoidFunction | undefined>>,
): void => {
  if (typeof ref.current === 'undefined') {
    throw new Error('Expected a Promise resolver.');
  }
  ref.current();
};

describe('useSegment', (): void => {
  beforeEach((): void => {
    delete ANALYTICS_WINDOW.analytics;
  });

  it('should init Segment Analytics', (): void => {
    expect(ANALYTICS_WINDOW.analytics).toBeUndefined();

    renderHook(useSegment, {
      initialProps: {
        writeKey: 'test-write-key',
      },
    });

    expect(ANALYTICS_WINDOW.analytics).toBeDefined();
  });

  it('should remove Segment Analytics on unmount', (): void => {
    const { unmount } = renderHook(useSegment, {
      initialProps: {
        writeKey: 'test-write-key',
      },
    });

    expect(ANALYTICS_WINDOW.analytics).toBeDefined();

    unmount();

    expect(ANALYTICS_WINDOW.analytics).toBeUndefined();
  });

  describe('page', (): void => {
    it('should throw an error if Segment Analytics are removed', async (): Promise<void> => {
      const { result } = renderHook(useSegment, {
        initialProps: {
          writeKey: 'test-write-key',
        },
      });

      delete ANALYTICS_WINDOW.analytics;

      let error: Error | null = null;
      const setError = (err: Readonly<Error>): void => {
        error = err;
      };

      await act(async (): Promise<void> => {
        await result.current.page('test').catch(setError);
      });

      expect(error).toBe(MISSING_WINDOW_ANALYTICS_ERROR);
    });

    it('should call the Segment Analytics `page` method', async (): Promise<void> => {
      const { result } = renderHook(useSegment, {
        initialProps: {
          writeKey: 'test-write-key',
        },
      });

      await act(async (): Promise<void> => {
        const pagePromise: Promise<unknown> = result.current.page('test');
        resolveRef(result.current.asyncPageResolve);
        await pagePromise;
      });

      expect(ANALYTICS_WINDOW.analytics).toContainEqual([
        'page',
        'test',
        undefined,
        undefined,
        undefined,
        expect.any(Function),
      ]);
    });
  });

  describe('track', (): void => {
    it('should throw an error if Segment Analytics are removed', async (): Promise<void> => {
      const { result } = renderHook(useSegment, {
        initialProps: {
          writeKey: 'test-write-key',
        },
      });

      delete ANALYTICS_WINDOW.analytics;

      let error: Error | null = null;
      const setError = (err: Readonly<Error>): void => {
        error = err;
      };
      await act(async (): Promise<void> => {
        await result.current.track('test').catch(setError);
      });

      expect(error).toBe(MISSING_WINDOW_ANALYTICS_ERROR);
    });

    it('should call the Segment Analytics `track` method', async (): Promise<void> => {
      const { result } = renderHook(useSegment, {
        initialProps: {
          writeKey: 'test-write-key',
        },
      });

      await act(async (): Promise<void> => {
        const trackPromise: Promise<unknown> = result.current.track('event');
        resolveRef(result.current.asyncTrackResolve);
        await trackPromise;
      });

      expect(ANALYTICS_WINDOW.analytics).toContainEqual([
        'track',
        'event',
        undefined,
        undefined,
        expect.any(Function),
      ]);
    });

    it('should call the Segment Analytics `track` method with the event prefix', async (): Promise<void> => {
      const { result } = renderHook(useSegment, {
        initialProps: {
          eventPrefix: 'test',
          writeKey: 'test-write-key',
        },
      });

      await act(async (): Promise<void> => {
        const trackPromise: Promise<unknown> = result.current.track('event');
        resolveRef(result.current.asyncTrackResolve);
        await trackPromise;
      });

      expect(ANALYTICS_WINDOW.analytics).toContainEqual([
        'track',
        'test event',
        undefined,
        undefined,
        expect.any(Function),
      ]);
    });
  });
});
