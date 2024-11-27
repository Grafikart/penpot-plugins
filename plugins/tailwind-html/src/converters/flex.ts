import type { FlexLayout, Shape } from "@penpot/plugin-types";
import { directionalClass } from "../functions/values.ts";
import { withPrefix } from "../functions/string.ts";
import { filterStringOnly } from "../functions/array.ts";

export function flexToClasses(flex: FlexLayout): string[] {
  const cls: (string | null)[] = [];

  cls.push("flex");
  if (flex.dir !== "row") {
    cls.push("flex-" + flex.dir);
  }

  // Alignment
  cls.push(
    withPrefix("items-", flex.alignItems?.replace("space-", ""), {
      ignored: "stretch",
    }),
  );
  cls.push(
    withPrefix("justify-", flex.justifyContent?.replace("space-", ""), {
      ignored: "stretch",
    }),
  );

  // Spacing
  console.log({ flex });
  cls.push(
    ...directionalClass({
      prefix: "p",
      top: flex.topPadding,
      bottom: flex.bottomPadding,
      left: flex.leftPadding,
      right: flex.rightPadding,
    }),
  );
  cls.push(
    ...directionalClass({
      prefix: "gap",
      top: flex.rowGap,
      bottom: flex.rowGap,
      left: flex.columnGap,
      right: flex.columnGap,
    }),
  );

  return filterStringOnly(cls);
}

/**
 * Handle classes for flex layout children
 */
export function flexChildToClasses(shape: Shape): string[] {
  // The shape is not a flex children
  const parent = shape.parent;
  if (!parent || !("flex" in parent) || !parent.flex || !shape.layoutChild) {
    return [];
  }

  const cls: string[] = [];

  // The element has a specific alignement
  if (
    shape.layoutChild.alignSelf !== parent.flex.alignItems &&
    shape.layoutChild.alignSelf !== "auto"
  ) {
    cls.push("self-" + shape.layoutChild.alignSelf);
  }

  return cls;
}
