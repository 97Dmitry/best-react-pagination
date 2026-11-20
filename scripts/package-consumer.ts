import Pagination, {
  getPaginationItems,
  type PaginationComponentProps,
  type PaginationItem,
  type PaginationProps,
} from "best-react-pagination";
import "best-react-pagination/styles.css";
import { createElement } from "react";

interface LegacyProps extends PaginationProps {
  className: string;
}

const props: LegacyProps = {
  paginationStart: 0,
  currentIndex: 0,
  totalPages: 4,
  setIndex() {},
  className: "pagination",
  isDefaultStyles: true,
  variant: "compact",
};

createElement(Pagination, props);

const range = { paginationStart: 1, totalPages: 10, currentIndex: 2 } as const;
const items: PaginationItem[] = getPaginationItems({ ...range, siblingCount: 0, boundaryCount: 2 });

const links: PaginationComponentProps = { ...range, getPageHref: (index) => `?page=${index}` };
const buttons: PaginationComponentProps = { ...range, onPageChange: (index) => index.toFixed() };
createElement(Pagination, links);
createElement(Pagination, buttons);
void items;
