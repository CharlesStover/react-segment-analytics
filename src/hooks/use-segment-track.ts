import type { Analytics } from '@segment/analytics-next';
import { useContext } from 'react';
import MISSING_SEGMENT_CONTEXT_ERROR from '../constants/missing-segment-context-error';
import TrackContext from '../contexts/track';

export default function useSegmentTrack(): Analytics['track'] {
  const track: Analytics['track'] | null = useContext(TrackContext);

  if (track === null) {
    throw MISSING_SEGMENT_CONTEXT_ERROR;
  }

  return track;
}
