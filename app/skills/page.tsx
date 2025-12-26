"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SKILL_CATEGORIES } from "@/lib/content";
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

export default function SkillsPage() {
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
          Skills
        </motion.p>
        <motion.h1
          variants={item}
          className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl"
        >
          Skills
        </motion.h1>
        <motion.p
          variants={item}
          className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-[15px]"
        >
          A dashboard‑style overview of my stack across ML, cloud, backend, and
          data. Think of this as a control plane for what I can design, build,
          and operate in production.
        </motion.p>
      </header>

      <section className="grid gap-5 md:grid-cols-[minmax(0,2.1fr)_minmax(0,1.4fr)]">
        <div className="space-y-4">
          {SKILL_CATEGORIES.map((category) => (
            <motion.article
              key={category.name}
              variants={item}
              className="glass-card border border-white/10 p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-sky-400/80 bg-sky-500/20 text-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.6)]">
                    {category.icon ? (
                      <Image
                        src={category.icon}
                        alt={`${category.name} icon`}
                        width={32}
                        height={32}
                        unoptimized
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <span className="text-xs font-semibold tracking-[0.18em]">
                        {"</>"}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-50">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="mt-1 text-xs text-slate-300">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {category.skills.map((skill) => (
                  <SkillRow key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.aside
          variants={item}
          className="glass-card flex flex-col gap-4 border border-white/10 p-5 sm:p-6"
        >
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Cloud Operations
            </p>
            <p className="text-sm font-semibold text-slate-50">
              Simulated control plane for active workloads
            </p>
          </div>

          <div className="grid gap-3 text-xs text-slate-200">
            <div className="rounded-lg border border-white/10 bg-slate-950/60 p-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Active services
              </p>
              <ul className="mt-1 space-y-1.5">
                <li className="flex items-center justify-between">
                  <span>AWS Lambda – inference handlers</span>
                  <StatusPill status="healthy" />
                </li>
                <li className="flex items-center justify-between">
                  <span>EKS / K8s – model pods</span>
                  <StatusPill status="degraded" />
                </li>
                <li className="flex items-center justify-between">
                  <span>GCP jobs – batch pipelines</span>
                  <StatusPill status="healthy" />
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-white/10 bg-slate-950/60 p-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Containers & pipelines
              </p>
              <ul className="mt-1 space-y-1.5">
                <li className="flex items-center justify-between">
                  <span>Docker services</span>
                  <span className="text-[11px] text-slate-300">4 running</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>CI/CD pipelines</span>
                  <span className="text-[11px] text-slate-300">2 green · 1 running</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-white/10 bg-slate-950/60 p-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                K8s pods (simulated)
              </p>
              <ul className="mt-1 space-y-1.5">
                <li className="flex items-center justify-between">
                  <span>smartcache-api‑deployment</span>
                  <StatusPill status="healthy" />
                </li>
                <li className="flex items-center justify-between">
                  <span>roberta‑news‑classifier</span>
                  <StatusPill status="healthy" />
                </li>
                <li className="flex items-center justify-between">
                  <span>multimodal‑pipeline‑workers</span>
                  <StatusPill status="warning" />
                </li>
              </ul>
            </div>

            {/* Google Cloud Skills Boost profile */}
            <div className="rounded-lg border border-white/10 bg-slate-950/60 p-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Google Cloud Skills Boost
              </p>
              <p className="mt-1 text-[11px] text-slate-300">
                Verified hands‑on labs across ML, BigQuery, pipelines, and cloud engineering.
              </p>
              <a
                href="https://www.skills.google/public_profiles/8fef00cc-7281-46ba-a7e7-2e6b360a273d"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center justify-center rounded-full border border-blue-500/50 bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-sky-200 shadow-sm shadow-blue-500/40 transition hover:bg-blue-500/20"
              >
                View Google Cloud profile
              </a>
            </div>
          </div>

          <p className="text-[10px] text-slate-500">
            This dashboard is a simulated view that mirrors the kind of systems I
            typically deploy: API services, worker pools, and data pipelines on
            top of AWS/GCP with Docker and Kubernetes.
          </p>
        </motion.aside>
      </section>
    </motion.div>
  );
}

type SkillRowProps = {
  name: string;
  level: "working" | "advanced" | "expert";
};

function SkillRow({ name, level }: SkillRowProps) {
  const levelConfig: Record<
    SkillRowProps["level"],
    { label: string; width: string }
  > = {
    working: { label: "Working", width: "60%" },
    advanced: { label: "Advanced", width: "80%" },
    expert: { label: "Expert", width: "96%" },
  };

  const config = levelConfig[level];

  return (
    <div className="space-y-1.5 text-xs">
      <div className="flex items-center justify-between text-slate-200">
        <span>{name}</span>
        <span className="text-[11px] text-slate-400">{config.label}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-900/80">
        <motion.div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500",
          )}
          style={{ width: config.width }}
          initial={{ width: 0 }}
          animate={{ width: config.width }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

type Status = "healthy" | "warning" | "degraded";

function StatusPill({ status }: { status: Status }) {
  const labelMap: Record<Status, string> = {
    healthy: "Healthy",
    warning: "Warning",
    degraded: "Degraded",
  };
  const colorMap: Record<Status, string> = {
    healthy: "bg-emerald-400",
    warning: "bg-amber-300",
    degraded: "bg-purple-400",
  };

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-200">
      <span
        className={cn("h-1.5 w-1.5 rounded-full", colorMap[status])}
        aria-hidden="true"
      />
      {labelMap[status]}
    </span>
  );
}


