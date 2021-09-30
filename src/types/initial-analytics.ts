export default interface InitialAnalytics
  extends Array<[string, ...unknown[]]> {
  _loadOptions?: unknown;
  alias?: (...args: readonly unknown[]) => InitialAnalytics;
  debug?: (...args: readonly unknown[]) => InitialAnalytics;
  group?: (...args: readonly unknown[]) => InitialAnalytics;
  identify?: (...args: readonly unknown[]) => InitialAnalytics;
  initialize?: (...args: readonly unknown[]) => InitialAnalytics;
  invoked?: boolean | undefined;
  load?: (writeKey: string, options?: unknown) => void;
  methods?: string[];
  off?: (...args: readonly unknown[]) => InitialAnalytics;
  on?: (...args: readonly unknown[]) => InitialAnalytics;
  once?: (...args: readonly unknown[]) => InitialAnalytics;
  page?: (...args: readonly unknown[]) => InitialAnalytics;
  pageview?: (...args: readonly unknown[]) => InitialAnalytics;
  ready?: (...args: readonly unknown[]) => InitialAnalytics;
  reset?: (...args: readonly unknown[]) => InitialAnalytics;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SNIPPET_VERSION?: string;
  track?: (...args: readonly unknown[]) => InitialAnalytics;
  trackClick?: (...args: readonly unknown[]) => InitialAnalytics;
  trackForm?: (...args: readonly unknown[]) => InitialAnalytics;
  trackLink?: (...args: readonly unknown[]) => InitialAnalytics;
  trackSubmit?: (...args: readonly unknown[]) => InitialAnalytics;
  factory?: (
    method: string,
  ) => (...args: readonly unknown[]) => InitialAnalytics;
}
