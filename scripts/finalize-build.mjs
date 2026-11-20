import { copyFile, writeFile } from "node:fs/promises";

await Promise.all([
  copyFile("dist/pagination.d.ts", "dist/pagination.d.cts"),
  copyFile("lib/styles.css", "dist/styles.css"),
  writeFile("dist/styles.css.d.ts", "export {};\n"),
]);
