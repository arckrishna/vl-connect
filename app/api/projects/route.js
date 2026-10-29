import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyXmM4S41_6SJb_GXAaZYc_0addP46muf_hJSeJSpUnAE0fMKeDkcR9Ghh2VFKWBxuRrw/exec";

// In-memory cache for speed and resilience
let memoryCache = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 20 * 1000;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const forceFresh = searchParams.get("fresh") === "true";
  const now = Date.now();

  // 1. Try querying Supabase first (fastest, scalable, institutional database)
  try {
    const { data: supabaseRows, error: supabaseError } = await supabase
      .from("projects")
      .select("*")
      .order("group_number", { ascending: true });

    if (!supabaseError && Array.isArray(supabaseRows) && supabaseRows.length > 0) {
      const formattedProjects = supabaseRows.map((row) => ({
        group: String(row.original_group || row.group_number),
        groupNumber: row.group_number,
        title: row.title,
        student1: Array.isArray(row.students) ? row.students[0] || "" : "",
        student2: Array.isArray(row.students) ? row.students[1] || "" : "",
        virtualLab: row.virtual_lab || "",
        feasibility: row.feasibility || "",
        architecture: row.architecture || "",
        report: row.report || "",
      }));

      memoryCache = formattedProjects;
      lastFetchTime = now;

      return NextResponse.json(formattedProjects, {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "X-Data-Source": "supabase",
        },
      });
    }
  } catch (sbErr) {
    console.warn("Supabase query note (falling back to Google Sheet):", sbErr);
  }

  // 2. Return cached projects if fresh and not explicitly forced
  if (!forceFresh && memoryCache && now - lastFetchTime < CACHE_DURATION_MS) {
    return NextResponse.json(memoryCache, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-Data-Source": "in-memory-cache",
      },
    });
  }

  // 3. Fallback to Google Apps Script / Google Sheet
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      cache: "no-store",
      redirect: "follow",
    });

    const responseText = await response.text();

    if (!response.ok) {
      if (memoryCache) return NextResponse.json(memoryCache);
      return NextResponse.json(
        { error: `Google Apps Script returned status ${response.status}` },
        { status: 502 }
      );
    }

    let projects;
    try {
      projects = JSON.parse(responseText);
    } catch {
      if (memoryCache) return NextResponse.json(memoryCache);
      return NextResponse.json(
        {
          error: "Google Apps Script did not return valid JSON.",
          responsePreview: responseText.slice(0, 300),
        },
        { status: 502 }
      );
    }

    if (!Array.isArray(projects)) {
      if (memoryCache) return NextResponse.json(memoryCache);
      return NextResponse.json(
        { error: "Expected a list of projects from Google Apps Script." },
        { status: 502 }
      );
    }

    // Update in-memory cache
    memoryCache = projects;
    lastFetchTime = now;

    return NextResponse.json(projects, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-Data-Source": "live-google-sheet",
      },
    });
  } catch (error) {
    console.error("Failed to fetch fresh projects:", error);

    if (memoryCache) {
      return NextResponse.json(memoryCache);
    }

    return NextResponse.json(
      { error: "Unable to connect to projects data source." },
      { status: 500 }
    );
  }
}
