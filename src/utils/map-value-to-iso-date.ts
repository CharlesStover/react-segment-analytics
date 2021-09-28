export default function mapValueToIsoDate(
  value: Date | number | string | undefined,
): string | undefined {
  if (typeof value === 'undefined') {
    return;
  }

  if (typeof value == 'number') {
    return new Date(value).toISOString();
  }

  if (typeof value === 'string') {
    return value;
  }

  return value.toISOString();
}
