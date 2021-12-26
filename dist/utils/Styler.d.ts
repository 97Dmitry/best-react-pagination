import { ItemStatus, Themes } from "./constants";
import React from "react";
export default class Styler {
    private theme;
    constructor(theme: Themes);
    wrapperClass(): React.CSSProperties;
    itemListClass(): React.CSSProperties;
    itemClass(status: ItemStatus): React.CSSProperties;
}
