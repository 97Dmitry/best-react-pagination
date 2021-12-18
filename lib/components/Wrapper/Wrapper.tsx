import React, { FC } from "react";
import { defaultStyles } from "../constants";

interface WrapperProps {
  isDefaultStyles: boolean | undefined;
  wrapperClass: string;
}

const Wrapper: FC<WrapperProps> = ({ isDefaultStyles, wrapperClass, children }) => {
  return (
    <div className={wrapperClass} style={isDefaultStyles ? defaultStyles.wrapperClass : undefined}>
      {children}
    </div>
  );
};

export default Wrapper;
