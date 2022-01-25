export default interface SegmentPage {
  (
    category?: string | undefined,
    name?: string | undefined,
    properties?: Readonly<Record<string, unknown>> | undefined,
    options?: unknown | undefined,
    callback?: (() => void) | undefined,
  ): Promise<void>;
  readonly length: number;
}
