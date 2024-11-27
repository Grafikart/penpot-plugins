import { colorToTailwind, fillColor } from "../functions/color.ts";
import type { Shape } from "@penpot/plugin-types";

export function backgroundToClasses(shape: Shape): string[] {
  const cls: string[] = [];
  if (
    shape.type === "text" ||
    shape.type === "svg-raw" ||
    shape.type === "path"
  ) {
    return cls;
  }
  if (Array.isArray(shape.fills) && shape.fills.length > 0) {
    const color = fillColor(shape.fills);
    if (color) {
      cls.push(`bg-${colorToTailwind(color.hex, color.opacity)}`);
    }
  }
  return cls;
}
