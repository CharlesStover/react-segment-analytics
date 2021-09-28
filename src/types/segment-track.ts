export default interface SegmentTrack {
  (
    event: string,
    properties?: Record<string, unknown>,
    options?: unknown,
  ): Promise<void>;
  readonly length: number;
}
