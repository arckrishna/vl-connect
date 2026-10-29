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
      finalProjects = supabaseRows.map((row) => ({
        group: String(row.original_group || row.group_number),
        groupNumber: row.group_number,
        title: row.title,
        student1: Array.isArray(row.students) ? row.students[0] || "" : "",
        student2: Array.isArray(row.students) ? row.students[1] || "" : "",
        virtualLab: row.virtual_lab || "",
        feasibility: row.feasibility || "",
        architecture: row.architecture || "",
        report: row.report || "",
        mentor: row.mentor || "Department of Computer Engineering",
      }));
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
