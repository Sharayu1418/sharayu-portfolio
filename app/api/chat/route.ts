import { NextResponse } from "next/server";
import { FEATURED_PROJECTS } from "@/lib/content";

type ChatRequest = {
  question?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequest;
    const question = (body.question ?? "").trim();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 },
      );
    }

    const lower = question.toLowerCase();

    const projectMatch = FEATURED_PROJECTS.find((project) => {
      const haystack =
        (project.name + " " + project.shortDescription + " " + project.tags?.join(" ")).toLowerCase();
      return haystack.includes("smartcache")
        ? lower.includes("smartcache")
        : haystack.includes("multimodal")
          ? lower.includes("multimodal")
          : haystack.includes("roberta")
            ? lower.includes("roberta") || lower.includes("news classifier")
            : false;
    });

    let answer: string;

    if (projectMatch) {
      answer = `Here’s how **${projectMatch.name}** is put together:

- Problem: ${projectMatch.problem}
- Solution: ${projectMatch.solution}
- Impact: ${projectMatch.impact ?? "This project was designed as a robust production reference."}

From an engineering perspective, you can think of it as:
- API layer: where requests come in and are validated.
- Orchestration / workers: where heavier ML or caching work happens off the critical path.
- Storage: relational DB + cache + object storage, all wired with metrics and logging.

If you’d like, you can ask a follow‑up such as “Explain the architecture of ${
        projectMatch.name
      } in more detail” or “How would you productionize ${projectMatch.name} on AWS?”.`;
    } else if (
      lower.includes("ml") ||
      lower.includes("machine learning") ||
      lower.includes("model")
    ) {
      answer =
        "I usually approach ML systems as *products*, not just models: start with the problem and success metrics, design the data and evaluation loop, then pick architectures that are easy to iterate on. From there I focus on serving (APIs, latency, reliability), observability (metrics, traces, dashboards), and safe rollouts (A/B tests, gradual deployments). You can ask me about specific projects like SmartCache AI, the multimodal depression detector, or the LoRA‑RoBERTa news classifier.";
    } else if (
      lower.includes("cloud") ||
      lower.includes("aws") ||
      lower.includes("gcp") ||
      lower.includes("kubernetes")
    ) {
      answer =
        "On the cloud side I work mostly with AWS (Lambda, S3, DynamoDB, EKS, Bedrock) and containerized workloads on Docker + Kubernetes. I care about clear boundaries between stateless services, data stores, and async workers, with CI/CD and infrastructure as code so deployments are repeatable. If you tell me more about your stack (e.g. Python + FastAPI on AWS) I can outline how I’d design a deployment pipeline for it.";
    } else {
      answer =
        "I’m a portfolio assistant focused on Sharayu’s work across AI/ML, cloud, and backend engineering. You can ask me questions like “How does SmartCache AI work?”, “How was the multimodal depression detector built?”, “What does the LoRA‑RoBERTa news classifier do?”, or “How does Sharayu approach deploying ML services on AWS?”.";
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Chat API error", error);
    return NextResponse.json(
      { error: "Unexpected error in chat assistant." },
      { status: 500 },
    );
  }
}


