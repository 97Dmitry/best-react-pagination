import { FC } from "react";
import { defaultStylesEnum } from "../constants";
interface ItemProps {
    isDefaultStyles: boolean | undefined;
    itemClass: string;
    itemStyle: defaultStylesEnum;
    onClick?: () => void;
}
declare const Item: FC<ItemProps>;
export default Item;
