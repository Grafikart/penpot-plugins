import { config } from "../config.ts";
import { hasKey, reverseObjectKeyValue } from "./object.ts";

const blurDict = reverseObjectKeyValue(config.theme.blur);

/**
 * Tailwind use 0.25rem as unit
 */
export function pxToTailwind(v: number): string {
  v = Math.round(v);
  if (v % 4 === 0) {
    return (v / 4).toString();
  }
  return `[${v}px]`;
}

/**
 * Generate classes for blur
 */
export function tailwindBlur(value: number): string {
  const key = `${value}px`;
  if (hasKey(blurDict, key)) {
    if (blurDict[key] === "DEFAULT") {
      return "blur";
    }
    return `blur-${blurDict[key]}`;
  }
  return `blur-[${key}]`;
}

/**
 * Generate classes for directional data like padding, gap, margin...
 */
export function directionalClass({
  prefix,
  top,
  left,
  right,
  bottom,
}: {
  prefix: string;
  top: number;
  right: number;
  bottom: number;
  left: number;
}) {
  // Force fixed px value
  top = Math.round(top);
  left = Math.round(left);
  right = Math.round(right);
  bottom = Math.round(bottom);

  // Handle the 4 sides
  if (top === bottom && left === bottom && right === left && top > 0) {
    return [`${prefix}-${pxToTailwind(top)}`.replaceAll("--", "-")];
  }
  const cls: string[] = [];
  if (top === bottom && top > 0) {
    cls.push(`${prefix}y-${pxToTailwind(top)}`);
  }
  if (top > 0 && top !== bottom) {
    cls.push(`${prefix}t-${pxToTailwind(top)}`);
  }
  if (bottom > 0 && top !== bottom) {
    cls.push(`${prefix}b-${pxToTailwind(bottom)}`);
  }
  if (left === right && left > 0) {
    cls.push(`${prefix}x-${pxToTailwind(left)}`);
  }
  if (left > 0 && left !== right) {
    cls.push(`${prefix}l-${pxToTailwind(left)}`);
  }
  if (right > 0 && left !== right) {
    cls.push(`${prefix}r-${pxToTailwind(right)}`);
  }
  return cls;
}
