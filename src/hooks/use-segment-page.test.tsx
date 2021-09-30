import { renderHook } from '@testing-library/react-hooks';
import type { PropsWithChildren, ReactElement } from 'react';
import MISSING_SEGMENT_CONTEXT_ERROR from '../constants/missing-segment-context-error';
import SegmentPage from '../contexts/page';
import { useSegmentPage } from '..';

describe('useSegmentPage', (): void => {
  it('should throw an error if no context is provided', (): void => {
    const { result } = renderHook(useSegmentPage);
    expect(result.error).toBe(MISSING_SEGMENT_CONTEXT_ERROR);
  });

  it('should return the SegmentPage context value', (): void => {
    const TEST_PAGE = jest.fn();
    const { result } = renderHook(useSegmentPage, {
      wrapper({
        children,
      }: Readonly<PropsWithChildren<unknown>>): ReactElement {
        return (
          <SegmentPage.Provider value={TEST_PAGE}>
            {children}
          </SegmentPage.Provider>
        );
      },
    });
    expect(result.current).toBe(TEST_PAGE);
  });
});
