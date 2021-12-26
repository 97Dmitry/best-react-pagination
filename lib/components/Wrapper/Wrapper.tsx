import React, { FC, useContext } from "react";
import { ThemeContext } from "../../index";
import Styler from "../../utils/Styler";

interface WrapperProps {
  isDefaultStyles: boolean | undefined;
  wrapperClass: string;
}

const Wrapper: FC<WrapperProps> = ({ isDefaultStyles, wrapperClass, children }) => {
  const themeContext = useContext(ThemeContext);
  const styles = new Styler(themeContext.theme);

  return (
    <div className={wrapperClass} style={isDefaultStyles ? styles.wrapperClass() : undefined}>
      {children}
    </div>
  );
};

export default Wrapper;
