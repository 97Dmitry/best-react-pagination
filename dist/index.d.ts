import React, { FC } from "react";
import { Themes } from "./utils/constants";
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
    theme?: "light" | "dark";
    className?: string;
}
export declare const ThemeContext: React.Context<{
    theme: Themes;
}>;
declare const Pagination: FC<PaginationProps>;
export default Pagination;
