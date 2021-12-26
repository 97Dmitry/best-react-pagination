import React, { FC } from "react";
interface PaginationProps {
    paginationStart: 0 | 1;
    currentIndex: number;
    totalPages: number;
    setIndex: (newIndex: number) => void;
    isDefaultStyles?: boolean;
    wrapperClass?: string;
    itemListClass?: string;
    itemClass?: string;
    selectedItemClass?: string;
    disableItemClass?: string;
    customLeftArrow?: React.ReactNode;
    customRightArrow?: React.ReactNode;
    className?: string;
}
declare const Pagination: FC<PaginationProps>;
export default Pagination;
