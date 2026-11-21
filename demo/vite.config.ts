import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  input: {
    main: resolve(import.meta.dirname, "index.html"),
    variants: resolve(import.meta.dirname, "variants.html"),
  },
});
