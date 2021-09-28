export default interface SegmentPage {
  (
    category?: string,
    name?: string,
    properties?: Record<string, unknown>,
    options?: unknown,
    callback?: () => void,
  ): void;
  readonly length: number;
}
