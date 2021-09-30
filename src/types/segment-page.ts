export default interface SegmentPage {
  (
    category?: string,
    name?: string,
    properties?: Record<string, unknown>,
    options?: unknown,
    callback?: () => void,
  ): Promise<void>;
  readonly length: number;
}
