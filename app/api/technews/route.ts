import { NextResponse } from "next/server";

const GNEWS_ENDPOINT =
  "https://gnews.io/api/v4/top-headlines?topic=technology&lang=en&apikey=1bc2212909a70da1eb855768330fb237";

const FALLBACK_HEADLINES: string[] = [
  "Large-scale transformers head to production workloads",
  "Vector databases are becoming the new app backend",
  "GPU scheduling is now a first-class infrastructure problem",
  "MLOps platforms race to simplify LLM deployment",
  "Serverless and containers continue to converge in the cloud",
  "Inference-optimized GPUs reshape model serving architectures",
  "Observability tools shift left into the ML lifecycle",
];

export async function GET() {
  try {
    const res = await fetch(GNEWS_ENDPOINT, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`GNews responded with ${res.status}`);
    }

    const data = await res.json();
    const articles = Array.isArray(data?.articles) ? data.articles : [];

    const headlines = articles
      .slice(0, 10)
      .map((article: any) => article?.title)
      .filter((title: unknown): title is string => typeof title === "string" && title.trim().length > 0);

    if (!headlines.length) {
      return NextResponse.json({ headlines: FALLBACK_HEADLINES });
    }

    return NextResponse.json({ headlines });
  } catch {
    return NextResponse.json({ headlines: FALLBACK_HEADLINES });
  }
}


