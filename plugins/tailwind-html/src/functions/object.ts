export function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

export function reverseObjectKeyValue<T extends Record<string, string>>(
  obj: T,
): { [K in keyof T as T[K]]: K } {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key]),
  ) as { [K in keyof T as T[K]]: K };
}

export function hasKey(object: object, key: string): key is keyof object {
  return key in object;
}

export function objectGet<T extends object, K extends keyof T>(
  obj: T,
  key: K,
): T[K];
export function objectGet<T extends object, K extends string>(
  obj: T,
  key: K,
): undefined;
export function objectGet<T extends object, K extends keyof T | string>(
  obj: T,
  key: K,
): K extends keyof T ? T[K] : undefined {
  return (
    key in obj ? (obj as T)[key as keyof T] : undefined
  ) as K extends keyof T ? T[K] : undefined;
}
