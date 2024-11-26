export type Element = {
  tag?: string;
  classes: string[];
  children: (Element | string)[];
};

export function elementToString(element: Element | string): string {
  if (typeof element === "string") {
    return element;
  }
  return `<${element.tag ?? "div"} class="${element.classes.join(" ")}">
    ${element.children.map(elementToString).join("\n")}
  </${element.tag ?? "div"}>`;
}
