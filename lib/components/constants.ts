import React from "react";

export enum defaultStylesEnum {
  wrapperClass = "wrapperClass",
  itemListClass = "itemListClass",
  itemClass = "itemClass",
  selectedItemClass = "selectedItemClass",
  disableItemClass = "disableItemClass",
}

export const defaultStyles: Record<defaultStylesEnum, React.CSSProperties> = {
  wrapperClass: {
    position: "sticky",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    bottom: 0,

    fontSize: "16px",
  },
  itemListClass: {
    padding: "10px 0",
  },
  itemClass: {
    display: "inline",
    cursor: "pointer",
    padding: "6px 12px",
    borderRadius: "4px",
    margin: "0 2px",
    backgroundColor: "#45c954",
    userSelect: "none",
  },
  selectedItemClass: {
    display: "inline",
    cursor: "pointer",
    padding: "6px 12px",
    borderRadius: "4px",
    margin: "0 2px",
    backgroundColor: "#48bbff",
    userSelect: "none",
  },
  disableItemClass: {
    display: "inline",
    cursor: "not-allowed",
    padding: "6px 12px",
    borderRadius: "4px",
    margin: "0 2px",
    userSelect: "none",
  },
};
