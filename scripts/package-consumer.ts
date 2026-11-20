import Pagination, { type PaginationProps } from "best-react-pagination";
import "best-react-pagination/styles.css";
import { createElement } from "react";

const props: PaginationProps = {
  paginationStart: 0,
  currentIndex: 0,
  totalPages: 4,
  setIndex() {},
  isDefaultStyles: true,
  variant: "compact",
};

createElement(Pagination, props);
