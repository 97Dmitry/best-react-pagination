import React, { FC, useContext } from "react";
import { ThemeContext } from "../../index";
import Styler from "../../utils/Styler";

interface ItemListProps {
  isDefaultStyles: boolean | undefined;
  itemListClass: string;
}

const ItemList: FC<ItemListProps> = ({ isDefaultStyles, itemListClass, children }) => {
  const themeContext = useContext(ThemeContext);
  const styles = new Styler(themeContext.theme);

  return (
    <ul className={itemListClass} style={isDefaultStyles ? styles.itemListClass() : undefined}>
      {children}
    </ul>
  );
};

export default ItemList;
