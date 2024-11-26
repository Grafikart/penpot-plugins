import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { stylePlugin } from "@libs/styles/plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), stylePlugin()],
  base: "/penpot-plugins/tailwind-html/",
  optimizeDeps: {
    include: ["tailwindcs/colors"],
  },
  build: {
    outDir: "../../dist/tailwind-html",
    rollupOptions: {
      external: ["_commonjsHelpers"],
      input: {
        plugin: "src/plugin.ts",
      },
      output: {
        manualChunks: {},
        entryFileNames: "[name].js",
      },
    },
  },
  preview: {
    port: 5173,
  },
});
