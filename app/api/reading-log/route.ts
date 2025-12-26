import { NextResponse } from "next/server";

const DEFAULT_SOURCE_URL =
  process.env.READING_LOG_SOURCE_URL ??
  // Default to the current reading-log JSON in GitHub. You can point this to another
  // file (or a Gist) later via the READING_LOG_SOURCE_URL env var without code changes.
  "https://raw.githubusercontent.com/Sharayu1418/reading-log/main/Cloudfare%20Outage.json";

type RemoteNote = {
  id?: string;
  date?: string;
  title?: string;
  tags?: string[];
  summary?: string;
  funFact?: string;
};

type RemotePayload =
  | {
      notes?: RemoteNote[];
      updatedAt?: string;
    }
  | RemoteNote[];

export async function GET() {
  try {
    const res = await fetch(DEFAULT_SOURCE_URL, {
      // Fetch fresh data so updates show without a redeploy.
      cache: "no-store",
    });

    if (!res.ok) {
      // If the feed doesn't exist yet, just return an empty list so the UI shows a placeholder.
      return NextResponse.json({ notes: [], updatedAt: null });
    }

    const data = (await res.json()) as RemotePayload;
    const rawNotes = Array.isArray(data) ? data : data.notes ?? [];

    const notes = rawNotes.map((note, index) => ({
      id: note.id ?? String(index),
      date: note.date ?? "",
      title: note.title ?? "",
      tags: note.tags ?? [],
      summary: note.summary ?? "",
      funFact: note.funFact ?? "",
    }));

    const updatedAt =
      !Array.isArray(data) && "updatedAt" in data
        ? data.updatedAt ?? null
        : notes[0]?.date ?? null;

    return NextResponse.json({ notes, updatedAt });
  } catch (error) {
    console.error("Reading log API error", error);
    return NextResponse.json({ notes: [], updatedAt: null });
  }
}


