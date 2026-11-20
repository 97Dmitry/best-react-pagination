import React from "react";

export interface PaginationProps {
  paginationStart: 0 | 1;
  currentIndex: number;
  totalPages: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
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

function visiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const firstVisible = Math.min(Math.max(currentPage - 1, 2), totalPages - 3);
  const lastVisible = Math.max(Math.min(currentPage + 1, totalPages - 1), 4);
  const pages: (number | "start-gap" | "end-gap")[] = [1];

  if (firstVisible > 2) {
    pages.push(firstVisible === 3 ? 2 : "start-gap");
  }
  for (let page = firstVisible; page <= lastVisible; page++) {
    pages.push(page);
  }
  if (lastVisible < totalPages - 1) {
    pages.push(lastVisible === totalPages - 2 ? totalPages - 1 : "end-gap");
  }

  pages.push(totalPages);
  return pages;
}

export default function Pagination({
  paginationStart,
  currentIndex,
  totalPages,
  setIndex,
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
}: PaginationProps): React.ReactElement<unknown> | null {
  if (!Number.isSafeInteger(totalPages) || totalPages < 1) {
    return null;
  }

  const index = Number.isSafeInteger(currentIndex) ? currentIndex : paginationStart;
  const currentPage = Math.min(Math.max(index - paginationStart + 1, 1), totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const labelledBy = ariaLabelledBy?.trim() || undefined;

  const changePage = (page: number) => {
    const nextIndex = page - 1 + paginationStart;
    if (page >= 1 && page <= totalPages && nextIndex !== currentIndex) {
      setIndex(nextIndex);
    }
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
        {/* A boundary arrow can keep focus after keyboard activation. */}
        <li className={isFirstPage ? disableItemClass : itemClass} data-pagination-item="previous">
          <button
            type="button"
            aria-label={labels?.previous?.trim() || "Previous page"}
            aria-disabled={isFirstPage || undefined}
            tabIndex={isFirstPage ? -1 : undefined}
            onClick={() => changePage(currentPage - 1)}
          >
            <span aria-hidden="true">‹</span>
          </button>
        </li>
        {visiblePages(currentPage, totalPages).map((page) => {
          if (typeof page !== "number") {
            return (
              <li key={page} className={disableItemClass} data-pagination-item="ellipsis" aria-hidden="true">
                …
              </li>
            );
          }

          const isCurrent = page === currentPage;
          return (
            <li key={page} className={isCurrent ? selectedItemClass : itemClass} data-pagination-item="page">
              <button
                type="button"
                aria-label={labels?.page?.(page)?.trim() || `Page ${page}`}
                aria-current={isCurrent ? "page" : undefined}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className={isLastPage ? disableItemClass : itemClass} data-pagination-item="next">
          <button
            type="button"
            aria-label={labels?.next?.trim() || "Next page"}
            aria-disabled={isLastPage || undefined}
            tabIndex={isLastPage ? -1 : undefined}
            onClick={() => changePage(currentPage + 1)}
          >
            <span aria-hidden="true">›</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
