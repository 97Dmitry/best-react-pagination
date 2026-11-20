import React, { useEffect, useRef, useState } from "react";
import Pagination from "../../lib/pagination";

interface CatalogueEntry {
  name: string;
  description: string;
}

type CatalogueState = { status: "loading" | "error" } | { status: "ready"; entries: CatalogueEntry[] };

const pageSize = 3;

function cataloguePageHref(index: number) {
  const params = new URLSearchParams(window.location.search);
  params.set("page", String(index));
  return `?${params}#catalogue`;
}

export default function CatalogueExample() {
  const catalogue = useRef<HTMLElement>(null);
  const [state, setState] = useState<CatalogueState>({ status: "loading" });

  useEffect(() => {
    if (window.location.hash === "#catalogue") catalogue.current?.focus();
    const controller = new AbortController();

    async function loadCatalogue() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}catalogue.json`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Catalogue request failed (${response.status})`);
        const entries: unknown = await response.json();
        if (!Array.isArray(entries) || !entries.every((entry): entry is CatalogueEntry =>
          typeof entry?.name === "string" && typeof entry?.description === "string"
        )) {
          throw new Error("Invalid catalogue response");
        }
        if (!controller.signal.aborted) setState({ status: "ready", entries });
      } catch {
        if (!controller.signal.aborted) setState({ status: "error" });
      }
    }

    void loadCatalogue();
    return () => controller.abort();
  }, []);

  const entries = state.status === "ready" ? state.entries : [];
  const totalPages = Math.ceil(entries.length / pageSize);
  const requestedPage = Number(new URLSearchParams(window.location.search).get("page") ?? 1);
  const currentPage = Number.isSafeInteger(requestedPage) ? Math.max(1, Math.min(requestedPage, totalPages)) : 1;
  const offset = (currentPage - 1) * pageSize;
  const visibleEntries = entries.slice(offset, offset + pageSize);

  let statusMessage = "Loading catalogue…";
  if (state.status === "error") statusMessage = "Could not load the catalogue. Reload the page to try again.";
  if (state.status === "ready") statusMessage = totalPages ? `Page ${currentPage} of ${totalPages}` : "No components found.";

  return (
    <section className="catalogue" id="catalogue" aria-labelledby="catalogue-title" tabIndex={-1} ref={catalogue}>
      <h2 id="catalogue-title">Component catalogue</h2>
      <p className="catalogue__intro">This example loads a sample catalogue and keeps the current page in the URL.</p>
      <p className="catalogue__status" role="status">{statusMessage}</p>
      {visibleEntries.length > 0 && (
        <ul className="catalogue__items" role="list">
          {visibleEntries.map(({ name, description }) => (
            <li key={name}>
              <h3>{name}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      )}
      <Pagination
        aria-label="Catalogue pagination"
        paginationStart={1}
        currentIndex={currentPage}
        totalPages={totalPages}
        siblingCount={0}
        getPageHref={cataloguePageHref}
        isDefaultStyles
      />
    </section>
  );
}
