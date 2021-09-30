import { useContext } from 'react';
import MISSING_SEGMENT_CONTEXT_ERROR from '../constants/missing-segment-context-error';
import TrackContext from '../contexts/track';
import type SegmentTrack from '../types/segment-track';

export default function useSegmentTrack(): SegmentTrack {
  const track: SegmentTrack | null = useContext(TrackContext);

  if (track === null) {
    throw MISSING_SEGMENT_CONTEXT_ERROR;
  }

  return track;
}
