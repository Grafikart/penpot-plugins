import type { Board } from "@penpot/plugin-types";
import type { Element } from "../functions/element.ts";
import { flexToClasses } from "./flex.ts";

export function boardToElement(shape: Board): Element {
  const cls: string[] = [];

  if ("flex" in shape && shape.flex) {
    cls.push(...flexToClasses(shape.flex));
  }

  return {
    tag: "div",
    classes: cls,
    children: [],
  };
}
