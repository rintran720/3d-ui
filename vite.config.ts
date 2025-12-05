import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["hls.js"],
  },
  build: {
    rollupOptions: {
      external: (id) => {
        // Don't externalize these in build, but mark as optional
        return false;
      },
    },
  },
});

