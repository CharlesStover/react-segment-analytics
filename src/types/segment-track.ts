// eslint-disable-next-line @typescript-eslint/no-type-alias
type SegmentTrack = (
  event: string,
  properties?: Record<string, unknown>,
  options?: unknown,
  callback?: () => void,
) => void;

export default SegmentTrack;
