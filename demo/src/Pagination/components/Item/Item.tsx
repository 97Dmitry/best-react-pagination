import React, { FC, useContext } from "react";
import { DefaultStylesEnum, ItemStatus } from "../../utils/constants";
import { ThemeContext } from "../../index";
import Styler from "../../utils/Styler";

interface ItemProps {
  isDefaultStyles: boolean | undefined;
  itemClass: string;
  itemStyle: DefaultStylesEnum;
  onClick?: () => void;
}

const Item: FC<ItemProps> = ({ isDefaultStyles, itemClass, itemStyle, onClick, children }) => {
  const themeContext = useContext(ThemeContext);
  const styles = new Styler(themeContext.theme);

  const computedItemStatus = (status: DefaultStylesEnum): ItemStatus => {
    switch (status) {
      case DefaultStylesEnum.selectedItemClass:
        return ItemStatus.SELECTED;

      case DefaultStylesEnum.disableItemClass:
        return ItemStatus.DISABLED;

      default:
        return ItemStatus.REGULAR;
    }
  };

  return (
    <li
      className={itemClass}
      style={isDefaultStyles ? styles.itemClass(computedItemStatus(itemStyle)) : undefined}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default Item;
