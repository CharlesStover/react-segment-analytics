export default function mapValueToString(
  value: number | string | undefined,
): string | undefined {
  if (typeof value === 'undefined') {
    return;
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  return value;
}
