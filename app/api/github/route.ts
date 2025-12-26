import { NextResponse } from "next/server";

const GITHUB_USER = "Sharayu1418";

type GitHubRepoApi = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  pushed_at?: string;
  updated_at?: string;
};

export async function GET() {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=50&sort=pushed`;

  try {
    const res = await fetch(url, {
      headers,
      // Cache at the edge for a short period; adjust as desired.
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub repositories" },
        { status: res.status },
      );
    }

    const data = (await res.json()) as GitHubRepoApi[];

    const repos = data
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        updated_at: repo.pushed_at ?? repo.updated_at,
      }));

    return NextResponse.json({ repos });
  } catch (error) {
    console.error("GitHub API error", error);
    return NextResponse.json(
      { error: "Unexpected error while fetching GitHub repositories" },
      { status: 500 },
    );
  }
}

