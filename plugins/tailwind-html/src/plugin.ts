import type { PluginMessageEvent } from "./model";
import { shapeToHTML } from "./functions/converter";

penpot.ui.open(
  "Tailwind generator",
  `/penpot-plugins/tailwind-html/?theme=${penpot.theme}`,
  {
    width: 250,
    height: 350,
  },
);

penpot.on("themechange", (theme) => {
  sendMessage({ type: "theme", content: theme });
});

penpot.on("selectionchange", () => {
  if (!penpot.selection[0]) {
    return;
  }
  sendMessage({ type: "html", content: shapeToHTML(penpot.selection[0]) });
});

penpot.ui.onMessage((event: PluginMessageEvent) => {
  if (event.type === "ready" && penpot.selection.length > 0) {
    sendMessage({ type: "html", content: shapeToHTML(penpot.selection[0]) });
  }
});

function sendMessage(message: PluginMessageEvent) {
  penpot.ui.sendMessage(message);
}
