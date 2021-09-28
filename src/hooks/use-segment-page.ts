import { useContext } from 'react';
import PageContext from '../contexts/page';
import type SegmentPage from '../types/segment-page';

export default function useSegmentTrack(): SegmentPage {
  const page: SegmentPage | null = useContext(PageContext);

  if (page === null) {
    throw new Error('Expected Segment context provider to be mounted.');
  }

  return page;
}
