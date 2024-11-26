export function filterStringOnly<T extends unknown[]>(arr: T): string[] {
  return arr.filter((item) => typeof item === "string") as string[];
}
