import { describe, expect, it } from "vitest";
import { withPrefix } from "./string.ts";

describe("string", () => {
  describe("withPrefix", () => {
    it.each([
      { input: "red-500", prefix: "color-", expected: "color-red-500" },
      {
        input: "red-500",
        prefix: "color-",
        expected: null,
        options: { ignored: "red-500" },
      },
    ])(
      "should return $expected when input is $input and prefix is $prefix",
      ({ input, prefix, expected, options }) => {
        expect(withPrefix(prefix, input, options)).toBe(expected);
      }
    );
  });
});
