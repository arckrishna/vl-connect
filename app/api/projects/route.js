import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { initialRawProjects } from "@/app/initialProjects";

const GOOGLE_SCRIPT_PRIYA =
  "https://script.google.com/macros/s/AKfycbyXmM4S41_6SJb_GXAaZYc_0addP46muf_hJSeJSpUnAE0fMKeDkcR9Ghh2VFKWBxuRrw/exec";
const GOOGLE_SHEET_RICHARD =
  "https://docs.google.com/spreadsheets/d/1vxW-4g_2DBpTaa-lxgYOTh8u5WiT3CBSZQgcNJ0Qmyo/htmlview/sheet?headers=true&gid=533429406";

// In-memory cache for speed and resilience
let memoryCache = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 20 * 1000;

// Helper to dynamically parse Mr. Richard Joseph's Google Sheet
async function fetchRichardProjectsFromSheet() {
  try {
    const res = await fetch(GOOGLE_SHEET_RICHARD, {
      cache: "no-store",
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const trMatches = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
    const dataRows = [];
    trMatches.forEach((tr) => {
      const tdMatches = [...tr[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)];
      const row = tdMatches.map((td) => {
        const linkMatch = td[1].match(/href="([^"]+)"/i);
        const text = td[1].replace(/<[^>]+>/g, "").trim();
        let href = linkMatch ? linkMatch[1] : "";
        if (href.includes("google.com/url?q=")) {
          try {
            const u = new URL(href);
            href = u.searchParams.get("q") || href;
          } catch {}
        }
        return { text, href };
      });
      if (row.length > 3 && (row[1]?.text || row[3]?.text)) {
        dataRows.push(row);
      }
    });

    if (dataRows.length <= 1) return null;

    return dataRows.slice(1).map((r, i) => {
      const topic = (r[3]?.text || "Capstone Project")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/\s+/g, " ")
        .trim();

      return {
        group: r[0]?.text?.trim() || String(i + 1),
        groupNumber: i + 26,
        title: topic,
        student1: r[1]?.text?.trim() || "",
        student2: r[2]?.text?.trim() || "",
        feasibility: r[4]?.href?.trim() || "",
        architecture: r[5]?.href?.trim() || "",
        report: r[6]?.href?.trim() || "",
        virtualLab: r[7]?.href?.trim() || "",
        mentor: "Mr. Richard Joseph",
      };
    });
  } catch (err) {
    console.warn("Live parse of Richard Joseph sheet error:", err);
    return null;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const forceFresh = searchParams.get("fresh") === "true";
  const now = Date.now();

  // 1. Return cached projects if fresh and not explicitly forced
  if (!forceFresh && memoryCache && now - lastFetchTime < CACHE_DURATION_MS) {
    return NextResponse.json(memoryCache, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-Data-Source": "in-memory-cache",
      },
    });
  }

  let finalProjects = [];

  // 2. Query Supabase
  try {
    const { data: supabaseRows, error: supabaseError } = await supabase
      .from("projects")
      .select("*")
      .order("group_number", { ascending: true });

    if (!supabaseError && Array.isArray(supabaseRows) && supabaseRows.length > 0) {
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
        mentor: row.mentor || "Dr. Priya R. L.",
      }));
    }
  } catch (sbErr) {
    console.warn("Supabase query note:", sbErr);
  }

  // 3. If Supabase only has Dr. Priya's rows (e.g. before SQL migration is applied), or if fresh is requested, merge with Richard's projects
  const hasRichardInSupabase = finalProjects.some(
    (p) => p.mentor === "Mr. Richard Joseph"
  );

  if (!hasRichardInSupabase || forceFresh) {
    // Attempt live fetch from Richard Joseph's sheet
    const liveRichard = await fetchRichardProjectsFromSheet();
    const fallbackRichard = initialRawProjects
      .filter((p) => p.mentor === "Mr. Richard Joseph")
      .map((p, i) => ({
        group: String(p.group || i + 1),
        groupNumber: 26 + i,
        title: p.title || "Capstone Project",
        student1: p.student1 || "",
        student2: p.student2 || "",
        virtualLab: p.virtualLab || "",
        feasibility: p.feasibility || "",
        architecture: p.architecture || "",
        report: p.report || "",
        mentor: "Mr. Richard Joseph",
      }));

    const richardProjectsToUse = liveRichard || fallbackRichard;

    if (!hasRichardInSupabase) {
      finalProjects = [...finalProjects, ...richardProjectsToUse];
    } else if (forceFresh && liveRichard) {
      // Update Richard projects in place with latest links from Google sheet
      finalProjects = finalProjects.map((p) => {
        if (p.mentor !== "Mr. Richard Joseph") return p;
        const matching = liveRichard.find(
          (lr) => lr.group === p.group || lr.title === p.title
        );
        return matching || p;
      });
    }
  }

  // 4. Fallback if empty
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
      mentor: p.mentor || "Dr. Priya R. L.",
    }));
  }

  memoryCache = finalProjects;
  lastFetchTime = now;

  return NextResponse.json(finalProjects, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-Data-Source": hasRichardInSupabase ? "supabase-live" : "supabase-merged",
    },
  });
}
