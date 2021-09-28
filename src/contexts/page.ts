import { createContext } from 'react';
import type SegmentPage from '../types/segment-page';

export default createContext<SegmentPage | null>(null);
