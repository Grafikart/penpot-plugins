import type { Text } from "@penpot/plugin-types";
import { withPrefix } from "../functions/string.ts";
import { filterStringOnly } from "../functions/array.ts";
import type { Element } from "../functions/element.ts";
import { colorToTailwind, fillColor } from "../functions/color.ts";
import { reverseObjectKeyValue } from "../functions/object.ts";
import { config } from "../config.ts";

const baseSize = 16;
const weightDict = reverseObjectKeyValue(config.theme.fontWeight);
const sizes = Object.entries(config.theme.fontSize).map(([name, value]) => {
  const fontSize = parseFloat(value[0]);
  const lineHeight = parseFloat(value[1].lineHeight);
  return { size: fontSize, name, lineHeight };
});
const lineHeights = Object.fromEntries(
  Object.entries(config.theme.lineHeight)
    .filter(([name]) => !name.match(/^\d+$/))
    .map(([name, value]) => {
      return [parseFloat(value).toString(), name];
    }),
);

/**
 * Find the correct class to add for the font size + line height association
 */
function sizeClasses({
  fontSize,
  lineHeight,
}: {
  fontSize: string;
  lineHeight: string;
}): string[] {
  const existingSize = sizes.find(
    (s) => s.size === parseFloat(fontSize) / baseSize,
  );
  const cls = [];

  // Apply the right font size
  if (existingSize) {
    cls.push(`text-${existingSize.name}`);
  } else {
    cls.push(`text-[${fontSize}px]`);
  }

  // The line height match the font size
  if (parseFloat(lineHeight) === existingSize?.lineHeight) {
    return cls;
  }

  // The line height is a known theme value
  if (lineHeight in lineHeights) {
    cls.push(`leading-${lineHeights[lineHeight as keyof typeof lineHeights]}`);
  } else {
    cls.push(`leading-[${lineHeight}]`);
  }

  return cls;
}

/**
 * Convert a text shape into an HTML element with tailwind classes
 */
export function textToElement(text: Text): Element {
  const classes = [];

  if (text.fontStyle === "italic") {
    classes.push("italic");
  }

  if (Array.isArray(text.fills)) {
    const color = fillColor(text.fills);
    if (color) {
      classes.push(
        withPrefix("text-", colorToTailwind(color.hex, color.opacity)),
      );
    }
  }

  if (text.fontWeight !== "400") {
    const weight = weightDict[text.fontWeight];
    classes.push(`font-${weight ?? text.fontWeight}`);
  }

  if (
    ["uppercase", "lowercase", "capitalize"].includes(text.textTransform ?? "")
  ) {
    classes.push(text.textTransform);
  }

  if (
    ["underline", "line-through", "overline"].includes(
      text.textDecoration ?? "",
    )
  ) {
    classes.push(text.textDecoration);
  }

  classes.push(...sizeClasses(text));

  return {
    tag: text.growType === "auto-width" ? "span" : "div",
    classes: filterStringOnly(classes),
    children: [text.characters],
  };
}
