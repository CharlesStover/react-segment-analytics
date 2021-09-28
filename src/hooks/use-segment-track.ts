import { useContext } from 'react';
import TrackContext from '../contexts/track';
import type SegmentTrack from '../types/segment-track';

export default function useSegmentTrack(): SegmentTrack {
  const track: SegmentTrack | null = useContext(TrackContext);

  if (track === null) {
    throw new Error('Expected Segment context provider to be mounted.');
  }

  return track;
}
