import { NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyXmM4S41_6SJb_GXAaZYc_0addP46muf_hJSeJSpUnAE0fMKeDkcR9Ghh2VFKWBxuRrw/exec";

// In-memory cache to ensure instant responses and resilience
let memoryCache = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 3 * 60 * 1000; // 3 minutes

export async function GET() {
  const now = Date.now();

  // Return cached projects immediately if still fresh
  if (memoryCache && now - lastFetchTime < CACHE_DURATION_MS) {
    return NextResponse.json(memoryCache, {
      headers: { "Cache-Control": "public, s-maxage=180, stale-while-revalidate=300" },
    });
  }

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
      headers: { "Cache-Control": "public, s-maxage=180, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("Failed to fetch projects from Google Script:", error);

    if (memoryCache) {
      return NextResponse.json(memoryCache);
    }

    return NextResponse.json(
      { error: "Unable to connect to Google Apps Script." },
      { status: 500 }
    );
  }
}
