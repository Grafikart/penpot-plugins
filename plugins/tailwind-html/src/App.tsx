import { Wrapper } from "@libs/ui";
import { useEffect, useState } from "react";
import type { PluginMessageEvent } from "./model.ts";

export function App() {
  const [html, setHTML] = useState("");
  useEffect(() => {
    window.parent.postMessage(
      {
        type: "ready",
      } satisfies PluginMessageEvent,
      "*",
    );
    const listener = (event: MessageEvent<PluginMessageEvent>) => {
      console.log({ data: event.data });
      if (event.data.type === "html") {
        setHTML(event.data.content);
      }
    };
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);
  return (
    <Wrapper>
      <pre style={{ fontFamily: "monospace" }} className="body-s">
        {html}
      </pre>
    </Wrapper>
  );
}
