import type { Shape } from "@penpot/plugin-types";
import { textToElement } from "../converters/text.ts";
import { elementToString, type Element } from "./element.ts";
import { tailwindBlur } from "./values.ts";
import { boardToElement } from "../converters/board.ts";
import { positionToClasses } from "../converters/position.ts";
import { ellipsisToElement } from "../converters/ellipsis.ts";
import { backgroundToClasses } from "../converters/background.ts";
import { flexChildToClasses } from "../converters/flex.ts";
import { radiusToClasses } from "../converters/radius.ts";
import { shadowToClasses } from "../converters/shadow.ts";
import { gridChildToClasses } from "../converters/grid.ts";

/**
 * Convert Penpot shape into an HTML formatted string
 */
export function shapeToHTML(shape: Shape): string {
  const element = shapeToElement(shape);

  return element ? elementToString(element) : "";
}

/**
 * Convert Penpot shape into HTML element
 */
function shapeToElement(shape: Shape): Element {
  let element = { tag: "div", children: [], classes: [] } as Element;
  if (shape.type === "text") {
    element = textToElement(shape);
  } else if (shape.type === "board") {
    element = boardToElement(shape);
  } else if (shape.type === "ellipse") {
    element = ellipsisToElement(shape);
  } else if (shape.type === "group" && isSVG(shape)) {
    element.tag = "svg";
  } else if (shape.type === "path" && shape.fills[0].fillImage) {
    element.tag = "img";
    element.attrs = {
      src: `https://picsum.photos/${shape.width}/${shape.height}`,
    };
  }

  element.classes.push(...positionToClasses(shape, element.tag === "svg"));
  element.classes.push(...backgroundToClasses(shape));
  element.classes.push(...flexChildToClasses(shape));
  element.classes.push(...gridChildToClasses(shape));
  element.classes.push(...radiusToClasses(shape));
  element.classes.push(...shadowToClasses(shape));

  // Shared properties
  if (shape.blur?.value) {
    element.classes.push(tailwindBlur(shape.blur.value));
  }

  if ("children" in shape && element.tag !== "svg") {
    element.children = shape.children
      .filter((s) => s.visible)
      .map((c) => shapeToElement(c));
  }

  return element;
}

function isSVG(shape: Shape): boolean {
  if (shape.type === "svg-raw" || shape.type === "path") {
    return true;
  }
  if (!("children" in shape)) {
    return false;
  }
  const visibleChildren = shape.children.filter((s) => s.visible);
  return (
    visibleChildren.length === visibleChildren.filter((c) => isSVG(c)).length
  );
}
