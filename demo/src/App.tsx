import React, { FC, useState } from "react";
import { hot } from "react-hot-loader/root";
import Pagination from "./Pagination";

const App: FC = () => {
  const [index, setIndex] = useState(1);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const totalPages = 10;
  const paginationStart = 1;

  console.log(`Current: ${index}. Total: ${totalPages}, PaginationStart: ${paginationStart}`);

  return (
    <div style={{ background: theme === "light" ? "#fff" : "#0a1929" }}>
      <Pagination
        paginationStart={paginationStart}
        currentIndex={index}
        setIndex={setIndex}
        totalPages={totalPages}
        isDefaultStyles={true}
        theme={theme}
      />
      <button
        onClick={() => {
          theme === "light" ? setTheme("dark") : setTheme("light");
        }}
      >
        Change theme
      </button>
    </div>
  );
};

export default hot(App);
