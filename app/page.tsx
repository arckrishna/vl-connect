"use client";

import { useMemo, useState } from "react";

type Project = {
  group: string;
  title: string;
  students: string[];
  teacher: string;
  feasibility?: string;
  architecture?: string;
  report?: string;
  virtualLab?: string;
};

const projects: Project[] = [
  {
    group: "01",
    title: "LSM-Tree Storage Engine over Object Storage",
    students: ["Bhagyashri Joshi", "Neha Karkhanis"],
    teacher: "Priya Ma'am",
    feasibility:
      "https://docs.google.com/document/d/1b9e-8tFBF5M9lhGAKXHlwbCBg1pNyvCf9SBbhOrw9hI/edit?usp=sharing",
    architecture:
      "https://drive.google.com/file/d/1Vk6XvulD0rJfJaQTzs5rRWz8ltBxa8W7/view?usp=sharing",
    virtualLab:
      "https://breakscale.tech/?s=7DHFQBUjGAB2bg#k=HbL_86S-uT1mHvZxmnXarg",
  },
  {
    group: "04",
    title: "Geo-Distributed Active-Active Cache Cluster",
    students: ["Talha Mulani", "Meet Phulwani"],
    teacher: "Priya Ma'am",
    feasibility:
      "https://docs.google.com/document/d/1xlVBZT3XgxLM7UXHq5mye7iApNcn-CGL/edit?usp=sharing",
    architecture:
      "https://drive.google.com/file/d/1CC05rXr5k7orGQVX-XmGTI_SlvZrxx9-/view?usp=sharing",
  },
  {
    group: "07",
    title: "Resilient Distributed DAG Orchestrator",
    students: ["James Lijo", "Sahil Mirchandani"],
    teacher: "Priya Ma'am",
    feasibility:
      "https://drive.google.com/file/d/1MVIz1jLhWqcLD3wlKXRI4MdD8fgS1ARf/view?usp=drive_link",
    architecture:
      "https://drive.google.com/file/d/1W2n91UqKs2RwjkKaoVYXtevYcvjxlmG_/view?usp=sharing",
    report:
      "https://drive.google.com/file/d/1XZXDW2RqvJaAcsZqVx5XNrctonlNtpxx/view?usp=sharing",
    virtualLab:
      "https://breakscale.tech/?s=E0QnnCDNy5Zwyw#k=D2xDtaOuKYvAh9Pgekhb5Q",
  },
  {
    group: "11",
    title: "Partitioned Distributed Commit Log Broker",
    students: ["Khyati Keswani", "Malika Makhija"],
    teacher: "Priya Ma'am",
    feasibility:
      "https://drive.google.com/file/d/1dGKuJXV0st1P5ULF7mkhme3GMgSTwlr5/view?usp=drive_link",
    architecture:
      "https://drive.google.com/file/d/1P6ltb-QM1K8URj9gsBoDBO8uVgMdZb7r/view?usp=sharing",
    virtualLab:
      "https://breakscale.tech/?s=ONSaLW1Tvnn6yQ#k=wXejaT3IKGpTQSRm1xNIuw",
  },
  {
    group: "13",
    title: "Fault-Tolerant Distributed Lock Service",
    students: ["Tanmay Maniyar"],
    teacher: "Not specified",
    feasibility:
      "https://docs.google.com/document/d/1iK6x0Zn9DDbzwQbUOHZ8cLAWaGbyYf2Y/edit?usp=drive_link",
    architecture:
      "https://drive.google.com/file/d/1NMduRQRmXzq6Xg1Oi8BfEkEZqFKH7RgN/view?usp=drive_link",
    report:
      "https://docs.google.com/document/d/1Nl58mQnrpQKWJepbur7oCiy3yXutJN_P/edit?usp=drive_link",
    virtualLab:
      "https://breakscale.tech/?s=OsbAtSQculCR3g#k=SANvrbY39og94EKZuwnIjg",
  },
  {
    group: "13",
    title: "Fault-Tolerant Distributed Lock Service",
    students: ["Prathamesh", "Chandrabhanu"],
    teacher: "Priya Ma'am",
    feasibility:
      "https://docs.google.com/document/d/1gQn1SJjVz_v0hdvlVOLwRQXZZ3D3nYXZQ4Ts7RVdVas/edit?usp=sharing",
    architecture:
      "https://drive.google.com/file/d/1jfXwhRW-RrI2YEH9lwEmIcAs3WilLrAP/view?usp=sharing",
    report:
      "https://docs.google.com/document/d/19e05Ohx_smSj2kcMIw0ypqgJqH0Son6NAs-gpp8cyMY/edit?usp=sharing",
    virtualLab:
      "https://breakscale.tech/?s=ccWDYrnjafwMuQ#k=pfZZaDLN-aqbWrJ_WDIx9Q",
  },
  {
    group: "14",
    title: "Real-Time Pub/Sub WebSocket Gateway",
    students: ["Mahek Ahuja", "Piyush Kandhari"],
    teacher: "Priya Ma'am",
    feasibility:
      "https://drive.google.com/file/d/1vKTBr8x5LF2efReGxMmRgghAc4X5bR9i/view?usp=sharing",
    architecture:
      "https://drive.google.com/file/d/1BE40CsGue0Hxn0wq0kwGlFIQJYRwMyzd/view?usp=sharing",
    report:
      "https://drive.google.com/file/d/1Q8xvZ1zMeTJrD3oc36DiKa9QoeH4zYX0/view?usp=sharing",
    virtualLab: "https://socketlab.vercel.app/",
  },
  {
    group: "15",
    title: "Exactly-Once Event De-duplication Engine",
    students: ["Mohit Kotwal", "Aayush Jadhav"],
    teacher: "Priya Ma'am",
    feasibility:
      "https://docs.google.com/document/d/1BnQiuDVj6fFc1ZoKKsC023UOpLcO3IzfSSNzpFb4e7k/edit?usp=sharing",
    architecture:
      "https://drive.google.com/file/d/18Kqnk3crL2F-FmQx8j9XzHihQ8t8EGWs/view?usp=sharing",
    virtualLab:
      "https://mohitto099.github.io/Exactly-Once-Event-Deduplication-Engine/",
  },
  {
    group: "18",
    title: "Tiered Edge Caching Hierarchy with Request Collapsing and Origin",
    students: ["Lochna Paryani", "Sanika Mejari"],
    teacher: "Richard Sir",
    feasibility:
      "https://drive.google.com/file/d/14zhe_PiOGH2-FxMXkJynCXY_sXfnkWPT/view?usp=sharing",
    architecture:
      "https://drive.google.com/file/d/1KWVpoeZZV0P4XxXlGheU5oimaXGflNGf/view?usp=sharing",
    report:
      "https://drive.google.com/file/d/10wlkaKd1vmg2Jw6SkIKeDySpg_3a5gJ/view?usp=sharing",
    virtualLab: "https://edge-cdn-virtual-lab.netlify.app/",
  },
  {
    group: "19",
    title: "Chunk-Level Storage Deduplication Engine",
    students: ["Krishna Lohana", "Neilsen Vaz"],
    teacher: "Priya Ma'am",
    feasibility:
      "https://docs.google.com/document/d/1KFSip_EB7tz5ztQ7EkOaIcsvdwhkc3C4/edit?usp=sharing",
    architecture:
      "https://drive.google.com/file/d/19pU4ncwBBnCS_F8lgzTmoIa6vX7E-3dz/view?usp=sharing",
    report:
      "https://docs.google.com/document/d/1ILAsJjsTJiZc2KhQSJz-QSGSm6m-gHQMO3HsdlvzthM/edit?usp=sharing",
    virtualLab:
      "https://breakscale.tech/?s=8pMPySiOi5Qvig#k=l_HoBkc_QEt1gATdX9E41A",
  },
  {
    group: "23",
    title: "Multi-Region Active-Passive Failover Controller",
    students: ["Darshan Kankekar", "Chetna Ramnani"],
    teacher: "Priya Ma'am",
    feasibility:
      "https://docs.google.com/document/d/1-HQtsyxuGASATk2lWnf5EmMkrWLioDoz/edit?usp=sharing",
    architecture:
      "https://drive.google.com/file/d/1x9RCr8nuUdJlr2WVoRHr36yF9s4RTO8a/view?usp=sharing",
    report:
      "https://docs.google.com/document/d/1iUFXhmog2gW-QbiF5B4LrFDJb-OA6Jdn/edit?usp=sharing",
    virtualLab: "https://failoverlab.netlify.app/",
  },
  {
    group: "25",
    title: "Distributed Log Aggregator & Indexer",
    students: ["Jeegnasa Makwana", "Leena Chavan"],
    teacher: "Priya Ma'am",
    feasibility:
      "https://docs.google.com/document/d/1Vg1dLyh-8b7j62pyqKn7ZelyUNWSlmbJ/edit?usp=drive_link",
    architecture:
      "https://drive.google.com/file/d/1QdrgLIpxEx1bNztyRYogkfWjA9PIMaHu/view?usp=drive_link",
    report:
      "https://docs.google.com/document/d/10Lp3OmW-A1xN_UBi13aPIMUfGGB8FqXy/edit?usp=drive_link",
    virtualLab:
      "https://breakscale.tech/?s=jZRH_cpv35twVQ#k=DH7cEolTXlKc3MgUgEmWGQ",
  },
  {
    group: "34",
    title: "Cross-Cloud Service Discovery Registry",
    students: ["Ketaki Patil", "Swarangi Savekar"],
    teacher: "Priya Ma'am",
    feasibility:
      "https://docs.google.com/document/d/12YVUYUo-CDyd2qqc-9RAH075nCSaWJmobvuWmhQqH1I/edit?usp=sharing",
    architecture:
      "https://drive.google.com/drive/folders/1b0WPH1OrzYrpTITkQdsfBlEE8mZctY1i?usp=sharing",
    report:
      "https://docs.google.com/document/d/1bOaNiMuLeYbV8753wh_1aRqSRTdWiWwDr6AJesAWz4E/edit?usp=sharing",
    virtualLab:
      "https://breakscale.tech/?s=PZMQ5BxVwfzB7g#k=glm4yn7M6l1ulZoHca9yzw",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [documentFilter, setDocumentFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.group.toLowerCase().includes(query) ||
        project.students.some((student) =>
          student.toLowerCase().includes(query)
        ) ||
        project.teacher.toLowerCase().includes(query);

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
                placeholder="Search title, student, group or teacher..."
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

          <div className="hidden grid-cols-[70px_minmax(0,1fr)_minmax(150px,0.7fr)_auto] gap-5 border-b border-[#deded8] py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#898a82] md:grid">
            <span>Group</span>
            <span>Project / Team</span>
            <span>Supervisor</span>
            <span className="text-right">Resources</span>
          </div>

          <div>
            {filteredProjects.map((project, index) => (
              <article
                key={`${project.group}-${project.title}-${index}`}
                className="group border-b border-[#deded8] py-6 transition-colors hover:bg-white sm:py-7"
              >
                <div className="grid gap-4 md:grid-cols-[70px_minmax(0,1fr)_minmax(150px,0.7fr)_auto] md:items-start md:gap-5">
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

                  <div className="text-sm text-[#777970]">
                    <span className="mr-2 text-[10px] uppercase tracking-wider text-[#a1a198] md:hidden">
                      Supervisor:
                    </span>
                    {project.teacher}
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

          {filteredProjects.length === 0 && (
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