import React, { FC, useState } from "react";
import { hot } from "react-hot-loader/root";
import Pagination from "./Pagination";

const App: FC = () => {
  const [index, setIndex] = useState(1);
  const totalPages = 10;
  const paginationStart = 1;

  console.log(`Current: ${index}. Total: ${totalPages}, PaginationStart: ${paginationStart}`);

  return (
    <>
      <Pagination
        paginationStart={paginationStart}
        currentIndex={index}
        setIndex={setIndex}
        totalPages={totalPages}
        isDefaultStyles={true}
      />
    </>
  );
};

export default hot(App);
