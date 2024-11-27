export type Element = {
  tag?: string;
  classes: string[];
  children: (Element | string)[];
};

const tabspace = "&nbsp;&nbsp;";

export function elementToString(element: Element | string, space = ""): string {
  if (typeof element === "string") {
    return space + element;
  }
  let children = "";
  if (element.children.length > 0) {
    children =
      `<br/>` +
      [...element.children]
        .reverse()
        .map((e) => elementToString(e, space + tabspace))
        .join("<br/>") +
      `<br/>${space}`;
  }
  return `
    ${space}
    <span class="tag">&lt;${element.tag ?? "div"}</span>
    <span class="attr">class=</span><span class="str">"${element.classes.join(" ")}"</span><span class="tag">&gt;</span>${children}<span class="tag">&lt;/${element.tag ?? "div"}&gt;</span>
  `;
}
