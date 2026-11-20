import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";
import React from "react";

const require = createRequire(import.meta.url);
const { renderToStaticMarkup } = require("react-dom/server");

test("the CommonJS entry renders in Node without browser globals", () => {
  const { default: Pagination, getPaginationItems } = require("..");
  const markup = renderToStaticMarkup(React.createElement(Pagination, {
    paginationStart: 1,
    currentIndex: 1,
    totalPages: 10,
    setIndex() {},
  }));

  assert.match(markup, />10</);
  assert.equal(getPaginationItems({ paginationStart: 1, currentIndex: 1, totalPages: 10 })[0].type, "previous");
});

test("the ESM entry exports a component as the default import", async () => {
  const { default: Pagination } = await import("best-react-pagination");
  assert.equal(typeof Pagination, "function");
});
