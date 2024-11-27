import type { Shape } from "@penpot/plugin-types";
import { pxToTailwind } from "../functions/values.ts";
import { objectGet } from "../functions/object.ts";

export function positionToClasses(
  shape: Shape,
  forceFixed: boolean = false,
): string[] {
  const cls: string[] = [];
  let isAbsolute = false;

  // Handle absolute positioning inside a flex or grid
  if (isShapeAbsolute(shape)) {
    isAbsolute = true;
    cls.push("absolute");
  }

  // If one child is absolute, this element should be relative
  if ("children" in shape && shape.children.find((c) => isShapeAbsolute(c))) {
    cls.push("relative");
  }

  // Compute position for absolute positioning
  if (isAbsolute) {
    if (
      shape.constraintsVertical === "top" ||
      shape.constraintsVertical === "topbottom"
    ) {
      cls.push(`top-[${Math.round(shape.parentY)}px]`);
    }
    if (
      shape.constraintsVertical === "bottom" ||
      shape.constraintsVertical === "topbottom"
    ) {
      cls.push(
        `bottom-[${Math.round(shape.parent!.height - shape.parentY - shape.height)}px]`,
      );
    }
    if (
      shape.constraintsHorizontal === "left" ||
      shape.constraintsHorizontal === "leftright"
    ) {
      cls.push(`left-[${Math.round(shape.parentX)}px]`);
    }
    if (
      shape.constraintsHorizontal === "right" ||
      shape.constraintsHorizontal === "leftright"
    ) {
      cls.push(
        `right-[${Math.round(shape.parent!.width - shape.parentX - shape.width)}px]`,
      );
    }
  }

  // Compute width / height
  cls.push(...sizeToClasses(shape, forceFixed));

  return cls;
}

function sizeToClasses(shape: Shape, forceFixed: boolean): string[] {
  const cls: string[] = [];

  // Auto-growing texts has no width / height
  if (objectGet(shape, "growType") === "auto-width") {
    return cls;
  }

  let width = "max";
  let height = "max";

  if (forceFixed || objectGet(shape, "horizontalSizing") === "fix") {
    width = pxToTailwind(shape.width);
  }

  if (forceFixed || objectGet(shape, "verticalSizing") === "fix") {
    height = pxToTailwind(shape.height);
  }

  if (shape.name === "Button") {
    console.log({ shape, forceFixed, width, height });
  }

  if (width === height) {
    cls.push(`size-${width}`);
  } else {
    cls.push(`w-${width}`);
    cls.push(`h-${height}`);
  }
  return cls;
}

function isShapeAbsolute(shape: Shape): boolean {
  return Boolean(
    ("layoutCell" in shape && shape.layoutCell?.absolute) ||
      ("layoutChild" in shape && shape.layoutChild?.absolute),
  );
}
