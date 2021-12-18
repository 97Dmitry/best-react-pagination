import React, { FC } from "react";
import { defaultStyles } from "../constants";

interface ItemListProps {
  isDefaultStyles: boolean | undefined;
  itemListClass: string;
}

const ItemList: FC<ItemListProps> = ({ isDefaultStyles, itemListClass, children }) => {
  return (
    <ul className={itemListClass} style={isDefaultStyles ? defaultStyles.itemListClass : undefined}>
      {children}
    </ul>
  );
};

export default ItemList;
