# best-react-pagination

[![npm](https://nodei.co/npm/best-react-pagination.png?downloads=true)](https://www.npmjs.com/package/best-react-pagination)

A controlled React pagination component with keyboard navigation, two built-in styles, and an unstyled mode.

[Open the demo in CodeSandbox](https://codesandbox.io/p/devbox/6f2gcv)

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
      setIndex={setPage}
      totalPages={24}
      isDefaultStyles
    />
  );
}
```

Use `variant="compact"` for smaller controls. The stylesheet is shared by both variants and applies only to instances with `isDefaultStyles` enabled.

You can override the CSS variables on the root element using `className`. The themes expose `--brp-control-size`, `--brp-gap`, `--brp-radius`, `--brp-text`, `--brp-muted`, `--brp-border`, `--brp-background`, `--brp-hover`, `--brp-accent`, `--brp-on-accent`, and `--brp-focus`.

## Unstyled mode

Use `isDefaultStyles={false}` or omit the flag. Apply your own CSS through `className` and the documented selectors. The component provides the navigation landmark, list, buttons and keyboard behavior.

```tsx
<Pagination
  aria-label="Search results"
  paginationStart={1}
  currentIndex={page}
  setIndex={setPage}
  totalPages={24}
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

.results-pagination button[aria-current="page"] {
  font-weight: bold;
  background: #5f3977;
  color: white;
}

.results-pagination button:focus-visible {
  outline: 2px solid #5f3977;
  outline-offset: 2px;
}
```

| Selector | Element or state |
| --- | --- |
| `[data-pagination]` | Navigation root |
| `[data-pagination-list]` | Page list |
| `[data-pagination-item="page"]` | List item around a page button |
| `[data-pagination-item="previous"]`, `[data-pagination-item="next"]` | List items around navigation buttons |
| `[data-pagination-item="ellipsis"]` | Gap between visible page numbers |
| `button[aria-current="page"]` | Current page button |
| `button[aria-disabled="true"]` | Navigation button at a boundary |

## Props

| Prop | Type | Behavior |
| --- | --- | --- |
| `paginationStart` | `0 \| 1` | Base for `currentIndex` and values passed to `setIndex`. Displayed page numbers start at 1. |
| `currentIndex` | `number` | Controlled page index. An out-of-range index is clamped for rendering without calling `setIndex`. |
| `totalPages` | `number` | Page count. The component renders nothing for zero or an invalid count. |
| `setIndex` | `React.Dispatch<React.SetStateAction<number>>` | Receives the new index when the user changes pages. |
| `isDefaultStyles` | `boolean` | Enables the built-in styles when the stylesheet is imported. Defaults to `false`. |
| `variant` | `"default" \| "compact"` | Built-in style variant. Defaults to `"default"`. |
| `aria-label` | `string` | Accessible label for the navigation landmark. Defaults to `"Pagination"`. Give each landmark a distinct label when it controls a different list. |
| `aria-labelledby` | `string` | ID of a visible heading or label for the pagination. Takes precedence over `aria-label`. |
| `labels` | `{ previous?: string, next?: string, page?: (page: number) => string }` | Localized accessible names for buttons. The formatter receives the displayed, one-based page number. Include the visible number in the name. |
| `dir` | `"ltr" \| "rtl"` | Text direction. Inherits from the surrounding page when omitted. |
| `className`, `wrapperClass` | `string` | Root class. When both are supplied, `className` takes precedence. |
| `itemListClass` | `string` | Page list class. |
| `itemClass`, `selectedItemClass`, `disableItemClass` | `string` | Classes on list items in their ordinary, current, and disabled or ellipsis states. |

React 16.8 and later are supported. The component has ESM and CommonJS entry points and is safe to render on the server. In CommonJS use `require("best-react-pagination").default`. TypeScript consumers can import `PaginationProps` from the package.

### Accessibility in your application

Tab and Shift+Tab move between controls. Enter and Space select a page. The current page is exposed through `aria-current="page"`. Unavailable arrows keep focus when a keyboard action reaches a boundary and are skipped on subsequent Tab navigation.

When changing pages replaces results in place, announce the update from the results view. For example, render a persistent `<p role="status">Page {page} of {totalPages}</p>` and update its text when the new results are ready. If a results update removes the focused page button or the entire pagination, move focus to a persistent control or a results heading with `tabIndex={-1}`.

Custom styles should keep a visible keyboard focus ring, distinguish the current page by more than color, and leave enough room for the controls to wrap with increased text size.

## Local demo

Use the Node.js version in `.nvmrc`.

```sh
npm ci
npm run dev
```
