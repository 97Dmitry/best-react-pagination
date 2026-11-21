import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Pagination, { type PaginationBehavior } from "../../lib/pagination";
import "../../lib/styles.css";
import "./demo.css";
import "./variants.css";

const totalPages = 24;
const examples = {
  separate: { title: "Separate ellipses", description: "Each ellipsis takes up space in the row." },
  between: { title: "Ellipses between buttons", description: "The ellipses keep their spacing and the row holds its width." },
  default: { title: "Fill single-page gaps", description: "When a gap contains just one page, show its page number in place of an ellipsis." },
};

function Example({ behavior }: { behavior: PaginationBehavior }) {
  const [page, setPage] = useState(3);
  const { title, description } = examples[behavior];

  return (
    <section className="example">
      <div className="example__description">
        <h2 id={behavior}>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="example__preview">
        <p role="status">Page {page} of {totalPages}</p>
        <Pagination
          aria-labelledby={behavior}
          paginationStart={1}
          currentIndex={page}
          totalPages={totalPages}
          onPageChange={setPage}
          behavior={behavior}
          isDefaultStyles
        />
      </div>
    </section>
  );
}

const app = document.getElementById("app");

if (app) {
  createRoot(app).render(
    <main className="comparison">
      <header className="intro">
        <div>
          <h1>Pagination behaviors</h1>
          <p>All three examples start on page 3. Try clicking Next twice.</p>
        </div>
        <div className="intro__links">
          <a href={import.meta.env.BASE_URL}>Back to demo</a>
        </div>
      </header>
      <div className="examples">
        <Example behavior="separate" />
        <Example behavior="between" />
        <Example behavior="default" />
      </div>
    </main>,
  );
}
