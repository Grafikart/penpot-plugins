import type { Text } from "@penpot/plugin-types";
import { withPrefix } from "../functions/string.ts";
import { filterStringOnly } from "../functions/array.ts";
import type { Element } from "../functions/element.ts";
import { colorToTailwindValue, fillColor } from "../functions/color.ts";
import { reverseObjectKeyValue } from "../functions/object.ts";
import { config } from "../config.ts";

const weightDict = reverseObjectKeyValue(config.theme.fontWeight);

export function textToElement(text: Text): Element {
  const classes = [];

  if (text.fontStyle === "italic") {
    classes.push("italic");
  }

  if (Array.isArray(text.fills)) {
    const color = fillColor(text.fills);
    if (color) {
      classes.push(
        withPrefix("text-", colorToTailwindValue(color.hex, color.opacity))
      );
    }
  }

  if (text.fontWeight !== "400") {
    const weight = weightDict[text.fontWeight];
    classes.push(`font-${weight ?? text.fontWeight}`);
  }

  if (text.textTransform) {
    classes.push(text.textTransform);
  }

  console.log(text.bounds, text.growType, text.width);

  return {
    tag: "span",
    classes: filterStringOnly(classes),
    children: [text.characters],
  };
}
