import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { initialRawProjects } from "@/app/initialProjects";

// In-memory cache for speed and resilience
let memoryCache = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 20 * 1000;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const forceFresh = searchParams.get("fresh") === "true";
  const now = Date.now();

  if (!forceFresh && memoryCache && now - lastFetchTime < CACHE_DURATION_MS) {
    return NextResponse.json(memoryCache, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-Data-Source": "in-memory-cache",
      },
    });
  }

  let finalProjects = [];

  // Query Supabase
  try {
    const { data: supabaseRows, error: supabaseError } = await supabase
      .from("projects")
      .select("*")
      .order("group_number", { ascending: true });

    // Use Supabase data if it has been updated with the teacher's final 21 projects
    if (!supabaseError && Array.isArray(supabaseRows) && supabaseRows.length === 21) {
      finalProjects = supabaseRows.map((row) => {
        const rowGroup = String(row.original_group || row.group_number);
        const rawMatch = initialRawProjects.find(
          (p) =>
            String(p.group) === rowGroup ||
            String(p.group).padStart(2, "0") === rowGroup.padStart(2, "0")
        );

        let student1 = Array.isArray(row.students) ? row.students[0] || "" : "";
        let student2 = Array.isArray(row.students) ? row.students[1] || "" : "";

        // If local data has full surname (e.g. Prathamesh Shelar vs Prathamesh), preserve the full name
        if (rawMatch?.student1 && rawMatch.student1.length > student1.length) {
          student1 = rawMatch.student1;
        }
        if (rawMatch?.student2 && rawMatch.student2.length > student2.length) {
          student2 = rawMatch.student2;
        }

        let virtualLab = row.virtual_lab || "";
        // If rawMatch has the complete Breakscale #k= decryption key, preserve it
        if (rawMatch?.virtualLab && rawMatch.virtualLab.includes("#k=") && !virtualLab.includes("#k=")) {
          virtualLab = rawMatch.virtualLab;
        }

        let architecture = row.architecture || rawMatch?.architecture || "";
        if (rawMatch?.architecture && (!architecture || architecture.includes("1Vk6XvulD0rJfJaQTzs5rRWz8ltBxa8W7"))) {
          architecture = rawMatch.architecture;
        }

        return {
          group: String(row.original_group || row.group_number),
          groupNumber: row.group_number,
          title: row.title || rawMatch?.title || "",
          student1: student1 || rawMatch?.student1 || "",
          student2: student2 || rawMatch?.student2 || "",
          virtualLab: virtualLab || rawMatch?.virtualLab || "",
          feasibility: row.feasibility || rawMatch?.feasibility || "",
          architecture: architecture,
          report: row.report || rawMatch?.report || "",
          mentor: row.mentor || "Department of Computer Engineering",
        };
      });
    }
  } catch (sbErr) {
    console.warn("Supabase query note:", sbErr);
  }

  // Fallback to the teacher's final curated 21 projects
  if (finalProjects.length === 0) {
    finalProjects = initialRawProjects.map((p, i) => ({
      group: String(p.group || i + 1),
      groupNumber: i + 1,
      title: p.title || `Group ${i + 1} Project`,
      student1: p.student1 || "",
      student2: p.student2 || "",
      virtualLab: p.virtualLab || "",
      feasibility: p.feasibility || "",
      architecture: p.architecture || "",
      report: p.report || "",
      mentor: p.mentor || "Department of Computer Engineering",
    }));
  }

  memoryCache = finalProjects;
  lastFetchTime = now;

  return NextResponse.json(finalProjects, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-Data-Source": finalProjects.length === 21 ? "final-sheet-data" : "supabase-live",
    },
  });
}
