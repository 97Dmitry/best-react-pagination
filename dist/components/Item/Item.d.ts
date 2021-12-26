import { FC } from "react";
import { DefaultStylesEnum } from "../../utils/constants";
interface ItemProps {
    isDefaultStyles: boolean | undefined;
    itemClass: string;
    itemStyle: DefaultStylesEnum;
    onClick?: () => void;
}
declare const Item: FC<ItemProps>;
export default Item;
