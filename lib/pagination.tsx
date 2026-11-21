import React from "react";

export type PaginationBehavior = "default" | "separate" | "between";

export interface PaginationRangeOptions {
  paginationStart: 0 | 1;
  currentIndex: number;
  totalPages: number;
  siblingCount?: number;
  boundaryCount?: number;
  behavior?: PaginationBehavior;
}

interface PaginationOptions extends PaginationRangeOptions {
  isDefaultStyles?: boolean;
  variant?: "default" | "compact";
  wrapperClass?: string;
  itemListClass?: string;
  itemClass?: string;
  selectedItemClass?: string;
  disableItemClass?: string;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  dir?: "ltr" | "rtl";
  labels?: {
    previous?: string;
    next?: string;
    page?: (page: number) => string;
  };
}

type SetIndex = React.Dispatch<React.SetStateAction<number>>;
type PageChange = (index: number) => void;

export interface PaginationProps extends PaginationOptions {
  setIndex: SetIndex;
  onPageChange?: PageChange;
  getPageHref?: never;
}

export type PaginationComponentProps = PaginationProps | (PaginationOptions & (
  | { onPageChange: PageChange; setIndex?: SetIndex; getPageHref?: never }
  | { getPageHref: (index: number) => string; onPageChange?: never; setIndex?: never }
));

export type PaginationItem =
  | { type: "previous"; index: number | null }
  | { type: "next"; index: number | null }
  | { type: "page"; index: number; page: number; current: boolean }
  | { type: "ellipsis"; side: "start" | "end" };

function visibleCount(value: number) {
  return Number.isSafeInteger(value) ? Math.min(Math.max(value, 0), 50) : 1;
}

function getWindowStart(currentPage: number, innerStart: number, lastStart: number, siblings: number, windowSize: number) {
  const atStart = currentPage < innerStart + windowSize - 1;
  const atEnd = currentPage > lastStart;

  if (atStart || atEnd) {
    const nearerStart = currentPage - innerStart <= lastStart + windowSize - 1 - currentPage;
    return atStart && (!atEnd || nearerStart) ? innerStart : lastStart;
  }

  // Leave room for ellipses where possible while keeping the selected page in the window.
  const gapSize = Math.min(2, Math.floor((lastStart - innerStart) / 2));
  const preferred = Math.min(Math.max(currentPage - siblings, innerStart + gapSize), lastStart - gapSize);
  return Math.min(Math.max(preferred, currentPage - windowSize + 1), currentPage);
}

export function getPaginationItems({
  paginationStart,
  currentIndex,
  totalPages,
  siblingCount = 1,
  boundaryCount = 1,
  behavior = "between",
}: PaginationRangeOptions): PaginationItem[] {
  if (!Number.isSafeInteger(totalPages) || totalPages < 1) {
    return [];
  }

  const index = Number.isSafeInteger(currentIndex) ? currentIndex : paginationStart;
  const current = Math.min(Math.max(index, paginationStart), totalPages - 1 + paginationStart);
  const currentPage = current - paginationStart + 1;
  const siblings = visibleCount(siblingCount);
  const boundaries = visibleCount(boundaryCount);
  const windowSize = siblings * 2 + 1;
  const keepPageCount = behavior === "separate" || behavior === "between";
  const items: PaginationItem[] = [{ type: "previous", index: currentPage > 1 ? current - 1 : null }];

  const addPages = (start: number, end: number) => {
    for (let page = start; page <= end; page++) {
      items.push({ type: "page", index: page - 1 + paginationStart, page, current: page === currentPage });
    }
  };

  const addGap = (start: number, end: number, side: "start" | "end") => {
    if (start === end && !keepPageCount) {
      addPages(start, end);
    } else if (start <= end) {
      items.push({ type: "ellipsis", side });
    }
  };

  if (totalPages <= boundaries * 2 + windowSize + 2) {
    addPages(1, totalPages);
  } else {
    const innerStart = boundaries + 1;
    const innerEnd = totalPages - boundaries;
    const lastStart = innerEnd - windowSize + 1;
    const first = keepPageCount
      ? getWindowStart(currentPage, innerStart, lastStart, siblings, windowSize)
      : Math.min(Math.max(currentPage - siblings, innerStart), lastStart);
    const last = first + (windowSize - 1);

    addPages(1, boundaries);
    addGap(innerStart, first - 1, "start");
    addPages(first, last);
    addGap(last + 1, innerEnd, "end");
    addPages(innerEnd + 1, totalPages);
  }

  items.push({ type: "next", index: currentPage < totalPages ? current + 1 : null });
  return items;
}

