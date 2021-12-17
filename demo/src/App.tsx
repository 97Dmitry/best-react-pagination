import React, { FC, useState } from "react";
import { hot } from "react-hot-loader/root";
import Pagination from "./Pagination";

const App: FC = () => {
  const [index, setIndex] = useState(1);

  return (
    <>
      <Pagination paginationStart={1} currentIndex={index} setIndex={setIndex} totalPages={10} isDefaultStyles={true} />
    </>
  );
};

export default hot(App);
