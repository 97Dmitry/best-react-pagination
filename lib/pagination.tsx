import React from "react";

export interface PaginationRangeOptions {
  paginationStart: 0 | 1;
  currentIndex: number;
  totalPages: number;
  siblingCount?: number;
  boundaryCount?: number;
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

export function getPaginationItems({
  paginationStart,
  currentIndex,
  totalPages,
  siblingCount = 1,
  boundaryCount = 1,
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
  const items: PaginationItem[] = [{ type: "previous", index: currentPage > 1 ? current - 1 : null }];

  const addPages = (start: number, end: number) => {
    for (let page = start; page <= end; page++) {
      items.push({ type: "page", index: page - 1 + paginationStart, page, current: page === currentPage });
    }
  };

  const addGap = (start: number, end: number, side: "start" | "end") => {
    if (start === end) {
      addPages(start, end);
    } else if (start < end) {
      items.push({ type: "ellipsis", side });
    }
  };

  if (totalPages <= boundaries * 2 + windowSize + 2) {
    addPages(1, totalPages);
  } else {
    const innerStart = boundaries + 1;
    const innerEnd = totalPages - boundaries;
    const first = Math.min(Math.max(currentPage - siblings, innerStart), innerEnd - windowSize + 1);
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
  const items = getPaginationItems({ paginationStart, currentIndex, totalPages, siblingCount, boundaryCount });
  if (items.length === 0) {
    return null;
  }

  const labelledBy = ariaLabelledBy?.trim() || undefined;
  const changePage = onPageChange ?? setIndex;

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
    >
      <ul className={itemListClass} role="list" data-pagination-list="">
        {items.map((item) => {
          if (item.type === "ellipsis") {
            return (
              <li key={item.side} className={disableItemClass} data-pagination-item="ellipsis" aria-hidden="true">
                …
              </li>
            );
          }

          if (item.type === "page") {
            const { page, current } = item;
            return (
              <li key={page} className={current ? selectedItemClass : itemClass} data-pagination-item="page">
                {renderControl(item.index, labels?.page?.(page)?.trim() || `Page ${page}`, page, current)}
              </li>
            );
          }

          const previous = item.type === "previous";
          const label = previous ? labels?.previous?.trim() || "Previous page" : labels?.next?.trim() || "Next page";
          return (
            <li key={item.type} className={item.index === null ? disableItemClass : itemClass} data-pagination-item={item.type}>
              {renderControl(item.index, label, <span aria-hidden="true">{previous ? "‹" : "›"}</span>)}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
