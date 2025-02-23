export type Element = {
  tag?: string;
  attrs?: Record<string, string>;
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
        .map((e) => elementToString(e, space + tabspace))
        .join("<br/>") +
      `<br/>${space}`;
  }
  const selfClose = element.tag === "img";
  const html = `
    ${space}
    <span class="tag">&lt;${element.tag ?? "div"}</span>
    ${attrToString({
      ...element.attrs,
      class: element.classes.join(" "),
    })}<span class="tag">${selfClose ? "/&gt;" : "&gt;"}</span>`;
  if (selfClose) {
    return html;
  }
  return `${html}${children}<span class="tag">&lt;/${element.tag ?? "div"}&gt;</span>`;
}

export function attrToString(attrs?: Record<string, string>): string {
  if (!attrs) {
    return "";
  }
  return ` ${Object.entries(attrs)
    .map(
      ([name, value]) =>
        `<span class="attr">${name}=</span><span class="str">"${value}"</span>`,
    )
    .join(" ")}`;
}