export default function Pagination({
  paginationStart,
  currentIndex,
  totalPages,
  siblingCount,
  boundaryCount,
  behavior = "between",
  setIndex,
  onPageChange,
  getPageHref,
  isDefaultStyles = false,
  variant = "default",
  wrapperClass,
  itemListClass,
  itemClass,
  selectedItemClass,
  disableItemClass,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  dir,
  labels,
}: PaginationComponentProps): React.ReactElement<unknown> | null {
  const items = getPaginationItems({ paginationStart, currentIndex, totalPages, siblingCount, boundaryCount, behavior });
  if (items.length === 0) {
    return null;
  }

  const labelledBy = ariaLabelledBy?.trim() || undefined;
  const changePage = onPageChange ?? setIndex;
  const between = behavior === "between";
  const ellipsisCount = between ? items.filter((item) => item.type === "ellipsis").length : 0;
  const layoutStyle = isDefaultStyles && ellipsisCount > 0 ? {
    "--_brp-controls": items.length - ellipsisCount,
    "--_brp-page-digits": String(totalPages).length,
  } as React.CSSProperties : undefined;

  const renderControl = (index: number | null, label: string, content: React.ReactNode, current = false) => {
    const disabled = index === null;
    const props = {
      "aria-label": label,
      "aria-current": current ? "page" as const : undefined,
      "aria-disabled": disabled || undefined,
      // A boundary control can keep focus after keyboard activation.
      tabIndex: disabled ? -1 : undefined,
      "data-pagination-control": "",
    };

    if (getPageHref) {
      return <a {...props} role={disabled ? "link" : undefined} href={disabled ? undefined : getPageHref(index)}>{content}</a>;
    }

    return (
      <button
        type="button"
        {...props}
        onClick={() => {
          if (index !== null && index !== currentIndex) changePage?.(index);
        }}
      >
        {content}
      </button>
    );
  };

  return (
    <nav
      aria-label={ariaLabel?.trim() || "Pagination"}
      aria-labelledby={labelledBy}
      dir={dir}
      className={className || wrapperClass}
      data-pagination=""
      data-pagination-variant={isDefaultStyles ? variant : undefined}
      data-pagination-behavior={between || behavior === "separate" ? behavior : undefined}
    >
      <ul
        className={itemListClass}
        role="list"
        data-pagination-list=""
        data-pagination-ellipsis-count={ellipsisCount || undefined}
        style={layoutStyle}
      >
        {items.map((item, index) => {
          if (item.type === "ellipsis") {
            if (between) return null;
            return (
              <li key={item.side} className={disableItemClass} data-pagination-item="ellipsis" aria-hidden="true">
                …
              </li>
            );
          }

          const isPage = item.type === "page";
          const current = isPage && item.current;
          const previous = item.type === "previous";
          const label = isPage
            ? labels?.page?.(item.page)?.trim() || `Page ${item.page}`
            : previous ? labels?.previous?.trim() || "Previous page" : labels?.next?.trim() || "Next page";
          const content = isPage ? item.page : <span aria-hidden="true">{previous ? "‹" : "›"}</span>;
          const control = renderControl(item.index, label, content, current);
          const gapBefore = between && items[index - 1]?.type === "ellipsis";
          const itemClasses = current ? selectedItemClass : item.index === null ? disableItemClass : itemClass;

          return (
            <li
              key={isPage ? item.page : item.type}
              className={itemClasses}
              data-pagination-item={item.type}
              data-pagination-gap-before={gapBefore ? "" : undefined}
            >
              {gapBefore ? <><span className={disableItemClass} data-pagination-gap="" aria-hidden="true">…</span>{control}</> : control}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
