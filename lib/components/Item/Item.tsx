import React, { FC } from "react";
import { defaultStyles, defaultStylesEnum } from "../constants";

interface ItemProps {
  isDefaultStyles: boolean | undefined;
  itemClass: string;
  itemStyle: defaultStylesEnum;
  onClick?: () => void;
}

const Item: FC<ItemProps> = ({ isDefaultStyles, itemClass, itemStyle, onClick, children }) => {
  return (
    <li className={itemClass} style={isDefaultStyles ? defaultStyles[itemStyle] : undefined} onClick={onClick}>
      {children}
    </li>
  );
};

export default Item;
