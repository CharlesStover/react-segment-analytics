import { renderHook } from '@testing-library/react-hooks';
import type { PropsWithChildren, ReactElement } from 'react';
import MISSING_SEGMENT_CONTEXT_ERROR from '../constants/missing-segment-context-error';
import SegmentTrack from '../contexts/track';
import { useSegmentTrack } from '..';

describe('useSegmentTrack', (): void => {
  it('should throw an error if no context is provided', (): void => {
    const { result } = renderHook(useSegmentTrack);
    expect(result.error).toBe(MISSING_SEGMENT_CONTEXT_ERROR);
  });

  it('should return the SegmentTrack context value', (): void => {
    const TEST_TRACK = jest.fn();
    const { result } = renderHook(useSegmentTrack, {
      wrapper({
        children,
      }: Readonly<PropsWithChildren<unknown>>): ReactElement {
        return (
          <SegmentTrack.Provider value={TEST_TRACK}>
            {children}
          </SegmentTrack.Provider>
        );
      },
    });
    expect(result.current).toBe(TEST_TRACK);
  });
});
