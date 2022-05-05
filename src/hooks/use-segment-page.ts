import { useContext } from 'react';
import MISSING_SEGMENT_CONTEXT_ERROR from '../constants/missing-segment-context-error';
import PageContext from '../contexts/page';
import type SegmentPage from '../types/segment-page';

export default function useSegmentPage(): SegmentPage {
  const page: SegmentPage | null = useContext(PageContext);

  if (page === null) {
    throw MISSING_SEGMENT_CONTEXT_ERROR;
  }

  return page;
}
