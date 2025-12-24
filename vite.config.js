import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
  ],

  define: {
    "process.env.NODE_ENV": '"production"',
    process: {
      env: {},
    },
  },

  build: {
    lib: {
      entry: "src/main.jsx",
      name: "LayoutBuilderWidget",
      formats: ["iife"],
      fileName: () => "layout-builder-widget.js",
    },
  },
});
