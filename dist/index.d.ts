import React, { FC } from "react";
interface PaginationProps {
    paginationStart: 0 | 1;
    currentIndex: number;
    totalPages: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    isDefaultStyles?: boolean;
    wrapperClass?: string;
    itemListClass?: string;
    itemClass?: string;
    selectedItemClass?: string;
    disableItemClass?: string;
    className?: string;
}
declare const Pagination: FC<PaginationProps>;
export default Pagination;
