import assert from "node:assert/strict";
import { test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Pagination, * as pagination from "best-react-pagination";

function render(props = {}) {
  return renderToStaticMarkup(React.createElement(Pagination, {
    paginationStart: 1,
    currentIndex: 1,
    totalPages: 10,
    setIndex() {},
    ...props,
  }));
}

function pageNumbers(html) {
  return [...html.matchAll(/<button[^>]*>(\d+)<\/button>/g)].map(([, page]) => Number(page));
}

test("an empty result has no pagination and a single page has disabled arrows", () => {
  assert.equal(render({ totalPages: 0 }), "");
  const single = render({ totalPages: 1 });
  assert.deepEqual(pageNumbers(single), [1]);
  assert.equal((single.match(/<button[^>]*aria-disabled="true"[^>]*tabindex="-1"/g) ?? []).length, 2);
  assert.match(single, /aria-current="page"[^>]*>1<\/button>/);
});

test("both index bases select the same visible page and emit indices in their own base", () => {
  for (const paginationStart of [0, 1]) {
    const currentIndex = paginationStart + 4;
    const changes = [];
    const props = { paginationStart, currentIndex, totalPages: 10, setIndex: (index) => changes.push(index) };

    assert.match(render(props), /aria-current="page"[^>]*>5<\/button>/);
    const items = Pagination(props).props.children.props.children;
    items.flat().forEach(({ props: { children: control } }) => {
      if (control.type === "button") {
        control.props.onClick();
      }
    });
    assert.deepEqual(changes, [currentIndex - 1, paginationStart, currentIndex - 1, currentIndex + 1, paginationStart + 9, currentIndex + 1]);
  }
});

test("small ranges show every page and styling classes match their states", () => {
  const markup = render({ totalPages: 4, currentIndex: 2, itemClass: "ordinary", selectedItemClass: "active" });
  assert.deepEqual(pageNumbers(markup), [1, 2, 3, 4]);
  assert.match(markup, /class="ordinary"[^>]*><button[^>]*>1<\/button>/);
  assert.match(markup, /class="active"[^>]*><button[^>]*aria-current="page"[^>]*>2<\/button>/);
});

test("large ranges have a bounded window with no ellipsis for a single missing page", () => {
  assert.deepEqual(pageNumbers(render({ currentIndex: 4 })), [1, 2, 3, 4, 5, 10]);
  assert.deepEqual(pageNumbers(render({ currentIndex: 5, totalPages: 1_000_000 })), [1, 4, 5, 6, 1_000_000]);
  assert.deepEqual(pageNumbers(render({ currentIndex: 10 })), [1, 7, 8, 9, 10]);
});

test("shrinking the page count selects the last remaining page without firing a change", () => {
  const markup = render({
    currentIndex: 9,
    totalPages: 3,
    setIndex() { assert.fail("rendering must not change the controlled index"); },
  });
  assert.match(markup, /aria-current="page"[^>]*>3<\/button>/);
  assert.match(markup, /aria-label="Next page"[^>]*aria-disabled="true"/);
});

test("selecting the clamped page corrects an out-of-range controlled index", () => {
  for (const paginationStart of [0, 1]) {
    const changes = [];
    const props = {
      paginationStart,
      currentIndex: 9,
      totalPages: 1,
      setIndex: (index) => changes.push(index),
    };
    const page = Pagination(props).props.children.props.children.flat()
      .find((item) => item.props["data-pagination-item"] === "page");

    assert.deepEqual(changes, []);
    page.props.children.props.onClick();
    assert.deepEqual(changes, [paginationStart]);
  }
});

test("unstyled markup exposes every CSS hook and applies no built-in presentation", () => {
  const markup = render({ isDefaultStyles: false, variant: "compact", "aria-label": "Results" });
  assert.match(markup, /<nav aria-label="Results"/);
  assert.match(markup, /\bdata-pagination=""/);
  assert.match(markup, /\bdata-pagination-list=""/);
  for (const item of ["previous", "page", "ellipsis", "next"]) {
    assert.ok(markup.includes(`data-pagination-item="${item}"`));
  }
  assert.doesNotMatch(markup, /\b(?:data-pagination-variant|style)=/);
});

test("built-in variants opt into scoped styles without inline declarations", () => {
  assert.match(render({ isDefaultStyles: true }), /data-pagination-variant="default"/);
  const compact = render({ isDefaultStyles: true, variant: "compact" });
  assert.match(compact, /data-pagination-variant="compact"/);
  assert.doesNotMatch(compact, /\bstyle=/);
  assert.doesNotMatch(render(), /\bdata-pagination-variant=/);
});

test("accessible names can be localized and landmarks can reference a heading", () => {
  const markup = render({
    "aria-labelledby": "results-heading",
    dir: "rtl",
    labels: {
      previous: "الصفحة السابقة",
      next: "الصفحة التالية",
      page: (page) => `صفحة ${page}`,
    },
  });
  assert.match(markup, /<nav[^>]*aria-labelledby="results-heading"[^>]*dir="rtl"/);
  assert.match(markup, /<nav[^>]*aria-label="Pagination"/);
  assert.match(markup, /<ul[^>]*role="list"/);
  assert.match(markup, /aria-label="الصفحة السابقة"/);
  assert.match(markup, /aria-label="الصفحة التالية"/);
  assert.match(markup, /aria-label="صفحة 1"[^>]*aria-current="page"[^>]*>1<\/button>/);
  assert.match(render(), /aria-label="Page 1"/);
});

test("blank localized labels retain accessible defaults", () => {
  const markup = render({
    "aria-label": " ",
    labels: { previous: "", next: " ", page: () => "" },
  });
  for (const label of ["Pagination", "Previous page", "Next page", "Page 1"]) {
    assert.ok(markup.includes(`aria-label="${label}"`));
  }
});

test("onPageChange receives the next index and takes precedence over the legacy setter", () => {
  for (const paginationStart of [0, 1]) {
    const changes = [];
    const props = {
      paginationStart,
      currentIndex: paginationStart,
      totalPages: 4,
      onPageChange: (index) => changes.push(index),
      setIndex() { assert.fail("Only one handler should run"); },
    };

    const controls = Pagination(props).props.children.props.children.flat().map((item) => item.props.children);
    controls.find((control) => control.props["aria-current"] === "page").props.onClick();
    controls.at(-1).props.onClick();
    assert.deepEqual(changes, [paginationStart + 1]);
  }
});

test("link mode renders real destinations in the configured index base and disables boundary links", () => {
  const markup = render({
    paginationStart: 0,
    currentIndex: 0,
    totalPages: 3,
    setIndex: undefined,
    getPageHref: (index) => `?page=${index}`,
  });

  assert.doesNotMatch(markup, /<button/);
  assert.match(markup, /<a\b(?=[^>]*href="\?page=0")(?=[^>]*aria-current="page")[^>]*>1<\/a>/);
  assert.match(markup, /<a\b(?=[^>]*href="\?page=1")(?=[^>]*aria-label="Next page")[^>]*>/);
  const previous = markup.match(/<a\b(?=[^>]*aria-label="Previous page")[^>]*>/)?.[0];
  assert.match(previous ?? "", /aria-disabled="true"/);
  assert.doesNotMatch(previous, /\bhref=/);
});

test("visible pages honor sibling and boundary counts", () => {
  const markup = render({ totalPages: 12, currentIndex: 6, siblingCount: 2, boundaryCount: 2 });
  assert.deepEqual(pageNumbers(markup), [1, 2, 3, 4, 5, 6, 7, 8, 11, 12]);
  assert.equal((markup.match(/data-pagination-item="ellipsis"/g) ?? []).length, 1);
});

test("the headless items expose page indices, gaps and disabled boundaries", () => {
  assert.equal(typeof pagination.getPaginationItems, "function");
  const getItems = pagination.getPaginationItems;

  assert.deepEqual(getItems({ currentIndex: 0, totalPages: 0, paginationStart: 0 }), []);
  assert.deepEqual(getItems({ currentIndex: 9, totalPages: 1, paginationStart: 0 }), [
    { type: "previous", index: null },
    { type: "page", index: 0, page: 1, current: true },
    { type: "next", index: null },
  ]);
  assert.deepEqual(getItems({ currentIndex: 4, totalPages: 10, paginationStart: 0, siblingCount: 0, boundaryCount: 0 }), [
    { type: "previous", index: 3 },
    { type: "ellipsis", side: "start" },
    { type: "page", index: 4, page: 5, current: true },
    { type: "ellipsis", side: "end" },
    { type: "next", index: 5 },
  ]);

  const totalPages = Number.MAX_SAFE_INTEGER;
  const items = getItems({
    currentIndex: totalPages,
    totalPages,
    paginationStart: 1,
    siblingCount: totalPages,
    boundaryCount: totalPages,
  });
  assert.ok(items.length <= 205);
  assert.deepEqual(items.at(-2), { type: "page", index: totalPages, page: totalPages, current: true });
});
