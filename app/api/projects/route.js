
import { NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyXmM4S41_6SJb_GXAaZYc_0addP46muf_hJSeJSpUnAE0fMKeDkcR9Ghh2VFKWBxuRrw/exec";



export async function GET() {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      cache: "no-store",
      redirect: "follow",
    });

    const responseText = await response.text();

    console.log("Google response status:", response.status);
    console.log("Google response preview:", responseText.slice(0, 500));

    if (!response.ok) {
      return NextResponse.json(
        { error: `Google Apps Script returned status ${response.status}` },
        { status: 502 }
      );
    }

    let projects;

    try {
      projects = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          error: "Google Apps Script did not return valid JSON.",
          responsePreview: responseText.slice(0, 300),
        },
        { status: 502 }
      );
    }

    if (!Array.isArray(projects)) {
      return NextResponse.json(
        { error: "Expected a list of projects from Google Apps Script." },
        { status: 502 }
      );
    }

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);

    return NextResponse.json(
      { error: "Unable to connect to Google Apps Script." },
      { status: 500 }
    );
  }
}

