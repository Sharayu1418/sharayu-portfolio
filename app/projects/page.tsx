"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FEATURED_PROJECTS } from "@/lib/content";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as any,
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectsPage() {
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed");
        const json = (await res.json()) as { repos: GitHubRepo[] };
        setRepos(json.repos);
      } catch {
        setRepos([]);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <header className="space-y-3">
        <motion.p
          variants={item}
          className="text-[11px] font-medium uppercase tracking-[0.26em] text-slate-400"
        >
          Systems & Experiments
        </motion.p>
        <motion.h1
          variants={item}
          className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl"
        >
          Projects across ML systems, research, and production backends
        </motion.h1>
        <motion.p
          variants={item}
          className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-[15px]"
        >
          A selection of projects that demonstrate how I move from prototypes to
          cloud‑ready services, with a focus on observability, reliability, and
          real‑world performance.
        </motion.p>
      </header>

      <section className="space-y-6">
        {FEATURED_PROJECTS.map((project) => (
          <motion.article
            key={project.slug}
            variants={item}
            className="glass-card overflow-hidden border border-white/10 p-5 sm:p-6"
          >
            <div className="flex flex-col gap-5 md:flex-row md:gap-6">
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold text-slate-50 sm:text-lg">
                    {project.name}
                  </h2>
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-slate-300">
                  {project.shortDescription}
                </p>
                <div className="grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      Problem
                    </p>
                    <p className="mt-1">{project.problem}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      Solution
                    </p>
                    <p className="mt-1">{project.solution}</p>
                  </div>
                  {project.impact && (
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        Impact
                      </p>
                      <p className="mt-1">{project.impact}</p>
                    </div>
                  )}
                </div>

              </div>

              <div className="flex min-w-[240px] flex-col gap-3 md:w-[280px]">
                <ArchitectureCard name={project.name} />
                <MetricsCard
                  metrics={project.metrics.map((m) => ({
                    ...m,
                    placeholder: m.value.includes("X") || m.value.includes("0."),
                  }))}
                />
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="space-y-4 border-t border-white/10 pt-6">
        <motion.h2
          variants={item}
          className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400"
        >
          GitHub Activity
        </motion.h2>
        <motion.p
          variants={item}
          className="max-w-2xl text-xs text-slate-400"
        >
          A live feed of repositories from{" "}
          <span className="font-semibold text-slate-200">github.com/Sharayu1418</span>{" "}
          will appear here, including recent work across ML, backend, and
          infrastructure. This section is wired to a GitHub API route and can be
          curated further later.
        </motion.p>
        <div className="glass-card space-y-3 border border-dashed border-white/20 px-4 py-4 text-xs text-slate-300">
          {loading && <p>Loading repositories…</p>}
          {!loading && repos && repos.length === 0 && (
            <p className="text-slate-400">
              No repositories found or GitHub API is currently unavailable. This
              section will auto‑populate once the API responds.
            </p>
          )}
          {!loading && repos && repos.length > 0 && (
            <div className="grid gap-3 md:grid-cols-2">
              {repos.slice(0, 6).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-lg border border-white/10 bg-slate-950/60 p-3 transition hover:border-blue-500/50 hover:bg-slate-900"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-semibold text-slate-50">
                      {repo.name}
                    </p>
                    {typeof repo.stargazers_count === "number" &&
                      repo.stargazers_count > 0 && (
                        <span className="text-[10px] text-amber-300">
                          ★ {repo.stargazers_count}
                        </span>
                      )}
                  </div>
                  {repo.description && (
                    <p className="mt-1 text-[11px] text-slate-300">
                      {repo.description}
                    </p>
                  )}
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                    <span>{repo.language}</span>
                    <span>
                      Updated{" "}
                      {new Date(repo.updated_at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}

type MetricsCardProps = {
  metrics: {
    label: string;
    value: string;
    variant?: "positive" | "warning" | "accent";
    placeholder?: boolean;
  }[];
};

function MetricsCard({ metrics }: MetricsCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
        Key Metrics
      </p>
      <div className="mt-2 space-y-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-baseline justify-between">
            <span className="text-[11px] text-slate-400">{metric.label}</span>
            <span
              className={cn(
                "text-xs font-semibold",
                metric.placeholder && "opacity-70",
                metric.variant === "positive" && "metric-positive",
                metric.variant === "warning" && "metric-warning",
                metric.variant === "accent" && "metric-accent",
              )}
            >
              {metric.value}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-500">
        Values shown are placeholders based on the underlying experiments and
        can be refined with final results.
      </p>
    </div>
  );
}

type ArchitectureCardProps = {
  name: string;
};

function ArchitectureCard({ name }: ArchitectureCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/60 p-3 text-[11px] text-slate-200">
      <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
        Architecture (Sketch)
      </p>
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-blue-500/40 bg-blue-500/10 p-2">
          <p className="text-[11px] font-semibold text-sky-200">Client</p>
          <p className="mt-1 text-[10px] text-slate-200">
            React / dashboard driving interactions into the service.
          </p>
        </div>
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-2">
          <p className="text-[11px] font-semibold text-emerald-200">Service</p>
          <p className="mt-1 text-[10px] text-slate-200">
            API layer + worker pool that orchestrates ML and storage.
          </p>
        </div>
        <div className="rounded-lg border border-violet-500/40 bg-violet-500/10 p-2">
          <p className="text-[11px] font-semibold text-violet-200">Infra</p>
          <p className="mt-1 text-[10px] text-slate-200">
            Cloud resources (DB, cache, object store, queue, monitors).
          </p>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-slate-500">
        High‑level diagram for <span className="font-semibold">{name}</span>.
        Replace with a more precise architecture drawing if desired.
      </p>
    </div>
  );
}

type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};


