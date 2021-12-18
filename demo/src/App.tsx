import React, { FC, useState } from "react";
import { hot } from "react-hot-loader/root";
import Pagination from "./Pagination";

const App: FC = () => {
  const [index, setIndex] = useState(1);
  const totalPages = 10;

  console.log(`Current: ${index}. Total: ${totalPages}`);

  return (
    <>
      <Pagination
        paginationStart={1}
        currentIndex={index}
        setIndex={setIndex}
        totalPages={totalPages}
        isDefaultStyles={true}
      />
    </>
  );
};

export default hot(App);
