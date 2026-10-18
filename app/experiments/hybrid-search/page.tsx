"use client";

import { useState } from "react";

const initialDocuments = [
  "Document 1: Information retrieval combines indexing and ranking.",
  "Document 2: Semantic search finds results based on meaning.",
  "Document 3: Hybrid search combines keyword and semantic retrieval.",
  "Document 4: BM25 ranks documents using keyword relevance.",
  "Document 5: Dense embeddings help identify semantic similarity.",
];

type SearchResult = {
  document: string;
  score: number;
  matchedTerms: string[];
};

export default function HybridSearchExperiment() {
  const [query, setQuery] = useState("");
  const [documentsText, setDocumentsText] = useState(
    initialDocuments.join("\n")
  );
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [message, setMessage] = useState("");
  const [searchCount, setSearchCount] = useState(0);

  function runSimulation() {
    const searchTerms = query
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (searchTerms.length === 0) {
      setResults([]);
      setHasSearched(false);
      setMessage("Please enter a search query before running the simulation.");
      return;
    }

    const documents = documentsText
      .split("\n")
      .map((document) => document.trim())
      .filter(Boolean);

    if (documents.length === 0) {
      setResults([]);
      setHasSearched(false);
      setMessage("Please enter at least one document to search.");
      return;
    }

    const rankedResults: SearchResult[] = documents
      .map((document) => {
        const lowerDocument = document.toLowerCase();

        const matchedTerms = searchTerms.filter((term) =>
          lowerDocument.includes(term)
        );

        return {
          document,
          score: matchedTerms.length / searchTerms.length,
          matchedTerms,
        };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score);

    setResults(rankedResults);
    setHasSearched(true);
    setSearchCount((count) => count + 1);

    setMessage(
      rankedResults.length > 0
        ? `Found ${rankedResults.length} matching document(s).`
        : "No matching documents found. Try different keywords."
    );
  }

  function resetSimulation() {
    setQuery("");
    setDocumentsText(initialDocuments.join("\n"));
    setResults([]);
    setHasSearched(false);
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-[#f8f7ff] text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-20 border-b border-violet-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 font-black text-white shadow-lg">
              VL
            </span>

            <span>
              <span className="block text-lg font-black">VL Connect</span>
              <span className="hidden text-xs text-slate-500 sm:block">
                Virtual Laboratory Integration Portal
              </span>
            </span>
          </a>

          <a
            href="/#experiments"
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
          >
            ← All Experiments
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Experiment introduction */}
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-11">
          <span className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-teal-700">
            Experiment 04 · Hybrid Retrieval
          </span>

          <h1 className="mt-6 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Hybrid Keyword &amp; Semantic Search
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Explore how keyword matching retrieves documents containing
            specific terms. This interactive laboratory demonstrates a basic
            ranking method using sample documents.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Module",
                value: "Information Retrieval",
              },
              {
                title: "Lab Type",
                value: "Interactive Simulation",
              },
              {
                title: "Searches Run",
                value: String(searchCount),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-sm text-slate-500">{item.title}</p>
                <p className="mt-2 font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Learning objectives */}
        <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-7 sm:p-9">
          <h2 className="text-2xl font-black">Learning Objectives</h2>

          <p className="mt-2 text-slate-500">
            After completing this demonstration, students should be able to:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Understand keyword-based document retrieval.",
              "Explore basic query matching and ranking.",
              "Compare relevance scores across documents.",
              "Interpret the output of a retrieval simulation.",
            ].map((objective, index) => (
              <div
                key={objective}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-black text-teal-700">
                  {index + 1}
                </span>

                <p className="leading-7 text-slate-700">{objective}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive simulation */}
        <section
          id="simulation"
          className="mt-7 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-600">
                Interactive Laboratory
              </p>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Run Your Search Simulation
              </h2>
            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
              Ready to run
            </span>
          </div>

          <p className="mt-4 leading-7 text-slate-600">
            Enter a query, run the simulation, and see which documents contain
            the matching keywords. Each result receives a score based on the
            proportion of query terms found in that document.
          </p>

          {/* Search input */}
          <form
            className="mt-7"
            onSubmit={(event) => {
              event.preventDefault();
              runSimulation();
            }}
          >
            <label
              htmlFor="search-query"
              className="block text-sm font-bold text-slate-700"
            >
              Search Query
            </label>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="search-query"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try: semantic search"
                className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              />

              <button
                type="submit"
                className="min-h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3 font-bold text-white shadow-md transition hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-violet-200"
              >
                Run Simulation →
              </button>
            </div>
          </form>

          {/* Editable documents */}
          <div className="mt-7">
            <label
              htmlFor="sample-documents"
              className="block text-sm font-bold text-slate-700"
            >
              Sample Documents
            </label>

            <p className="mt-1 text-sm text-slate-500">
              Edit these documents if you want to experiment with different
              content. Keep one document per line.
            </p>

            <textarea
              id="sample-documents"
              value={documentsText}
              onChange={(event) => setDocumentsText(event.target.value)}
              rows={6}
              className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-7 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            />
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={resetSimulation}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Reset Simulation
            </button>

            <button
              type="button"
              onClick={() => {
                setQuery("semantic search");
                const demoQuery = "semantic search";

                const terms = demoQuery.split(/\s+/);

                const rankedResults: SearchResult[] = documentsText
                  .split("\n")
                  .map((document) => document.trim())
                  .filter(Boolean)
                  .map((document) => {
                    const lowerDocument = document.toLowerCase();

                    const matchedTerms = terms.filter((term) =>
                      lowerDocument.includes(term)
                    );

                    return {
                      document,
                      score: matchedTerms.length / terms.length,
                      matchedTerms,
                    };
                  })
                  .filter((result) => result.score > 0)
                  .sort((a, b) => b.score - a.score);

                setResults(rankedResults);
                setHasSearched(true);
                setSearchCount((count) => count + 1);

                setMessage(
                  rankedResults.length > 0
                    ? `Demo complete: found ${rankedResults.length} matching document(s).`
                    : "No matches found in the current documents."
                );
              }}
              className="rounded-xl border border-violet-200 bg-violet-50 px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-100"
            >
              Try Example Query
            </button>
          </div>

          {/* Feedback */}
          {message && (
            <div
              role="status"
              className={`mt-6 rounded-xl border p-4 text-sm font-semibold ${
                message.startsWith("Please")
                  ? "border-amber-200 bg-amber-50 text-amber-800"
                  : "border-violet-200 bg-violet-50 text-violet-800"
              }`}
            >
              {message}
            </div>
          )}

          {/* Results */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-black">Simulation Results</h3>

              {hasSearched && (
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600">
                  {results.length} result(s)
                </span>
              )}
            </div>

            {!hasSearched ? (
              <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-7 text-center">
                <p className="text-2xl">⌕</p>
                <p className="mt-3 font-bold text-slate-700">
                  No simulation run yet
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Enter a query above and click Run Simulation to display
                  matching documents here.
                </p>
              </div>
            ) : results.length === 0 ? (
              <p className="mt-5 rounded-xl bg-white p-5 text-sm text-slate-600">
                No matching documents. Try another query.
              </p>
            ) : (
              <div className="mt-5 space-y-4">
                {results.map((result, index) => (
                  <article
                    key={`${index}-${result.document}`}
                    className="rounded-xl border border-slate-200 bg-white p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="font-extrabold text-slate-800">
                        Result #{index + 1}
                      </h4>

                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                        {(result.score * 100).toFixed(0)}% query-term match
                      </span>
                    </div>

                    <p className="mt-3 break-words text-sm leading-7 text-slate-600">
                      {result.document}
                    </p>

                    <p className="mt-3 text-xs text-slate-500">
                      Matched terms:{" "}
                      {result.matchedTerms.length > 0
                        ? result.matchedTerms.join(", ")
                        : "None"}
                    </p>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                        style={{
                          width: `${result.score * 100}%`,
                        }}
                      />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <p className="mt-5 text-xs leading-6 text-slate-400">
            Educational prototype: this simulation performs basic
            case-insensitive keyword matching. It does not yet implement BM25,
            dense embeddings, or true semantic search.
          </p>
        </section>

        {/* Student work integration */}
        <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-7 sm:p-9">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-600">
            Student Work Integration
          </p>

          <h2 className="mt-3 text-2xl font-black">
            Experiment Submissions
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            In the completed platform, this area will help organize individual
            student results, experiment reports, and screenshots so your
            teacher can review everyone's work in one place.
          </p>

          <div className="mt-6 rounded-2xl border border-dashed border-violet-300 bg-violet-50/60 p-6">
            <p className="font-extrabold text-violet-800">
              Database integration is the next stage.
            </p>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              This page currently runs entirely in the browser. Simulation
              results are not saved permanently, and no student submissions
              are sent to a teacher yet.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center text-sm text-slate-500">
          VL Connect · Virtual Laboratory Integration Portal
        </footer>
      </div>
    </main>
  );
}