import type InitialAnalytics from '../types/initial-analytics';
import getHead from '../utils/get-head';
import getInitialAnalytics from '../utils/get-initial-analytics';
import mapWriteKeyToScriptElement from '../utils/map-write-key-to-script-element';

export default function analyticsLoad(
  writeKey: string,
  options?: unknown,
): void {
  const script: HTMLScriptElement = mapWriteKeyToScriptElement(writeKey);

  const head: HTMLHeadElement = getHead();
  head.appendChild(script);

  const initialAnalytics: InitialAnalytics = getInitialAnalytics();
  initialAnalytics._loadOptions = options;
}
