"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { initialRawProjects, RawProject } from "./initialProjects";
import { supabase } from "@/lib/supabaseClient";

type Project = {
  group: string;
  originalGroup?: string;
  priyaIndex: number;
  richardIndex: number;
  allIndex: number;
  title: string;
  students: string[];
  feasibility?: string;
  architecture?: string;
  report?: string;
  virtualLab?: string;
  mentor?: string;
};

// Helper function to calculate clean sequential display number based on active mentor
function getDisplayGroup(
  project: Project,
  selectedMentor: "priya" | "richard" | "all" | null
): string {
  if (selectedMentor === "priya") {
    return String(project.priyaIndex || 1);
  }
  if (selectedMentor === "richard") {
    return String(project.richardIndex || 1);
  }
  // When selectedMentor is "all" or null: Dr. Priya 1-25, Mr. Richard 26-46
  return String(project.allIndex || 1);
}

// Helper function to map raw API/sheet rows to projects
function mapRawProjects(data: RawProject[]): Project[] {
  let priyaCounter = 0;
  let richardCounter = 0;

  return data.map((item, index) => {
    const fallbackTitle = item.title || `Group ${index + 1} Project`;
    const itemAny = item as Record<string, any>;
    const dynamicTitle =
      (typeof itemAny["title"] === "string" && itemAny["title"].trim()) ||
      (typeof itemAny["Title"] === "string" && itemAny["Title"].trim()) ||
      (typeof itemAny["projectTitle"] === "string" && itemAny["projectTitle"].trim()) ||
      (typeof itemAny["Project Title"] === "string" && itemAny["Project Title"].trim()) ||
      (typeof itemAny["project_title"] === "string" && itemAny["project_title"].trim()) ||
      (typeof itemAny["topic"] === "string" && itemAny["topic"].trim()) ||
      "";

    const resolvedTitle = dynamicTitle || fallbackTitle;
    const resolvedMentor =
      item.mentor ||
      itemAny["mentor"] ||
      itemAny["facultyMentor"] ||
      (index < 25 ? "Dr. Priya R. L." : "Mr. Richard Joseph");

    const isPriya = resolvedMentor.toLowerCase().includes("priya");
    let priyaIndex = 0;
    let richardIndex = 0;
    let allIndex = 0;

    if (isPriya) {
      priyaCounter++;
      priyaIndex = priyaCounter;
      allIndex = priyaCounter; // 1 to 25
    } else {
      richardCounter++;
      richardIndex = richardCounter;
      allIndex = 25 + richardCounter; // 26 to 46
    }

    return {
      group: isPriya ? String(priyaIndex) : String(richardIndex),
      priyaIndex,
      richardIndex,
      allIndex,
      originalGroup: item.group ? String(item.group) : String(index + 1),
      title: resolvedTitle,
      students: [item.student1, item.student2].filter(
        (student): student is string => Boolean(student && student.trim())
      ),
      virtualLab: item.virtualLab || "",
      feasibility: item.feasibility || "",
      architecture: item.architecture || "",
      report: item.report || "",
      mentor: resolvedMentor,
    };
  });
}

