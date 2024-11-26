import { describe, expect, it } from "vitest";
import { colorToTailwindValue } from "./color.ts";

describe("colorToTailwindValue", () => {
  it.each([
    ["#f87171", "red-400"],
    ["#ef4444", "red-500"],
    ["#dc2626", "red-600"],
    ["#64748b", "slate-500"],
    ["#ffffff", "white"],
    ["#000000", "black"],
    ["#00ff00", "[#00ff00]"],
  ])(
    "should return the correct tailwind value for color %s",
    (input, expected) => {
      expect(colorToTailwindValue(input)).toBe(expected);
    }
  );
});
