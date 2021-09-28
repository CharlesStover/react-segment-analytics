import { createContext } from 'react';
import type SegmentTrack from '../types/segment-track';

export default createContext<SegmentTrack | null>(null);
