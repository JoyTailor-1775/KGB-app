// Copies all own properties of source object to the target one.
export default function copyOwnProps(
  source: Record<string, unknown>,
  target: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = target;
  for (const prop in source) {
    if (source.hasOwnProperty(prop)) {
      result[prop] = source[prop];
    }
  }
  return result;
}
