export async function GET() {
  try {
    const response = await fetch("https://github.com/users/Sharayu1418/contributions", {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        // Mimic a normal browser so GitHub returns the HTML page that contains the SVG
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      },
      cache: "no-store",
    });

    const text = await response.text();

    const match = text.match(/<svg[\s\S]*?<\/svg>/i);
    const svg = match?.[0];

    if (!svg) {
      return new Response("GitHub did not return SVG", { status: 500 });
    }

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("GITHUB ERROR:", error);
    return new Response("Failed to load GitHub contributions", {
      status: 500,
    });
  }
}


