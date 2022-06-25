import type { Analytics } from '@segment/analytics-next';
import { useContext } from 'react';
import MISSING_SEGMENT_CONTEXT_ERROR from '../constants/missing-segment-context-error';
import PageContext from '../contexts/page';

export default function useSegmentPage(): Analytics['page'] {
  const page: Analytics['page'] | null = useContext(PageContext);

  if (page === null) {
    throw MISSING_SEGMENT_CONTEXT_ERROR;
  }

  return page;
}
