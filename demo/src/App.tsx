import React, { useState } from "react";
import Pagination from "../../lib/pagination";
import "../../lib/styles.css";
import "./demo.css";

const totalPages = 24;

interface ExampleProps {
  title: string;
  usage: string;
  initialPage: number;
  zeroBased?: boolean;
  compact?: boolean;
  custom?: boolean;
}

function Example({ title, usage, initialPage, zeroBased, compact, custom }: ExampleProps) {
  const paginationStart = zeroBased ? 0 : 1;
  const [index, setIndex] = useState(initialPage - 1 + paginationStart);
  const page = index - paginationStart + 1;

  return (
    <section className="example">
      <div className="example__description">
        <h2>{title}</h2>
        <code>{usage}</code>
      </div>
      <div className="example__preview">
        <p role="status">Page {page} of {totalPages}</p>
        <Pagination
          aria-label={title + " pagination"}
          paginationStart={paginationStart}
          currentIndex={index}
          totalPages={totalPages}
          setIndex={setIndex}
          isDefaultStyles={!custom}
          variant={compact ? "compact" : "default"}
          className={custom ? "custom-pagination" : undefined}
        />
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main>
      <header className="intro">
        <h1>best-react-pagination</h1>
        <p>React pagination with two built-in styles and an unstyled mode for your own CSS.</p>
        <div className="intro__links">
          <code>npm install best-react-pagination</code>
          <a href="https://github.com/97Dmitry/best-react-pagination">GitHub</a>
        </div>
      </header>

      <Example title="Default" usage="isDefaultStyles" initialPage={1} />
      <Example title="Compact" usage={'isDefaultStyles variant="compact"'} initialPage={5} compact />
      <Example title="Custom CSS" usage="isDefaultStyles={false}" initialPage={24} zeroBased custom />
    </main>
  );
}
