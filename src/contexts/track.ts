import type { AnalyticsBrowser } from '@segment/analytics-next';
import { createContext } from 'react';

export default createContext<AnalyticsBrowser['track'] | null>(null);
