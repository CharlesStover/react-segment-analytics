export default function mapWriteKeyToScriptSrc(writeKey: string): string {
  return `https://cdn.segment.com/analytics.js/v1/${writeKey}/analytics.min.js`;
}
