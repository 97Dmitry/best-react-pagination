import { ItemStatus, Themes } from "./constants";
import React from "react";

export default class Styler {
  private theme: Themes;

  constructor(theme: Themes) {
    this.theme = theme;
  }

  wrapperClass(): React.CSSProperties {
    return {
      position: "sticky",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      bottom: 0,

      fontSize: "16px",
    };
  }

  itemListClass(): React.CSSProperties {
    return {
      padding: "10px 0",
    };
  }

  itemClass(status: ItemStatus): React.CSSProperties {
    if (status == ItemStatus.DISABLED) {
      return {
        display: "inline",
        cursor: "not-allowed",
        padding: "6px 12px",
        borderRadius: "4px",
        margin: "0 2px",
        userSelect: "none",
        backgroundColor: "transparent",
        color: this.theme === Themes.LIGHT ? "rgba(0, 0, 0, 0.87)" : "rgba(255, 255, 255, 1)",
        border: `1px solid ${this.theme === Themes.LIGHT ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`,
        opacity: "0.38",
      };
    }

    if (status === ItemStatus.SELECTED) {
      return {
        display: "inline",
        cursor: "pointer",
        padding: "6px 12px",
        borderRadius: "4px",
        margin: "0 2px",
        backgroundColor: this.theme === Themes.LIGHT ? "rgba(183, 186, 237, 0.28)" : "rgba(255, 255, 255, 0.24)",
        userSelect: "none",
        color: this.theme === Themes.LIGHT ? "rgba(0, 0, 0, 0.87)" : "rgba(255, 255, 255, 1)",
        border: `1px solid ${this.theme === Themes.LIGHT ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`,
      };
    }
    return {
      display: "inline",
      cursor: "pointer",
      padding: "6px 12px",
      borderRadius: "4px",
      margin: "0 2px",
      color: this.theme === Themes.LIGHT ? "rgba(0, 0, 0, 0.87)" : "rgba(255, 255, 255, 1)",
      backgroundColor: "transparent",
      userSelect: "none",
      border: `1px solid ${this.theme === Themes.LIGHT ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`,
    };
  }
}
