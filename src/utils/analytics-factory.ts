import type InitialAnalytics from '../types/initial-analytics';
import getInitialAnalytics from './get-initial-analytics';

export default function analyticsFactory(
  method: string,
): (...args: readonly unknown[]) => InitialAnalytics {
  return function analyticsFactoryMethod(
    ...args: readonly unknown[]
  ): InitialAnalytics {
    const initialAnalytics: InitialAnalytics = getInitialAnalytics();
    initialAnalytics.push([method, ...args]);
    return initialAnalytics;
  };
}
