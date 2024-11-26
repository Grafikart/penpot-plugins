export function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

export function reverseObjectKeyValue<T extends Record<string, string>>(
  obj: T
): { [K in keyof T as T[K]]: K } {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key])
  ) as { [K in keyof T as T[K]]: K };
}
