import type { Element } from "../functions/element.ts";
import type { Ellipse } from "@penpot/plugin-types";

export function ellipsisToElement(_: Ellipse): Element {
  return {
    tag: "div",
    classes: ["rounded-[100%]"],
    children: [],
  };
}
