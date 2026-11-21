import React, { useState } from "react";
import Pagination, { type PaginationBehavior } from "../../lib/pagination";
import "../../lib/styles.css";
import CatalogueExample from "./CatalogueExample";
import "./demo.css";

const totalPages = 24;

interface ExampleProps {
  title: string;
  usage: string;
  initialPage: number;
  behavior?: PaginationBehavior;
  zeroBased?: boolean;
  compact?: boolean;
  custom?: boolean;
}

function Example({ title, usage, initialPage, behavior, zeroBased, compact, custom }: ExampleProps) {
  const paginationStart = zeroBased ? 0 : 1;
  const [index, setIndex] = useState(initialPage - 1 + paginationStart);
  const page = index - paginationStart + 1;

  return (
    <section className="example">
      <div className="example__description">
        <h2>{title}</h2>
        <code>{usage}{behavior && ` behavior="${behavior}"`}</code>
      </div>
      <div className="example__preview">
        <p role="status">Page {page} of {totalPages}</p>
        <Pagination
          aria-label={title + " pagination"}
          paginationStart={paginationStart}
          currentIndex={index}
          totalPages={totalPages}
          onPageChange={setIndex}
          behavior={behavior}
          isDefaultStyles={!custom}
          variant={compact ? "compact" : "default"}
          className={custom ? "custom-pagination" : undefined}
        />
      </div>
    </section>
  );
}

export default function App() {
  const [behavior, setBehavior] = useState<PaginationBehavior>(() => {
    const value = new URLSearchParams(window.location.search).get("behavior");
    return value === "default" || value === "separate" ? value : "between";
  });

  function changeBehavior(value: PaginationBehavior) {
    const url = new URL(window.location.href);
    if (value === "between") url.searchParams.delete("behavior");
    else url.searchParams.set("behavior", value);
    window.history.replaceState(window.history.state, "", url);
    setBehavior(value);
  }

  return (
    <main>
      <header className="intro">
        <div>
          <h1>best-react-pagination</h1>
          <p>Compare two built-in styles and an unstyled mode for your own CSS.</p>
        </div>
        <div className="intro__links">
          <code>npm install best-react-pagination</code>
          <a href={`${import.meta.env.BASE_URL}variants.html`}>Compare pagination behaviors</a>
          <a href="https://github.com/97Dmitry/best-react-pagination">GitHub</a>
        </div>
      </header>

      <div className="examples">
        <div className="examples__settings">
          <label htmlFor="pagination-behavior">Pagination behavior</label>
          <select
            id="pagination-behavior"
            value={behavior}
            onChange={(event) => changeBehavior(event.currentTarget.value as PaginationBehavior)}
          >
            <option value="between">Ellipses between buttons</option>
            <option value="default">Fill single-page gaps</option>
            <option value="separate">Separate ellipses</option>
          </select>
        </div>
        <Example title="Default" usage="isDefaultStyles" initialPage={1} behavior={behavior} />
        <Example title="Compact" usage={'isDefaultStyles variant="compact"'} initialPage={5} behavior={behavior} compact />
        <Example title="Custom CSS" usage="isDefaultStyles={false}" initialPage={24} behavior="separate" zeroBased custom />
      </div>
      <CatalogueExample behavior={behavior} />
    </main>
  );
}
