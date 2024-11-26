import type { Shape } from "@penpot/plugin-types";
import { textToElement } from "../converters/text.ts";
import { elementToString, type Element } from "./element.ts";

export function shapeToHTML(shape: Shape): string {
  let element = null as null | Element;
  if (shape.type === "text") {
    element = textToElement(shape);
  }
  if (element) {
    return elementToString(element);
  }
  return "";
}
