import type AnalyticsWindow from '../types/analytics-window';

// In order to support server-side rendering, we cannot access the `window`
//   variable outside of a `useEffect` hook. This includes accessing it in the
//   module scope.

export default function getAnalyticsWindow(): AnalyticsWindow {
  return window;
}
