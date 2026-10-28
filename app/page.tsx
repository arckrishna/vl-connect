"use client";

import { useEffect, useMemo, useState } from "react";

type Project = {
  group: string;
  title: string;
  students: string[];
  feasibility?: string;
  architecture?: string;
  report?: string;
  virtualLab?: string;
};

type SheetProject = {
  group?: string;
  student1?: string;
  student2?: string;
  virtualLab?: string;
  feasibility?: string;
  architecture?: string;
  report?: string;
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [documentFilter, setDocumentFilter] = useState("all");

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error("Unable to load projects.");
        }

        const data: SheetProject[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("The project API returned an invalid response.");
        }

        const mappedProjects: Project[] = data.map((item, index) => ({
          group: String(item.group || index + 1),
          title: `Group ${item.group || index + 1} Project`,
          students: [item.student1, item.student2].filter(
            (student): student is string => Boolean(student && student.trim())
          ),
          virtualLab: item.virtualLab || "",
          feasibility: item.feasibility || "",
          architecture: item.architecture || "",
          report: item.report || "",
        }));

        setProjects(mappedProjects);
        setLoadError("");
      } catch (error) {
        console.error("Failed to load projects:", error);
        setLoadError("We couldn't load the projects. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);


  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.group.toLowerCase().includes(query) ||
        project.students.some((student) =>
          student.toLowerCase().includes(query)
        );

      const resourceCount = [
        project.virtualLab,
        project.feasibility,
        project.architecture,
        project.report,
      ].filter(Boolean).length;

      const matchesFilter =
        documentFilter === "all" ||
        (documentFilter === "lab" && Boolean(project.virtualLab)) ||
        (documentFilter === "feasibility" &&
          Boolean(project.feasibility)) ||
        (documentFilter === "architecture" &&
          Boolean(project.architecture)) ||
        (documentFilter === "report" && Boolean(project.report)) ||
        (documentFilter === "complete" && resourceCount === 4);

      return matchesSearch && matchesFilter;
    });
  }, [search, documentFilter]);

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#20211f]">
      <header className="border-b border-white/10 bg-[#171816] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center border border-white/30 text-sm font-bold">
              VL
            </div>
            <span className="text-sm font-semibold tracking-wide">
              VL-CONNECT
            </span>
          </a>

          <nav className="flex items-center gap-6 text-sm text-white/65">
            <a href="#projects" className="transition hover:text-white">
              Projects
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <span className="hidden border border-white/20 px-3 py-1.5 text-xs sm:inline">
              ENGINEERING LAB
            </span>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#171816] text-white">
        <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pb-20 sm:pt-24 lg:px-10 lg:pt-28">
          <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-white/50">
            <span className="h-px w-8 bg-blue-400" />
            Virtual Laboratory / Project Index
          </div>

          <h1 className="max-w-4xl text-5xl font-medium leading-[1.08] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
            Ideas become
            <br />
            <span className="text-white/45">systems.</span>
          </h1>

          <div className="mt-10 flex flex-col justify-between gap-8 border-t border-white/15 pt-6 sm:flex-row sm:items-end">
            <p className="max-w-lg text-base leading-7 text-white/60">
              An organized collection of engineering projects, interactive
              virtual labs, architecture diagrams, and technical documentation.
            </p>

            <a
              href="#projects"
              className="group inline-flex w-fit items-center gap-4 border border-white/25 px-5 py-3 text-sm transition hover:border-white hover:bg-white hover:text-black"
            >
              Explore the index
              <span className="transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 border-t border-white/15 sm:grid-cols-3">
            <div className="border-r border-white/15 py-6 pr-4">
              <p className="text-3xl font-medium tracking-tight">
                {projects.length.toString().padStart(2, "0")}
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-white/45">
                Listed projects
              </p>
            </div>

            <div className="py-6 pl-5 sm:border-r sm:border-white/15 sm:pl-6">
              <p className="text-3xl font-medium tracking-tight">
                {projects.filter((project) => project.virtualLab).length
                  .toString()
                  .padStart(2, "0")}
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-white/45">
                Lab links
              </p>
            </div>

            <div className="col-span-2 border-t border-white/15 py-6 sm:col-span-1 sm:border-t-0 sm:pl-6">
              <p className="text-3xl font-medium tracking-tight">01</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-white/45">
                Connected catalogue
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-8">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="flex flex-col justify-between gap-5 border-b border-[#deded8] pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#777970]">
                The collection
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                Project directory
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#777970]">
                Browse projects and open their original resources.
              </p>
            </div>

            <p className="text-sm text-[#777970]">
              INDEX / {String(filteredProjects.length).padStart(2, "0")} RESULTS
            </p>
          </div>

          <div className="grid gap-4 border-b border-[#deded8] py-6 md:grid-cols-[1fr_230px]">
            <div>
              <label
                htmlFor="project-search"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#777970]"
              >
                Find a project
              </label>
              <input
                id="project-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search group or student..."
                className="w-full border border-[#deded8] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#999a92] focus:border-[#292a26]"
              />
            </div>

            <div>
              <label
                htmlFor="document-filter"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#777970]"
              >
                Filter resources
              </label>
              <select
                id="document-filter"
                value={documentFilter}
                onChange={(event) => setDocumentFilter(event.target.value)}
                className="w-full border border-[#deded8] bg-white px-4 py-3 text-sm outline-none focus:border-[#292a26]"
              >
                <option value="all">All projects</option>
                <option value="lab">Virtual lab available</option>
                <option value="feasibility">Feasibility available</option>
                <option value="architecture">Architecture available</option>
                <option value="report">Report available</option>
                <option value="complete">All four resources</option>
              </select>
            </div>
          </div>

          <div className="hidden grid-cols-[70px_minmax(0,1fr)_auto] gap-5 border-b border-[#deded8] py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#898a82] md:grid">
            <span>Group</span>
            <span>Project / Team</span>
            <span className="text-right">Resources</span>
          </div>

          {loading && (
            <div className="border-b border-[#deded8] py-12 text-center text-sm text-[#777970]">
              Loading projects from the Google Sheet...
            </div>
          )}

          {!loading && loadError && (
            <div className="border-b border-[#deded8] py-12 text-center text-sm text-red-700">
              {loadError}
            </div>
          )}

          <div>
            {!loading && !loadError && filteredProjects.map((project, index) => (
              <article
                key={`${project.group}-${project.title}-${index}`}
                className="group border-b border-[#deded8] py-6 transition-colors hover:bg-white sm:py-7"
              >
                <div className="grid gap-4 md:grid-cols-[70px_minmax(0,1fr)_auto] md:items-start md:gap-5">
                  <div className="flex items-center gap-3 md:block">
                    <span className="text-xs font-semibold tabular-nums text-[#777970]">
                      {project.group}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#a1a198] md:hidden">
                      Group
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium leading-snug tracking-[-0.025em] transition-colors group-hover:text-[#315c9b] sm:text-xl">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#777970]">
                      {project.students.join(" · ")}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                      {project.virtualLab && (
                        <a
                          href={project.virtualLab}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#315c9b] hover:underline"
                        >
                          Virtual Lab ↗
                        </a>
                      )}

                      {project.feasibility && (
                        <a
                          href={project.feasibility}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#65665f] hover:text-black hover:underline"
                        >
                          Feasibility
                        </a>
                      )}

                      {project.architecture && (
                        <a
                          href={project.architecture}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#65665f] hover:text-black hover:underline"
                        >
                          Architecture
                        </a>
                      )}

                      {project.report && (
                        <a
                          href={project.report}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#65665f] hover:text-black hover:underline"
                        >
                          Report
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 md:justify-end">
                    <span className="text-[10px] uppercase tracking-wider text-[#999a92]">
                      {
                        [
                          project.virtualLab,
                          project.feasibility,
                          project.architecture,
                          project.report,
                        ].filter(Boolean).length
                      }{" "}
                      / 4 resources
                    </span>

                    {project.virtualLab ? (
                      <a
                        href={project.virtualLab}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open virtual lab for ${project.title}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#deded8] text-sm transition hover:border-[#20211f] hover:bg-[#20211f] hover:text-white"
                      >
                        ↗
                      </a>
                    ) : (
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-dashed border-[#deded8] text-[#aaa]">
                        —
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!loading && !loadError && filteredProjects.length === 0 && (
            <div className="border-b border-[#deded8] py-20 text-center">
              <p className="text-lg font-medium">No matching projects.</p>
              <p className="mt-2 text-sm text-[#777970]">
                Try another search or clear your filters.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setDocumentFilter("all");
                }}
                className="mt-5 border border-[#20211f] px-4 py-2 text-sm transition hover:bg-[#20211f] hover:text-white"
              >
                Clear filters
              </button>
            </div>
          )}

          <div className="flex flex-col justify-between gap-3 py-6 text-xs text-[#898a82] sm:flex-row">
            <p>Showing {filteredProjects.length} listed project records.</p>
            <p>Resources open from their original hosting websites.</p>
          </div>
        </div>
      </section>

      <footer id="about" className="bg-[#171816] text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-10 sm:flex-row sm:items-end lg:px-10">
          <div>
            <p className="text-sm font-semibold tracking-wide">VL-CONNECT</p>
            <p className="mt-2 text-sm text-white/45">
              A central directory for virtual labs and engineering projects.
            </p>
          </div>

          <p className="text-xs text-white/40">
            PROJECT INDEX / ACADEMIC COLLECTION
          </p>
        </div>
      </footer>
    </main>
  );
}
