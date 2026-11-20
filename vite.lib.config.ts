import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2018",
    lib: {
      entry: "lib/pagination.tsx",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "pagination.js" : "pagination.cjs"),
    },
    rolldownOptions: {
      external: ["react"],
      output: { exports: "named" },
    },
  },
});