export default function Home() {
  // Pre-seed state with initialRawProjects so page is NEVER empty on initial render
  const [projects, setProjects] = useState<Project[]>(() =>
    mapRawProjects(initialRawProjects)
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>("Synced");
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [documentFilter, setDocumentFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Multi-Mentor Academic Division State: null (default on login/entry) | "priya" | "richard" | "all"
  const [selectedMentor, setSelectedMentor] = useState<"priya" | "richard" | "all" | null>(null);

  const [currentUser, setCurrentUser] = useState<any>(null);

  // Check Supabase session & local demo session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser(session.user);
      } else {
        const local = typeof window !== "undefined" ? localStorage.getItem("vl_connect_user") : null;
        if (local) {
          try {
            setCurrentUser(JSON.parse(local));
          } catch {}
        }
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentUser(session.user);
      } else {
        const local = typeof window !== "undefined" ? localStorage.getItem("vl_connect_user") : null;
        if (local) {
          try {
            setCurrentUser(JSON.parse(local));
          } catch {}
        } else {
          setCurrentUser(null);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Function to dynamically sync latest rows from Supabase / Google Sheet
  const syncWithSheet = async (forceFresh = false) => {
    try {
      setIsRefreshing(true);
      const url = forceFresh ? "/api/projects?fresh=true" : "/api/projects";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to sync latest projects.");
      }

      const data: RawProject[] = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setProjects(mapRawProjects(data));
        setLoadError("");
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
    } catch (error) {
      console.error("Sheet sync note:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Sync on initial mount, and auto-poll every 45s
  useEffect(() => {
    syncWithSheet(false);

    const intervalId = setInterval(() => {
      syncWithSheet(false);
    }, 45000);

    return () => clearInterval(intervalId);
  }, []);

  // Mentor Counts
  const priyaProjectsCount = useMemo(
    () => projects.filter((p) => (p.mentor || "").toLowerCase().includes("priya")).length,
    [projects]
  );
  const richardProjectsCount = useMemo(
    () => projects.filter((p) => (p.mentor || "").toLowerCase().includes("richard")).length,
    [projects]
  );

  // Projects filtered by selected mentor (empty if none selected yet)
  const mentorFilteredProjects = useMemo(() => {
    if (selectedMentor === "priya") {
      return projects.filter((p) => (p.mentor || "").toLowerCase().includes("priya"));
    }
    if (selectedMentor === "richard") {
      return projects.filter((p) => (p.mentor || "").toLowerCase().includes("richard"));
    }
    if (selectedMentor === "all") {
      return projects;
    }
    return [];
  }, [projects, selectedMentor]);

  // Dynamic Statistics based on active mentor selection (falls back to full list if none selected)
  const stats = useMemo(() => {
    const list = selectedMentor ? mentorFilteredProjects : projects;
    const withLab = list.filter((p) => p.virtualLab && p.virtualLab.trim()).length;
    const withArch = list.filter((p) => p.architecture && p.architecture.trim()).length;
    const withFeas = list.filter((p) => p.feasibility && p.feasibility.trim()).length;
    const withReport = list.filter((p) => p.report && p.report.trim()).length;
    const fullyComplete = list.filter(
      (p) =>
        p.virtualLab &&
        p.virtualLab.trim() &&
        p.architecture &&
        p.architecture.trim() &&
        p.feasibility &&
        p.feasibility.trim() &&
        p.report &&
        p.report.trim()
    ).length;

    const totalStudents = list.reduce(
      (acc, p) => acc + (p.students ? p.students.length : 0),
      0
    );

    return {
      total: list.length,
      withLab,
      withArch,
      withFeas,
      withReport,
      fullyComplete,
      totalStudents,
    };
  }, [selectedMentor, mentorFilteredProjects, projects]);

  // Search & Document Filters applied on top of active mentor
  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return mentorFilteredProjects.filter((project) => {
      const displayGroup = getDisplayGroup(project, selectedMentor);
      const paddedGroup = displayGroup.padStart(2, "0");

      const matchesSearch =
        !query ||
        displayGroup === query ||
        paddedGroup === query ||
        project.title.toLowerCase().includes(query) ||
        project.group.toLowerCase().includes(query) ||
        Boolean(
          project.originalGroup &&
            project.originalGroup.toLowerCase().includes(query)
        ) ||
        project.students.some((student) =>
          student.toLowerCase().includes(query)
        );

      if (!matchesSearch) return false;

      if (documentFilter === "lab") {
        return Boolean(project.virtualLab && project.virtualLab.trim());
      }
      if (documentFilter === "architecture") {
        return Boolean(project.architecture && project.architecture.trim());
      }
      if (documentFilter === "feasibility") {
        return Boolean(project.feasibility && project.feasibility.trim());
      }
      if (documentFilter === "report") {
        return Boolean(project.report && project.report.trim());
      }
      if (documentFilter === "complete") {
        return Boolean(
          project.virtualLab &&
            project.virtualLab.trim() &&
            project.architecture &&
            project.architecture.trim() &&
            project.feasibility &&
            project.feasibility.trim() &&
            project.report &&
            project.report.trim()
        );
      }

      return true;
    });
  }, [mentorFilteredProjects, search, documentFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1E2024]">
      {/* 1. Official VESIT Autonomous Top Header Bar */}
      <div className="bg-[#6E121E] text-white text-xs py-2 px-4 border-b border-[#540D17]">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="font-bold">
              VIVEKANAND EDUCATION SOCIETY&apos;S INSTITUTE OF TECHNOLOGY (AUTONOMOUS)
            </span>
            <span className="hidden md:inline text-white/50">|</span>
            <span className="hidden md:inline text-white/80">
              Affiliated to University of Mumbai • Approved by AICTE • NAAC &apos;A+&apos; Grade
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/90">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Autonomous Institute
            </span>
            <a
              href="https://vesit.ves.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-200 transition underline underline-offset-2"
            >
              vesit.ves.ac.in ↗
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Institutional Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Official VESIT Crest & Portal Title */}
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-44 sm:w-52">
                <Image
                  src="/vesit-logo.png"
                  alt="VESIT Institutional Logo"
                  fill
                  priority
                  sizes="(max-width: 640px) 176px, 208px"
                  className="object-contain"
                />
              </div>

              <div className="hidden sm:block h-10 w-px bg-gray-200 mx-1" />

              <div className="hidden sm:flex items-center gap-3">
                <div className="relative h-11 w-44">
                  <Image
                    src="/projectsphere-logo.png"
                    alt="ProjectSphere - Connecting Ideas, Projects, People"
                    fill
                    priority
                    sizes="176px"
                    className="object-contain object-left"
                  />
                </div>
                <div className="h-8 w-px bg-gray-200" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#8B1E2D]/10 text-[#8B1E2D] uppercase tracking-wider">
                      STUDENT LABS
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium leading-tight mt-0.5">
                    Department of Computer Engineering
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Navigation Links, Auth Badge & Action Button */}
            <div className="flex items-center gap-4">
              <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-gray-700">
                <a
                  href="#mentors"
                  className="hover:text-[#8B1E2D] transition py-1 border-b-2 border-transparent hover:border-[#8B1E2D]"
                >
                  Faculty Mentors
                </a>
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
                {currentUser ? (
                  <div className="flex items-center gap-2">
                    {currentUser.email?.toLowerCase().endsWith("@ves.ac.in") ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-semibold max-w-[130px] truncate" title={currentUser.email}>
                          {currentUser.email?.split("@")[0]}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                          VESIT
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-800 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="font-semibold max-w-[130px] truncate" title={currentUser.email}>
                          {currentUser.email?.split("@")[0]}
                        </span>
                        <span className="text-[10px] text-blue-700 font-bold bg-blue-100 px-1.5 py-0.5 rounded">
                          Guest
                        </span>
                      </div>
                    )}
                    <button
                      onClick={async () => {
                        await supabase.auth.signOut();
                        if (typeof window !== "undefined") {
                          localStorage.removeItem("vl_connect_user");
                        }
                        setCurrentUser(null);
                      }}
                      className="px-2.5 py-1.5 text-xs font-semibold text-gray-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                      title="Sign Out"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#8B1E2D] border border-[#8B1E2D]/30 rounded-lg hover:bg-[#8B1E2D]/5 transition"
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
                    <span>Student / Faculty Sign In</span>
                  </Link>
                )}

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
                href="#mentors"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#8B1E2D] hover:bg-[#A32335] text-white font-semibold text-sm transition shadow-lg shadow-[#8B1E2D]/30"
              >
                <span>Select Faculty Mentor</span>
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
                {String(projects.length).padStart(2, "0")}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/70">
                Capstone Projects
              </p>
              <p className="mt-0.5 text-[11px] text-white/40">Across 2 Faculty Divisions</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-300">
                {String(projects.filter(p => p.virtualLab && p.virtualLab.trim()).length).padStart(2, "0")}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/70">
                Live Virtual Labs
              </p>
              <p className="mt-0.5 text-[11px] text-white/40">Web interactive simulators</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
              <p className="text-3xl sm:text-4xl font-extrabold text-sky-300">
                {String(projects.reduce((acc, p) => acc + p.students.length, 0))}+
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/70">
                VESIT Students
              </p>
              <p className="mt-0.5 text-[11px] text-white/40">Authors &amp; Contributors</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-200">
                2 Mentors
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/70">
                Faculty Mentorship
              </p>
              <p className="mt-0.5 text-[11px] text-white/40">Dr. Priya &amp; Mr. Richard</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Faculty Mentors Selection Section (Interactive Cards) */}
      <section id="mentors" className="scroll-mt-24 py-12 sm:py-16 bg-[#FAF9F6] border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E2D]">
                <span className="w-2 h-2 rounded-full bg-[#8B1E2D]" />
                <span>Academic Faculty Mentorship</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101D2C]">
                Select Faculty Mentor
              </h2>
              <p className="mt-1 text-sm text-gray-600 max-w-2xl leading-relaxed">
                Click on a faculty mentor card below to focus on their students&apos; capstone research,
                interactive simulation laboratories, and system design architecture.
              </p>
            </div>

            {/* Quick Filter Switcher */}
            <div className="inline-flex p-1 bg-gray-200/80 rounded-xl text-xs font-semibold self-start md:self-auto">
              <button
                type="button"
                onClick={() => {
                  setSelectedMentor("all");
                  const el = document.getElementById("projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  selectedMentor === "all"
                    ? "bg-white text-[#8B1E2D] shadow-xs font-bold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All Mentors ({projects.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedMentor("priya");
                  const el = document.getElementById("projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  selectedMentor === "priya"
                    ? "bg-[#6E121E] text-white shadow-xs font-bold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Dr. Priya R. L. ({priyaProjectsCount})
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedMentor("richard");
                  const el = document.getElementById("projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  selectedMentor === "richard"
                    ? "bg-[#142A3E] text-white shadow-xs font-bold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Mr. Richard Joseph ({richardProjectsCount})
              </button>
            </div>
          </div>

          {/* Mentors Dual Interactive Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1: Dr. Priya R. L. */}
            <div
              onClick={() => {
                setSelectedMentor("priya");
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`cursor-pointer rounded-2xl p-6 sm:p-7 border transition-all duration-300 relative overflow-hidden group ${
                selectedMentor === "priya"
                  ? "bg-white border-[#8B1E2D] shadow-xl ring-2 ring-[#8B1E2D]/20"
                  : "bg-white border-gray-200 hover:border-[#8B1E2D]/40 hover:shadow-lg"
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6E121E] via-[#8B1E2D] to-[#C59B27]" />

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6E121E] to-[#9E1B32] text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-[#6E121E]/20">
                    PL
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Lead Faculty Mentor
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#8B1E2D] transition">
                      Dr. Priya R. L.
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Associate Professor, Department of Computer Engineering, VESIT
                    </p>
                  </div>
                </div>

                {selectedMentor === "priya" ? (
                  <span className="px-2.5 py-1 rounded-full bg-[#8B1E2D] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    ✓ Selected Mentor
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider group-hover:bg-[#8B1E2D]/10 group-hover:text-[#8B1E2D] transition">
                    Select Mentor
                  </span>
                )}
              </div>

              <p className="mt-4 text-xs text-gray-600 leading-relaxed">
                Mentorship division focusing on distributed consensus protocols (Raft, Paxos),
                geo-distributed active-active cache clusters, distributed locking, and append-only database engines.
              </p>

              {/* Stats row */}
              <div className="mt-5 grid grid-cols-3 gap-2 py-3 border-y border-gray-100 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">{priyaProjectsCount}</div>
                  <div className="text-[10px] uppercase font-semibold text-gray-400">Projects</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-emerald-600">25</div>
                  <div className="text-[10px] uppercase font-semibold text-gray-400">Virtual Labs</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">50+</div>
                  <div className="text-[10px] uppercase font-semibold text-gray-400">Students</div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-xs font-semibold">
                <span className="text-[#8B1E2D] group-hover:underline flex items-center gap-1.5">
                  <span>Explore Dr. Priya&apos;s Student Projects ({priyaProjectsCount})</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 font-bold px-2 py-0.5 rounded border border-emerald-200">
                  100% Labs Ready
                </span>
              </div>
            </div>

            {/* Card 2: Mr. Richard Joseph */}
            <div
              onClick={() => {
                setSelectedMentor("richard");
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`cursor-pointer rounded-2xl p-6 sm:p-7 border transition-all duration-300 relative overflow-hidden group ${
                selectedMentor === "richard"
                  ? "bg-white border-[#142A3E] shadow-xl ring-2 ring-[#142A3E]/20"
                  : "bg-white border-gray-200 hover:border-[#142A3E]/40 hover:shadow-lg"
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#142A3E] via-[#1E3A8A] to-[#2563EB]" />

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#142A3E] to-[#1E3A8A] text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-[#142A3E]/20">
                    RJ
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Lead Faculty Mentor
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#142A3E] transition">
                      Mr. Richard Joseph
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Assistant Professor, Department of Computer Engineering, VESIT
                    </p>
                  </div>
                </div>

                {selectedMentor === "richard" ? (
                  <span className="px-2.5 py-1 rounded-full bg-[#142A3E] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    ✓ Selected Mentor
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider group-hover:bg-[#142A3E]/10 group-hover:text-[#142A3E] transition">
                    Select Mentor
                  </span>
                )}
              </div>

              <p className="mt-4 text-xs text-gray-600 leading-relaxed">
                Mentorship division across multi-tenant encrypted database proxies, service mesh sidecars,
                time-series storage pipelines, edge CDN caching hierarchy, and Breakscale simulators.
              </p>

              {/* Stats row */}
              <div className="mt-5 grid grid-cols-3 gap-2 py-3 border-y border-gray-100 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">{richardProjectsCount}</div>
                  <div className="text-[10px] uppercase font-semibold text-gray-400">Projects</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">14</div>
                  <div className="text-[10px] uppercase font-semibold text-gray-400">Virtual Labs</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-indigo-600">42+</div>
                  <div className="text-[10px] uppercase font-semibold text-gray-400">Students</div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-xs font-semibold">
                <span className="text-[#142A3E] group-hover:underline flex items-center gap-1.5">
                  <span>Explore Mr. Richard&apos;s Student Projects ({richardProjectsCount})</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
                <span className="text-[11px] text-amber-700 bg-amber-50 font-bold px-2 py-0.5 rounded border border-amber-200">
                  Active Submissions
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Projects Directory Section */}
      <section id="projects" className="scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {selectedMentor === null ? (
            /* PROMPT STATE: NO MENTOR SELECTED YET (DEFAULT UPON ENTRY/LOGIN) */
            <div className="py-14 px-6 sm:px-12 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200 max-w-4xl mx-auto shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B1E2D]/10 to-[#142A3E]/10 border border-[#8B1E2D]/20 text-[#8B1E2D] flex items-center justify-center mx-auto text-3xl shadow-xs mb-5">
                🎓
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
                Faculty Mentor Selection Required
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#101D2C] tracking-tight">
                Select a Faculty Mentor to View Student Projects
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
                Choose a faculty mentor above or click below to inspect student capstone cohorts,
                interactive distributed systems virtual laboratories, and architecture blueprints.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMentor("priya");
                    const el = document.getElementById("projects");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#8B1E2D] hover:bg-[#A32335] text-white font-bold text-sm transition shadow-md shadow-[#8B1E2D]/20 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Explore Dr. Priya R. L. ({priyaProjectsCount} Projects)</span>
                  <span>→</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedMentor("richard");
                    const el = document.getElementById("projects");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#142A3E] hover:bg-[#1E3A8A] text-white font-bold text-sm transition shadow-md shadow-[#142A3E]/20 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span>Explore Mr. Richard Joseph ({richardProjectsCount} Projects)</span>
                  <span>→</span>
                </button>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-center gap-3 text-xs text-gray-500">
                <span>Or if you prefer:</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMentor("all");
                    const el = document.getElementById("projects");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="font-bold text-[#8B1E2D] hover:underline cursor-pointer"
                >
                  Browse all {projects.length} capstone projects across both divisions →
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Active Mentor Banner */}
              {selectedMentor === "priya" ? (
                <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-red-50 via-rose-50 to-amber-50/40 border border-red-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-[#6E121E] to-[#9E1B32] text-white font-extrabold text-lg flex items-center justify-center shadow-xs shrink-0">
                      PL
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#8B1E2D]">
                          Faculty Mentor
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                          25/25 Labs Verified (100%)
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight">
                        Dr. Priya R. L.&apos;s Student Projects ({filteredProjects.length} Teams)
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Associate Professor • Department of Computer Engineering, VESIT
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMentor(null);
                        const el = document.getElementById("mentors");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-2xs transition cursor-pointer"
                    >
                      <span>← Switch Faculty Mentor</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMentor("richard")}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#142A3E] hover:bg-[#1E3A8A] text-white text-xs font-bold shadow-2xs transition cursor-pointer"
                    >
                      <span>View Mr. Richard&apos;s Projects ({richardProjectsCount}) →</span>
                    </button>
                  </div>
                </div>
              ) : selectedMentor === "richard" ? (
                <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50/40 border border-blue-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-[#142A3E] to-[#1E3A8A] text-white font-extrabold text-lg flex items-center justify-center shadow-xs shrink-0">
                      RJ
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-wider font-extrabold text-blue-900">
                          Faculty Mentor
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-[11px] font-bold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded-full">
                          Active Student Submissions
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight">
                        Mr. Richard Joseph&apos;s Student Projects ({filteredProjects.length} Teams)
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Assistant Professor • Department of Computer Engineering, VESIT
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMentor(null);
                        const el = document.getElementById("mentors");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-2xs transition cursor-pointer"
                    >
                      <span>← Switch Faculty Mentor</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMentor("priya")}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#8B1E2D] hover:bg-[#A32335] text-white text-xs font-bold shadow-2xs transition cursor-pointer"
                    >
                      <span>View Dr. Priya&apos;s Projects ({priyaProjectsCount}) →</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-8 p-4 rounded-xl bg-gray-100 border border-gray-300 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">📁</span>
                    <div>
                      <span className="text-xs uppercase tracking-wider font-bold text-gray-600">
                        Combined Directory:
                      </span>
                      <span className="ml-1.5 font-bold text-gray-900 text-sm">
                        All Faculty Mentorship Projects ({projects.length} Teams)
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMentor(null);
                      const el = document.getElementById("mentors");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs font-bold text-[#8B1E2D] hover:underline cursor-pointer"
                  >
                    ← Select Specific Faculty Mentor
                  </button>
                </div>
              )}

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
                Showing {filteredProjects.length} of {mentorFilteredProjects.length} project records
                {selectedMentor !== "all" ? ` under ${selectedMentor === "priya" ? "Dr. Priya R. L." : "Mr. Richard Joseph"}` : ""}.
                Directly access online virtual labs, feasibility docs, architecture, and reports.
              </p>
            </div>

            {/* View Mode Switcher & Live Sheet Sync */}
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <button
                type="button"
                onClick={() => syncWithSheet(true)}
                disabled={isRefreshing}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 shadow-xs transition cursor-pointer disabled:opacity-60"
                title="Click to refresh database records immediately"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isRefreshing ? "bg-amber-400 animate-spin" : "bg-emerald-500 animate-pulse"
                  }`}
                ></span>
                <span>{isRefreshing ? "Refreshing..." : "Live Registry Synced"}</span>
                <span className="text-[10px] text-gray-400 font-normal hidden sm:inline">
                  ({lastSyncTime})
                </span>
              </button>

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
                  placeholder="Search by topic, group number (e.g. 1, 26), or student name..."
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
                  <option value="all">📁 All Projects ({stats.total})</option>
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
                All Projects ({stats.total})
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

          {/* Error Message if API fails */}
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

          {/* 6. Rendered Project List / Cards */}
          <div className="mt-8">
            {viewMode === "grid" ? (
              /* CARD GRID VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => {
                  const resourceCount = [
                    project.virtualLab && project.virtualLab.trim(),
                    project.feasibility && project.feasibility.trim(),
                    project.architecture && project.architecture.trim(),
                    project.report && project.report.trim(),
                  ].filter(Boolean).length;

                  const isRichard = (project.mentor || "").toLowerCase().includes("richard");
                  const displayGroup = getDisplayGroup(project, selectedMentor);

                  return (
                    <div
                      key={`card-${displayGroup}-${index}`}
                      className="group bg-white rounded-2xl border border-gray-200/90 hover:border-[#8B1E2D]/50 hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between relative overflow-hidden"
                    >
                      {/* Top Corner Ribbon / Badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-white font-extrabold text-xs shadow-xs ${
                            isRichard ? "bg-[#142A3E]" : "bg-[#8B1E2D]"
                          }`}>
                            {displayGroup}
                          </span>
                          <div>
                            <span className={`text-xs font-bold uppercase tracking-wider ${
                              isRichard ? "text-[#142A3E]" : "text-[#8B1E2D]"
                            }`}>
                              GROUP {displayGroup.padStart(2, "0")}
                            </span>
                            <span className="block text-[10px] text-gray-500 font-medium">
                              {isRichard ? "👨‍🏫 Mr. Richard Joseph" : "👩‍🏫 Dr. Priya R. L."}
                            </span>
                          </div>
                        </div>

                        {/* Readiness status pill (0/4, 1/4, 2/4, 3/4, 4/4) */}
                        <div className="flex items-center gap-1">
                          {resourceCount === 4 ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              4/4 Ready
                            </span>
                          ) : resourceCount === 3 ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              3/4 Ready
                            </span>
                          ) : resourceCount === 2 ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-orange-800 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                              2/4 In Progress
                            </span>
                          ) : resourceCount === 1 ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                              1/4 Started
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                              0/4 Pending
                            </span>
                          )}
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
                            {project.students.length > 0 ? (
                              project.students.map((student, sIdx) => (
                                <span
                                  key={`stud-${sIdx}`}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-gray-200 text-xs font-medium text-gray-800"
                                >
                                  <span className={`w-4 h-4 rounded-full font-bold text-[10px] flex items-center justify-center ${
                                    isRichard ? "bg-[#142A3E]/10 text-[#142A3E]" : "bg-[#8B1E2D]/10 text-[#8B1E2D]"
                                  }`}>
                                    {student.charAt(0)}
                                  </span>
                                  {student}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-gray-400 italic">Students unassigned</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Resource Action Links */}
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        {documentFilter === "architecture" ? (
                          project.architecture ? (
                            <a
                              href={project.architecture}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-xs transition shadow-sm group/btn"
                            >
                              <span className="flex items-center gap-2">
                                <span className="text-base">📐</span>
                                <span>Open Architecture Blueprint</span>
                              </span>
                              <span className="transition-transform group-hover/btn:translate-x-1">↗</span>
                            </a>
                          ) : (
                            <div className="text-center py-2.5 text-xs text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200 font-medium">
                              Architecture Blueprint Pending
                            </div>
                          )
                        ) : documentFilter === "lab" ? (
                          project.virtualLab ? (
                            <a
                              href={project.virtualLab}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-[#0D9488] to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold text-xs transition shadow-sm group/btn"
                            >
                              <span className="flex items-center gap-2">
                                <span className="text-base">🧪</span>
                                <span>Launch Virtual Lab Simulator</span>
                              </span>
                              <span className="transition-transform group-hover/btn:translate-x-1">↗</span>
                            </a>
                          ) : (
                            <div className="text-center py-2.5 text-xs text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200 font-medium">
                              Virtual Lab Under Deployment
                            </div>
                          )
                        ) : documentFilter === "feasibility" ? (
                          project.feasibility ? (
                            <a
                              href={project.feasibility}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold text-xs transition shadow-sm group/btn"
                            >
                              <span className="flex items-center gap-2">
                                <span className="text-base">📄</span>
                                <span>View Feasibility Study</span>
                              </span>
                              <span className="transition-transform group-hover/btn:translate-x-1">↗</span>
                            </a>
                          ) : (
                            <div className="text-center py-2.5 text-xs text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200 font-medium">
                              Feasibility Study Pending
                            </div>
                          )
                        ) : documentFilter === "report" ? (
                          project.report ? (
                            <a
                              href={project.report}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-xs transition shadow-sm group/btn"
                            >
                              <span className="flex items-center gap-2">
                                <span className="text-base">📑</span>
                                <span>View Project Report</span>
                              </span>
                              <span className="transition-transform group-hover/btn:translate-x-1">↗</span>
                            </a>
                          ) : (
                            <div className="text-center py-2.5 text-xs text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200 font-medium">
                              Project Report Pending
                            </div>
                          )
                        ) : (
                          /* STANDARD VIEW: Virtual Lab + 3 Document buttons */
                          <div className="space-y-2.5">
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
                                <span className="transition-transform group-hover/btn:translate-x-1">↗</span>
                              </a>
                            ) : (
                              <div className="text-center py-2 text-xs text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200 font-medium">
                                Virtual Lab Pending
                              </div>
                            )}

                            {/* 3 Document Buttons */}
                            <div className="grid grid-cols-3 gap-1.5 pt-1 text-center">
                              {project.feasibility ? (
                                <a
                                  href={project.feasibility}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2 py-1.5 rounded-lg bg-gray-50 hover:bg-amber-50 hover:border-amber-200 border border-gray-200 text-[11px] font-medium text-gray-700 hover:text-amber-800 transition truncate"
                                  title="View Feasibility Report"
                                >
                                  Feasibility
                                </a>
                              ) : (
                                <span className="px-2 py-1.5 rounded-lg bg-gray-50/50 border border-dashed border-gray-200 text-[11px] text-gray-400 cursor-not-allowed">
                                  Feasibility —
                                </span>
                              )}

                              {project.architecture ? (
                                <a
                                  href={project.architecture}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2 py-1.5 rounded-lg bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 text-[11px] font-medium text-gray-700 hover:text-blue-800 transition truncate"
                                  title="View Architecture Blueprint"
                                >
                                  Architecture
                                </a>
                              ) : (
                                <span className="px-2 py-1.5 rounded-lg bg-gray-50/50 border border-dashed border-gray-200 text-[11px] text-gray-400 cursor-not-allowed">
                                  Architecture —
                                </span>
                              )}

                              {project.report ? (
                                <a
                                  href={project.report}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2 py-1.5 rounded-lg bg-gray-50 hover:bg-purple-50 hover:border-purple-200 border border-gray-200 text-[11px] font-medium text-gray-700 hover:text-purple-800 transition truncate"
                                  title="View Project Report"
                                >
                                  Report
                                </a>
                              ) : (
                                <span className="px-2 py-1.5 rounded-lg bg-gray-50/50 border border-dashed border-gray-200 text-[11px] text-gray-400 cursor-not-allowed">
                                  Report —
                                </span>
                              )}
                            </div>
                          </div>
                        )}
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
                        <th className="py-3.5 px-4">Faculty Mentor</th>
                        <th className="py-3.5 px-4">Project &amp; Team</th>
                        <th className="py-3.5 px-4">Virtual Lab</th>
                        <th className="py-3.5 px-4">Feasibility</th>
                        <th className="py-3.5 px-4">Architecture</th>
                        <th className="py-3.5 px-4">Report</th>
                        <th className="py-3.5 px-4 text-center">Readiness</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProjects.map((project, index) => {
                        const resourceCount = [
                          project.virtualLab && project.virtualLab.trim(),
                          project.feasibility && project.feasibility.trim(),
                          project.architecture && project.architecture.trim(),
                          project.report && project.report.trim(),
                        ].filter(Boolean).length;

                        const isRichard = (project.mentor || "").toLowerCase().includes("richard");
                        const displayGroup = getDisplayGroup(project, selectedMentor);

                        return (
                          <tr
                            key={`table-${displayGroup}-${index}`}
                            className="hover:bg-amber-50/30 transition-colors"
                          >
                            <td className="py-4 px-4 font-bold text-[#8B1E2D] tabular-nums">
                              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md font-extrabold text-xs text-white ${
                                isRichard ? "bg-[#142A3E]" : "bg-[#8B1E2D]"
                              }`}>
                                {displayGroup}
                              </span>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                isRichard
                                  ? "bg-blue-50 text-blue-800 border border-blue-200"
                                  : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              }`}>
                                {isRichard ? "Mr. Richard Joseph" : "Dr. Priya R. L."}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-semibold text-gray-900">
                                {project.title}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {project.students.length > 0
                                  ? project.students.join(" • ")
                                  : "Students unassigned"}
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
                                  className="text-xs font-medium text-amber-700 hover:underline"
                                >
                                  View Doc ↗
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
                                  className="text-xs font-medium text-blue-700 hover:underline"
                                >
                                  Diagram ↗
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
                                  className="text-xs font-medium text-purple-700 hover:underline"
                                >
                                  Report ↗
                                </a>
                              ) : (
                                <span className="text-gray-400 text-xs">—</span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span
                                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                  resourceCount === 4
                                    ? "bg-emerald-100 text-emerald-800"
                                    : resourceCount > 0
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                              >
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
          </div>
            </>
          )}
        </div>
      </section>

      {/* 7. Faculty Mentors & Academic Guidance Credits Section */}
      <section className="py-14 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shadow-xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                Faculty Mentors &amp; Guidance
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Curriculum design, academic oversight, and project mentorship.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* Dr. Priya R. L. */}
            <div
              onClick={() => {
                setSelectedMentor("priya");
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="p-6 rounded-2xl border-2 border-rose-100 bg-gradient-to-br from-white to-rose-50/30 hover:border-[#8B1E2D] hover:shadow-lg transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6E121E] to-[#9E1B32] text-white font-black text-lg flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                  PL
                </div>
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-[#8B1E2D] border border-rose-200 mb-1">
                    Faculty Mentor • 25 Teams
                  </div>
                  <h4 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#8B1E2D] transition-colors">
                    Dr. Priya R. L.
                  </h4>
                  <p className="text-xs text-gray-600 leading-tight mt-0.5">
                    Department of Computer Engineering, VESIT
                  </p>
                </div>
              </div>
              <span className="text-[#8B1E2D] group-hover:translate-x-1 transition-transform shrink-0 font-bold text-sm">
                →
              </span>
            </div>

            {/* Mr. Richard Joseph */}
            <div
              onClick={() => {
                setSelectedMentor("richard");
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="p-6 rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50/30 hover:border-[#142A3E] hover:shadow-lg transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#142A3E] to-[#1E3A8A] text-white font-black text-lg flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                  RJ
                </div>
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-900 border border-blue-200 mb-1">
                    Faculty Mentor • 21 Teams
                  </div>
                  <h4 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#142A3E] transition-colors">
                    Mr. Richard Joseph
                  </h4>
                  <p className="text-xs text-gray-600 leading-tight mt-0.5">
                    Department of Computer Engineering, VESIT
                  </p>
                </div>
              </div>
              <span className="text-[#142A3E] group-hover:translate-x-1 transition-transform shrink-0 font-bold text-sm">
                →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. VESIT Institutional Footer */}
      <footer id="about" className="bg-[#101D2C] text-white border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
            {/* Col 1: Institute Brand & Motto */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative h-12 w-44 bg-white p-1 rounded-lg">
                  <Image
                    src="/vesit-logo.png"
                    alt="VESIT"
                    fill
                    sizes="176px"
                    className="object-contain"
                  />
                </div>
                <div className="relative h-12 w-44 bg-white p-1.5 rounded-lg">
                  <Image
                    src="/projectsphere-logo.png"
                    alt="ProjectSphere"
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

            {/* Col 3: Academic Portals */}
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
                    VESIT Research Facilities ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://vesit.ves.ac.in/academics/departments/computer-engineering"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-200 transition"
                  >
                    Department of Computer Engineering ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
            <p>
              © 2026 VESIT ProjectSphere • Department of Computer Engineering • Vivekanand Education Society
            </p>
            <p className="text-[11px] text-white/40">
              NAAC &apos;A+&apos; Accredited Autonomous Engineering Institute
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
