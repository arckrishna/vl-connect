"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { initialRawProjects, RawProject } from "./initialProjects";

type Project = {
  group: string;
  originalGroup?: string;
  title: string;
  students: string[];
  feasibility?: string;
  architecture?: string;
  report?: string;
  virtualLab?: string;
};

// Helper function to map raw API/sheet rows to projects
function mapRawProjects(data: RawProject[]): Project[] {
  return data.map((item, index) => {
    const groupNumber = index + 1;
    return {
      group: String(groupNumber),
      originalGroup: item.group ? String(item.group) : "",
      title: `Group ${groupNumber} Project`,
      students: [item.student1, item.student2].filter(
        (student): student is string => Boolean(student && student.trim())
      ),
      virtualLab: item.virtualLab || "",
      feasibility: item.feasibility || "",
      architecture: item.architecture || "",
      report: item.report || "",
    };
  });
}

export default function Home() {
  // Pre-seed state with initialRawProjects so page is NEVER empty on initial render
  const [projects, setProjects] = useState<Project[]>(() =>
    mapRawProjects(initialRawProjects)
  );
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [documentFilter, setDocumentFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Fetch updates in the background without clearing current projects
  useEffect(() => {
    async function loadProjects() {
      try {
        setIsRefreshing(true);
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error("Unable to sync latest projects.");
        }

        const data: RawProject[] = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setProjects(mapRawProjects(data));
          setLoadError("");
        }
      } catch (error) {
        console.error("Background sync note:", error);
        // Do not overwrite pre-seeded data if background fetch fails
      } finally {
        setIsRefreshing(false);
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
        Boolean(
          project.originalGroup &&
            project.originalGroup.toLowerCase().includes(query)
        ) ||
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
        (documentFilter === "feasibility" && Boolean(project.feasibility)) ||
        (documentFilter === "architecture" && Boolean(project.architecture)) ||
        (documentFilter === "report" && Boolean(project.report)) ||
        (documentFilter === "complete" && resourceCount === 4);

      return matchesSearch && matchesFilter;
    });
  }, [projects, search, documentFilter]);

  // Resource statistics
  const stats = useMemo(() => {
    const total = projects.length;
    const withLab = projects.filter((p) => p.virtualLab).length;
    const withArch = projects.filter((p) => p.architecture).length;
    const withReport = projects.filter((p) => p.report).length;
    const withFeas = projects.filter((p) => p.feasibility).length;
    const fullyComplete = projects.filter(
      (p) => p.virtualLab && p.architecture && p.report && p.feasibility
    ).length;

    // unique students count
    const allStudents = new Set<string>();
    projects.forEach((p) => p.students.forEach((s) => allStudents.add(s.trim())));

    return {
      total,
      withLab,
      withArch,
      withReport,
      withFeas,
      fullyComplete,
      totalStudents: allStudents.size,
    };
  }, [projects]);

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#1E2024]">
      {/* 1. Official Top Information Banner */}
      <div className="bg-[#6E121E] text-white text-xs border-b border-[#540D17]">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-center md:text-left">
            <span className="font-semibold tracking-wide text-amber-200">
              VIVEKANAND EDUCATION SOCIETY&apos;S INSTITUTE OF TECHNOLOGY (AUTONOMOUS)
            </span>
            <span className="hidden lg:inline text-white/50">|</span>
            <span className="text-white/80 hidden sm:inline">
              Affiliated to University of Mumbai • Approved by AICTE • NAAC &apos;A+&apos; Grade
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-white/90">
            <span className="inline-flex items-center gap-1.5 bg-[#8B1E2D] px-2.5 py-0.5 rounded-full border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Autonomous Institute
            </span>
            <a
              href="https://vesit.ves.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-200 transition underline underline-offset-2 flex items-center gap-1"
            >
              vesit.ves.ac.in ↗
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Institutional Navbar with VESIT Logo */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Titles */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative h-12 w-32 sm:h-14 sm:w-44 flex items-center">
                  <Image
                    src="/vesit-logo.png"
                    alt="VESIT - Vivekanand Education Society's Institute of Technology"
                    fill
                    priority
                    sizes="(max-width: 640px) 128px, 176px"
                    className="object-contain"
                  />
                </div>
                <div className="hidden md:block pl-3 border-l border-gray-300">
                  <div className="text-base font-bold tracking-tight text-[#8B1E2D] flex items-center gap-1.5">
                    VL-CONNECT
                    <span className="text-[10px] font-semibold bg-[#8B1E2D]/10 text-[#8B1E2D] px-1.5 py-0.5 rounded">
                      STUDENT LABS
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    Department of Information Technology & Engineering
                  </p>
                </div>
              </Link>
            </div>

            {/* Quick Links & Actions */}
            <div className="flex items-center gap-3 sm:gap-6">
              <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
                <a
                  href="#projects"
                  className="hover:text-[#8B1E2D] transition py-1 border-b-2 border-transparent hover:border-[#8B1E2D]"
                >
                  Project Directory
                </a>
                <a
                  href="#about"
                  className="hover:text-[#8B1E2D] transition py-1 border-b-2 border-transparent hover:border-[#8B1E2D]"
                >
                  About VESIT
                </a>
                <a
                  href="https://vesit.ves.ac.in/research/research-and-development/research-forum/research-facilities/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8B1E2D] transition py-1 border-b-2 border-transparent hover:border-[#8B1E2D]"
                >
                  Research Labs ↗
                </a>
              </nav>

              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#8B1E2D] border border-[#8B1E2D]/30 rounded-lg hover:bg-[#8B1E2D]/5 transition"
                >
                  <svg
                    className="w-4 h-4 text-[#8B1E2D]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Student Sign In</span>
                </Link>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#8B1E2D] hover:bg-[#73121F] rounded-lg shadow-sm transition"
                >
                  <span>Browse Projects</span>
                  <span>↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Hero Section: Rich VESIT Collegiate Theme */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#101D2C] via-[#142A3E] to-[#1A344D] text-white">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C59B27_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B1E2D]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-medium text-amber-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>VESIT Engineering Virtual Lab Initiative</span>
              <span className="text-white/40">•</span>
              <span className="text-white/80">Batch 2025–2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Virtual Laboratories &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100">
                System Design Registry
              </span>
            </h1>

            {/* Swami Vivekananda Motto quote */}
            <div className="mt-4 pl-4 border-l-2 border-amber-400/60 text-sm italic text-amber-100/90 font-serif">
              &ldquo;Arise, awake, and stop not till the goal is reached.&rdquo;
              <span className="block text-xs not-italic font-sans text-white/50 mt-0.5">
                — Swami Vivekananda, Inspiration of VES Institutions
              </span>
            </div>

            <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed">
              An open-access academic portal built and maintained by VESIT student engineers.
              Explore interactive distributed systems simulators, technical feasibility analyses,
              high-level architectural blueprints, and capstone research documentation.
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#8B1E2D] hover:bg-[#A32335] text-white font-semibold text-sm transition shadow-lg shadow-[#8B1E2D]/30"
              >
                <span>Explore All {stats.total} Projects</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>

              <a
                href="https://vesit.ves.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 transition"
              >
                <span>VESIT Official Site</span>
                <span className="text-amber-200">↗</span>
              </a>

              {isRefreshing && (
                <div className="inline-flex items-center gap-2 text-xs text-amber-200/80 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-spin"></span>
                  <span>Syncing with Live Registry...</span>
                </div>
              )}
            </div>
          </div>

          {/* Metric KPI cards */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6 border-t border-white/15 pt-10">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-300">
                {String(stats.total).padStart(2, "0")}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/70">
                Capstone Projects
              </p>
              <p className="mt-0.5 text-[11px] text-white/40">Concurrently indexed</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-300">
                {String(stats.withLab).padStart(2, "0")}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/70">
                Live Virtual Labs
              </p>
              <p className="mt-0.5 text-[11px] text-white/40">Web interactive sims</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
              <p className="text-3xl sm:text-4xl font-extrabold text-sky-300">
                {String(stats.totalStudents).padStart(2, "0")}+
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/70">
                VESIT Students
              </p>
              <p className="mt-0.5 text-[11px] text-white/40">Authors &amp; Contributors</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-200">
                100%
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/70">
                Autonomous
              </p>
              <p className="mt-0.5 text-[11px] text-white/40">Student-driven portal</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Projects Directory Section */}
      <section id="projects" className="scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E2D]">
                <span className="w-2 h-2 rounded-full bg-[#8B1E2D]"></span>
                <span>Academic Directory</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#101D2C]">
                Student Project &amp; Simulation Archives
              </h2>
              <p className="mt-1.5 text-sm text-gray-600">
                Showing {filteredProjects.length} of {projects.length} project records.
                Directly access online virtual labs, feasibility docs, architecture, and reports.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <div className="flex items-center p-1 bg-gray-100 rounded-lg border border-gray-200 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${
                    viewMode === "grid"
                      ? "bg-white text-[#8B1E2D] shadow-xs font-semibold"
                      : "text-gray-600 hover:text-black"
                  }`}
                  aria-label="Grid View"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${
                    viewMode === "table"
                      ? "bg-white text-[#8B1E2D] shadow-xs font-semibold"
                      : "text-gray-600 hover:text-black"
                  }`}
                  aria-label="Table View"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span>Table</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar & Filter Strip */}
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              {/* Search input */}
              <div className="lg:col-span-8 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by group number (e.g. 1, 2) or student name (e.g. Mamta, Talha)..."
                  className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D] shadow-xs transition"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 text-xs"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Dropdown selector for filters */}
              <div className="lg:col-span-4">
                <select
                  value={documentFilter}
                  onChange={(e) => setDocumentFilter(e.target.value)}
                  className="w-full py-3 px-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 focus:border-[#8B1E2D] shadow-xs font-medium text-gray-700 cursor-pointer"
                >
                  <option value="all">📁 All Projects ({projects.length})</option>
                  <option value="lab">🧪 Virtual Lab Available ({stats.withLab})</option>
                  <option value="architecture">📐 Architecture Blueprint ({stats.withArch})</option>
                  <option value="feasibility">📄 Feasibility Study ({stats.withFeas})</option>
                  <option value="report">📑 Final Project Report ({stats.withReport})</option>
                  <option value="complete">⭐ Complete Suite 4/4 ({stats.fullyComplete})</option>
                </select>
              </div>
            </div>

            {/* Quick interactive filter pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-gray-500 mr-1">Filter by:</span>
              <button
                type="button"
                onClick={() => setDocumentFilter("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  documentFilter === "all"
                    ? "bg-[#8B1E2D] text-white shadow-xs"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                All Projects ({projects.length})
              </button>
              <button
                type="button"
                onClick={() => setDocumentFilter("lab")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  documentFilter === "lab"
                    ? "bg-[#0D9488] text-white shadow-xs"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                Virtual Labs ({stats.withLab})
              </button>
              <button
                type="button"
                onClick={() => setDocumentFilter("architecture")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  documentFilter === "architecture"
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Architecture ({stats.withArch})
              </button>
              <button
                type="button"
                onClick={() => setDocumentFilter("feasibility")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  documentFilter === "feasibility"
                    ? "bg-[#D97706] text-white shadow-xs"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Feasibility ({stats.withFeas})
              </button>
              <button
                type="button"
                onClick={() => setDocumentFilter("report")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  documentFilter === "report"
                    ? "bg-[#7C3AED] text-white shadow-xs"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                Reports ({stats.withReport})
              </button>
              <button
                type="button"
                onClick={() => setDocumentFilter("complete")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  documentFilter === "complete"
                    ? "bg-[#6E121E] text-amber-200 border border-amber-300/40 shadow-xs"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                ⭐ 4/4 Verified ({stats.fullyComplete})
              </button>
            </div>
          </div>

          {/* Error Message if API fails completely */}
          {loadError && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800 flex items-center justify-between">
              <span>{loadError}</span>
              <button
                onClick={() => window.location.reload()}
                className="text-xs font-bold underline"
              >
                Retry
              </button>
            </div>
          )}

          {/* 5. Rendered Project List / Cards */}
          <div className="mt-8">
            {viewMode === "grid" ? (
              /* CARD GRID VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => {
                  const resourceCount = [
                    project.virtualLab,
                    project.feasibility,
                    project.architecture,
                    project.report,
                  ].filter(Boolean).length;

                  return (
                    <div
                      key={`card-${project.group}-${index}`}
                      className="group bg-white rounded-2xl border border-gray-200/90 hover:border-[#8B1E2D]/50 hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between relative overflow-hidden"
                    >
                      {/* Top Corner Ribbon / Badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#8B1E2D] text-white font-extrabold text-sm shadow-xs">
                            {project.group}
                          </span>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E2D]">
                              GROUP {project.group.padStart(2, "0")}
                            </span>
                            {project.originalGroup && (
                              <span className="block text-[10px] text-gray-400">
                                Sheet Ref: G-{project.originalGroup}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Completion tag */}
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70">
                          <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{resourceCount}/4 Ready</span>
                        </div>
                      </div>

                      {/* Title & Students */}
                      <div className="grow">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#8B1E2D] transition-colors leading-snug">
                          {project.title}
                        </h3>

                        {/* Student team members */}
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 mb-2">
                            VESIT Student Team
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.students.map((student, sIdx) => (
                              <span
                                key={`stud-${sIdx}`}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-gray-200 text-xs font-medium text-gray-800"
                              >
                                <span className="w-4 h-4 rounded-full bg-[#8B1E2D]/10 text-[#8B1E2D] font-bold text-[10px] flex items-center justify-center">
                                  {student.charAt(0)}
                                </span>
                                {student}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Resource Action Links */}
                      <div className="mt-6 pt-4 border-t border-gray-100 space-y-2.5">
                        {/* Primary Virtual Lab Link */}
                        {project.virtualLab ? (
                          <a
                            href={project.virtualLab}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B1E2D] to-[#A32335] hover:from-[#73121F] hover:to-[#8B1E2D] text-white font-semibold text-xs transition shadow-sm group/btn"
                          >
                            <span className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                              </svg>
                              <span>Launch Virtual Lab</span>
                            </span>
                            <span className="transition-transform group-hover/btn:translate-x-1">
                              ↗
                            </span>
                          </a>
                        ) : (
                          <div className="text-center py-2 text-xs text-gray-400 bg-gray-50 rounded-lg">
                            Lab Under Deployment
                          </div>
                        )}

                        {/* Other Document Resources */}
                        <div className="grid grid-cols-3 gap-1.5 pt-1 text-center">
                          {project.feasibility ? (
                            <a
                              href={project.feasibility}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1.5 rounded-lg bg-gray-50 hover:bg-amber-50 hover:border-amber-200 border border-gray-200 text-[11px] font-medium text-gray-700 hover:text-amber-800 transition"
                              title="View Feasibility Report"
                            >
                              Feasibility
                            </a>
                          ) : (
                            <span className="px-2 py-1.5 rounded-lg bg-gray-50/50 border border-dashed border-gray-200 text-[11px] text-gray-400">
                              Feasibility
                            </span>
                          )}

                          {project.architecture ? (
                            <a
                              href={project.architecture}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1.5 rounded-lg bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 text-[11px] font-medium text-gray-700 hover:text-blue-800 transition"
                              title="View Architecture Blueprint"
                            >
                              Architecture
                            </a>
                          ) : (
                            <span className="px-2 py-1.5 rounded-lg bg-gray-50/50 border border-dashed border-gray-200 text-[11px] text-gray-400">
                              Architecture
                            </span>
                          )}

                          {project.report ? (
                            <a
                              href={project.report}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1.5 rounded-lg bg-gray-50 hover:bg-purple-50 hover:border-purple-200 border border-gray-200 text-[11px] font-medium text-gray-700 hover:text-purple-800 transition"
                              title="View Project Report"
                            >
                              Report
                            </a>
                          ) : (
                            <span className="px-2 py-1.5 rounded-lg bg-gray-50/50 border border-dashed border-gray-200 text-[11px] text-gray-400">
                              Report
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* COMPACT TABLE REGISTRY VIEW */
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#101D2C] text-white text-xs uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3.5 px-4">Group</th>
                        <th className="py-3.5 px-4">Project &amp; Team</th>
                        <th className="py-3.5 px-4">Virtual Lab Simulator</th>
                        <th className="py-3.5 px-4">Feasibility</th>
                        <th className="py-3.5 px-4">Architecture</th>
                        <th className="py-3.5 px-4">Report</th>
                        <th className="py-3.5 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProjects.map((project, index) => {
                        const resourceCount = [
                          project.virtualLab,
                          project.feasibility,
                          project.architecture,
                          project.report,
                        ].filter(Boolean).length;

                        return (
                          <tr
                            key={`table-${project.group}-${index}`}
                            className="hover:bg-amber-50/30 transition-colors"
                          >
                            <td className="py-4 px-4 font-bold text-[#8B1E2D] tabular-nums">
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#8B1E2D]/10 text-[#8B1E2D] font-extrabold text-xs">
                                {project.group}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-semibold text-gray-900">
                                {project.title}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {project.students.join(" • ")}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              {project.virtualLab ? (
                                <a
                                  href={project.virtualLab}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 font-bold text-[#8B1E2D] hover:underline text-xs bg-[#8B1E2D]/5 px-2.5 py-1 rounded-md"
                                >
                                  <span>Open Lab</span>
                                  <span>↗</span>
                                </a>
                              ) : (
                                <span className="text-gray-400 text-xs">—</span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              {project.feasibility ? (
                                <a
                                  href={project.feasibility}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-gray-600 hover:text-black hover:underline"
                                >
                                  Document ↗
                                </a>
                              ) : (
                                <span className="text-gray-400 text-xs">—</span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              {project.architecture ? (
                                <a
                                  href={project.architecture}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-gray-600 hover:text-black hover:underline"
                                >
                                  Blueprint ↗
                                </a>
                              ) : (
                                <span className="text-gray-400 text-xs">—</span>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              {project.report ? (
                                <a
                                  href={project.report}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-gray-600 hover:text-black hover:underline"
                                >
                                  Report ↗
                                </a>
                              ) : (
                                <span className="text-gray-400 text-xs">—</span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                {resourceCount}/4
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Empty Search / Filter State */}
            {filteredProjects.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center mt-6">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-[#8B1E2D] flex items-center justify-center mx-auto mb-3 text-xl">
                  🔍
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  No matching student projects found
                </h3>
                <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                  We couldn&apos;t find any projects matching &ldquo;{search}&rdquo; with the selected filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setDocumentFilter("all");
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#8B1E2D] text-white text-xs font-semibold rounded-lg hover:bg-[#73121F] transition"
                >
                  Clear Filters &amp; Show All {projects.length} Projects
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. VESIT Institutional Footer & Credits */}
      <footer id="about" className="bg-[#101D2C] text-white border-t border-white/10 mt-12">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
            {/* Col 1: Institute Brand & Motto */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-44 bg-white p-1 rounded-lg">
                  <Image
                    src="/vesit-logo.png"
                    alt="VESIT"
                    fill
                    sizes="176px"
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-xs text-white/70 max-w-md leading-relaxed">
                <strong className="text-white">Vivekanand Education Society&apos;s Institute of Technology (VESIT)</strong> was established in 1984.
                An Autonomous Institute affiliated to the University of Mumbai, approved by AICTE,
                and accredited with &apos;A+&apos; Grade by NAAC.
              </p>
              <div className="text-xs text-amber-200/90 font-serif italic">
                &ldquo;Education is the manifestation of the perfection already in man.&rdquo; — Swami Vivekananda
              </div>
            </div>

            {/* Col 2: Campus Location */}
            <div className="space-y-2 text-xs text-white/70">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider text-amber-300">
                Campus Location
              </h4>
              <p className="leading-relaxed">
                Hashu Advani Memorial Complex,<br />
                Collector&apos;s Colony, Chembur,<br />
                Mumbai, Maharashtra - 400074.<br />
                India.
              </p>
              <p className="pt-2">
                <strong className="text-white">Email:</strong> vesit@ves.ac.in<br />
                <strong className="text-white">Phone:</strong> +91-22-61532510 / 25227411
              </p>
            </div>

            {/* Col 3: Academic Resources */}
            <div className="space-y-2 text-xs text-white/70">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider text-amber-300">
                Institutional Portals
              </h4>
              <ul className="space-y-1.5">
                <li>
                  <a
                    href="https://vesit.ves.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-200 transition"
                  >
                    VESIT Official Website ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://ves.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-200 transition"
                  >
                    VES Society Portal ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://vesit.ves.ac.in/research/research-and-development/research-forum/research-facilities/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-200 transition"
                  >
                    Research &amp; Innovation Cell ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://vesit.ves.ac.in/students-corner/activities/extra-curricular-activities/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-200 transition"
                  >
                    Student Life &amp; Councils ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <p>
              © 2026 VESIT VL-CONNECT • Built &amp; Maintained by VESIT Engineering Students.
            </p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-amber-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                NAAC A+ Autonomous Engineering Institute
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
