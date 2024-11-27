/**
 * Add prefix to value except if the value is ignored
 */
export function withPrefix(
  prefix: string,
  value?: string,
  options?: { ignored?: string },
) {
  if (!value) {
    return null;
  }
  if (options?.ignored && value === options.ignored) {
    return null;
  }
  return `${prefix}${value}`;
}
