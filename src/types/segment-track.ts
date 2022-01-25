export default interface SegmentTrack {
  (
    event: string,
    properties?: Readonly<Record<string, unknown>> | undefined,
    options?: unknown | undefined,
  ): Promise<void>;
  readonly length: number;
}
