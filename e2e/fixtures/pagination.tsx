import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Pagination from "../../lib/pagination";
import "../../lib/styles.css";

function Example({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const [page, setPage] = useState(currentPage);

  return (
    <div style={{ width: 230 }}>
      <Pagination
        aria-label={`${totalPages}-page fixture`}
        paginationStart={1}
        currentIndex={page}
        totalPages={totalPages}
        boundaryCount={0}
        onPageChange={setPage}
        isDefaultStyles
      />
    </div>
  );
}

const root = document.createElement("div");
document.body.prepend(root);
createRoot(root).render(<><Example currentPage={22} totalPages={24} /><Example currentPage={99} totalPages={10000} /></>);
