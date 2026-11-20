import { execFileSync } from "node:child_process";
import { copyFile, mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const npm = process.env.npm_execpath;
const tsc = fileURLToPath(new URL("../node_modules/typescript/bin/tsc", import.meta.url));
const typecheckFixture = new URL("./package-consumer.ts", import.meta.url);
const reactVersions = process.argv.slice(2);

if (!npm) {
  throw new Error("Run this check with npm run test:pack.");
}

const scratch = await mkdtemp(join(tmpdir(), "best-react-pagination-"));

function run(args, cwd = process.cwd()) {
  execFileSync(process.execPath, args, { cwd, stdio: "inherit" });
}

try {
  run([npm, "pack", "--pack-destination", scratch]);
  const [tarball] = await readdir(scratch);

  for (const version of reactVersions.length ? reactVersions : ["16.8.0", "17", "18", "19"]) {
    const major = version.split(".")[0];
    const typesVersion = version === "16.8.0" ? version : major;
    const consumer = await mkdtemp(join(scratch, "consumer-"));
    await writeFile(join(consumer, "package.json"), '{"private":true}\n');
    run([
      npm, "install", "--ignore-scripts", "--no-audit", "--no-fund",
      join(scratch, tarball),
      `react@${version}`, `react-dom@${version}`, `@types/react@${typesVersion}`, `@types/react-dom@${typesVersion}`,
    ], consumer);

    await Promise.all([
      copyFile(typecheckFixture, join(consumer, "consumer.mts")),
      copyFile(typecheckFixture, join(consumer, "consumer.cts")),
    ]);
    run([
      tsc, "--ignoreConfig", "--noEmit", "--strict", "--noUncheckedSideEffectImports",
      "--module", "NodeNext", "consumer.mts", "consumer.cts",
    ], consumer);

    run(["--input-type=module", "-e", `
      import assert from "node:assert/strict";
      import { readFileSync } from "node:fs";
      import { createRequire } from "node:module";
      import React from "react";
      import Pagination from "best-react-pagination";

      const require = createRequire(import.meta.url);
      const { renderToStaticMarkup } = require("react-dom/server");
      for (const Component of [Pagination, require("best-react-pagination").default]) {
        const markup = renderToStaticMarkup(React.createElement(Component, {
          paginationStart: 0, currentIndex: 0, totalPages: 4, setIndex() {},
          isDefaultStyles: true, variant: "compact",
        }));
        assert.match(markup, /aria-current="page"/);
        assert.match(markup, /data-pagination-variant="compact"/);
      }
      const stylesheet = readFileSync(require.resolve("best-react-pagination/styles.css"), "utf8");
      assert.match(stylesheet, /data-pagination-variant/);
      console.log("Verified packed runtime, CSS and declarations on React " + React.version);
    `], consumer);
  }
} finally {
  await rm(scratch, { recursive: true, force: true });
}
