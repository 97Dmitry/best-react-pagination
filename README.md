# best-react-pagination

[![npm](https://nodei.co/npm/best-react-pagination.png?downloads=true)](https://www.npmjs.com/package/best-react-pagination)

A controlled React pagination component with accessible buttons or links, two built-in styles, and an unstyled mode.

[Open the interactive demo](https://97dmitry.github.io/best-react-pagination/)

```sh
npm install best-react-pagination
```

## Built-in styles

```tsx
import { useState } from "react";
import Pagination from "best-react-pagination";
import "best-react-pagination/styles.css";

export function ResultsPagination() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      aria-label="Search results"
      paginationStart={1}
      currentIndex={page}
      onPageChange={setPage}
      totalPages={24}
      isDefaultStyles
    />
  );
}
```

Use `variant="compact"` for smaller controls. The stylesheet is shared by both variants and applies only to instances with `isDefaultStyles` enabled.

You can override the CSS variables on the root element using `className`. The themes expose `--brp-control-size`, `--brp-gap`, `--brp-radius`, `--brp-text`, `--brp-muted`, `--brp-border`, `--brp-background`, `--brp-hover`, `--brp-accent`, `--brp-on-accent`, and `--brp-focus`.

## Range behavior

`behavior` controls the page range independently of `variant`, which controls the theme.

- `"between"` is used when `behavior` is omitted. It keeps the number of numbered controls steady and places ellipses between them. With built-in styles, the arrows stay in place when the controls fit in one row. With custom styles, use the gap selectors below to lay out the ellipses.
- `"default"` fills single-page gaps with the page number.
- `"separate"` keeps the number of numbered controls steady as the range moves. Each ellipsis occupies its own list item.

```tsx
<Pagination
  paginationStart={1}
  currentIndex={page}
  totalPages={24}
  onPageChange={setPage}
  behavior="between"
  variant="compact"
  isDefaultStyles
/>
```

## Links and URL state

Use `getPageHref` when each page has its own URL. Read the current page from your route and pass it as `currentIndex`. The links support opening a page in a new tab and native browser history.

```tsx
<Pagination
  aria-label="Component catalogue"
  paginationStart={1}
  currentIndex={pageFromUrl}
  totalPages={totalPages}
  getPageHref={(index) => `?page=${index}`}
  siblingCount={0}
  isDefaultStyles
/>
```

Use `onPageChange` or `setIndex` in button mode. An `onPageChange` handler can update the controlled index and start work such as loading results. `getPageHref` uses native navigation and takes the place of those callbacks in link mode. Both modes support the same built-in styles and range options.

The demo catalogue fetches a local JSON dataset and uses the page in the URL to select the results it displays.

## Unstyled mode

Use `isDefaultStyles={false}` or omit the flag. Apply your own CSS through `className` and the documented selectors. The component provides the navigation landmark, list, buttons and keyboard behavior.

```tsx
<Pagination
  aria-label="Search results"
  paginationStart={1}
  currentIndex={page}
  onPageChange={setPage}
  totalPages={24}
  behavior="separate"
  className="results-pagination"
  isDefaultStyles={false}
/>
```

```css
.results-pagination [data-pagination-list] {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.results-pagination [data-pagination-control][aria-current="page"] {
  font-weight: bold;
  background: #5f3977;
  color: white;
}

.results-pagination [data-pagination-control]:focus-visible {
  outline: 2px solid #5f3977;
  outline-offset: 2px;
}
```

| Selector | Element or state |
| --- | --- |
| `[data-pagination]` | Navigation root |
| `[data-pagination-list]` | Page list |
| `[data-pagination-item="page"]` | List item around a page control |
| `[data-pagination-item="previous"]`, `[data-pagination-item="next"]` | List items around navigation controls |
| `[data-pagination-item="ellipsis"]` | Gap representing omitted pages |
| `[data-pagination-gap-before]` and `[data-pagination-gap]` | Control wrapper and decorative ellipsis when using `behavior="between"` |
| `[data-pagination-control]` | Button or link inside a pagination item |
| `[data-pagination-control][aria-current="page"]` | Current page |
| `[data-pagination-control][aria-disabled="true"]` | Navigation control at a boundary |

## Custom markup

Use the named export `getPaginationItems` to render the same page range with your own components. It accepts the same `behavior` values as the component.

```ts
import { getPaginationItems } from "best-react-pagination";

const items = getPaginationItems({
  paginationStart: 1,
  currentIndex: 7,
  totalPages: 24,
  siblingCount: 2,
  boundaryCount: 1,
});
```

- `previous` and `next` items have an `index` for their destination. An `index` of `null` means the control is unavailable.
- `page` items have an `index` in the selected base, a one-based display `page`, and a boolean `current`.
- `ellipsis` items have a `side` of `start` or `end`.

Mark the current page with `aria-current="page"`, give controls accessible names, and keep keyboard focus visible in your markup.

## Props

| Prop | Type | Behavior |
| --- | --- | --- |
| `paginationStart` | `0 \| 1` | Index base for `currentIndex` and all callbacks. Displayed page numbers and the page label formatter are one-based. |
| `currentIndex` | `number` | Controlled page index. An out-of-range index is clamped for rendering without calling the change handler. |
| `totalPages` | `number` | Page count. The component renders nothing for zero or an invalid count. |
| `onPageChange` | `(index: number) => void` | Receives the requested index when the user activates a button and the index differs from `currentIndex`. It takes precedence over `setIndex` if both are supplied. |
| `setIndex` | `React.Dispatch<React.SetStateAction<number>>` | Existing React setter prop. It remains supported in button mode when `onPageChange` is omitted. |
| `getPageHref` | `(index: number) => string` | Enables link mode and returns the destination for each available page control. |
| `siblingCount` | `number` | Number of neighboring pages on each side of the current page. Defaults to `1`. |
| `boundaryCount` | `number` | Number of pages kept visible at each end of the range. Defaults to `1`. |
| `behavior` | `PaginationBehavior` | Page range and ellipsis layout. Accepts `"between"`, `"default"`, or `"separate"`. Falls back to `"between"` when omitted. |
| `isDefaultStyles` | `boolean` | Enables the built-in styles when the stylesheet is imported. Defaults to `false`. |
| `variant` | `"default" \| "compact"` | Built-in style variant. Defaults to `"default"`. |
| `aria-label` | `string` | Accessible label for the navigation landmark. Defaults to `"Pagination"`. Give each landmark a distinct label when it controls a different list. |
| `aria-labelledby` | `string` | ID of a visible heading or label for the pagination. Takes precedence over `aria-label`. |
| `labels` | `{ previous?: string, next?: string, page?: (page: number) => string }` | Localized accessible names for controls. The formatter receives the displayed, one-based page number. Include the visible number in the name. |
| `dir` | `"ltr" \| "rtl"` | Text direction. Inherits from the surrounding page when omitted. |
| `className`, `wrapperClass` | `string` | Root class. When both are supplied, `className` takes precedence. |
| `itemListClass` | `string` | Page list class. |
| `itemClass`, `selectedItemClass`, `disableItemClass` | `string` | Classes on list items in their ordinary, current, and disabled or ellipsis states. |

Both range counts accept safe integers clamped to `0`–`50`. Other values use the defaults. The window shifts near the ends of the range.

React 16.8 and later are supported. The component has ESM and CommonJS entry points and is safe to render on the server. In CommonJS use `require("best-react-pagination").default`. TypeScript consumers can import `PaginationComponentProps` for all modes. The existing `PaginationProps` interface covers the `setIndex` form. `PaginationRangeOptions` and `PaginationItem` describe the headless API.

### Accessibility in your application

Tab and Shift+Tab move between controls. Enter activates links, and Enter or Space activates buttons. The current page is exposed through `aria-current="page"`. Unavailable arrows are skipped during Tab navigation. In button mode an arrow can keep focus when a keyboard action reaches the boundary.

When changing pages replaces results in place, announce the update from the results view. For example, render a persistent `<p role="status">Page {page} of {totalPages}</p>` and update its text when the new results are ready. If a results update removes the focused page button or the entire pagination, move focus to a persistent control or a results heading with `tabIndex={-1}`.

Custom styles should keep a visible keyboard focus ring, distinguish the current page by more than color, and leave enough room for the controls to wrap with increased text size.

## Local demo

Use the Node.js version in `.nvmrc`.

```sh
npm ci
npm run dev
```
