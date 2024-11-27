import TailwindColors from "tailwindcss/colors";
import { objectKeys } from "./object.ts";
import { Fill } from "@penpot/plugin-types";
import { config } from "../config.ts";

// Build a dictionnary of all tailwind colors indexed by hex value
const colorDict = new Map<string, string>();

for (const name of objectKeys(TailwindColors)) {
  if (typeof config.theme.colors[name] === "object") {
    for (const shade of objectKeys(config.theme.colors[name])) {
      const hex = forceFullColorHex(config.theme.colors[name][shade]);
      if (colorDict.has(hex)) {
        continue;
      }
      colorDict.set(hex, `${name}-${shade}`);
    }
  } else if (typeof config.theme.colors[name] === "string") {
    colorDict.set(forceFullColorHex(config.theme.colors[name]), name);
  }
}

function forceFullColorHex(color: string): string {
  if (color.length === 4) {
    return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
  }
  return color;
}

export function colorToTailwind(color: string, opacity: number = 1): string {
  const name = colorDict.get(color.toLowerCase()) ?? `[${color.toLowerCase()}]`;
  return opacity < 1 ? `${name}/${opacity * 100}` : name;
}

export function fillColor(fills: Fill[]) {
  for (const fill of fills) {
    if (fill.fillColor) {
      return {
        hex: fill.fillColor,
        opacity: fill.fillOpacity ?? 1,
      };
    }
  }
  return null;
}
