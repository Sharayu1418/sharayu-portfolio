"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  HERO,
  EXPERIENCE,
  EDUCATION,
  FEATURED_PROJECTS,
  SKILL_CATEGORIES,
  LEADERSHIP,
} from "@/lib/content";
import { SocialLinks } from "@/components/social-links";
import { cn } from "@/lib/utils";
import VerticalCarousel from "@/components/vertical-carousel";
import type { IconType } from "react-icons";
import {
  SiApachekafka,
  SiApachespark,
  SiBootstrap,
  SiCelery,
  SiCss3,
  SiDjango,
  SiDocker,
  SiElasticsearch,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGitlab,
  SiGnubash,
  SiGooglecloud,
  SiHtml5,
  SiHuggingface,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiNumpy,
  SiOpencv,
  SiPostgresql,
  SiPostman,
  SiPrometheus,
  SiPytorch,
  SiPython,
  SiReact,
  SiRedis,
  SiScikitlearn,
  SiSequelize,
  SiSwagger,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";
import { FaAws, FaCloud, FaDatabase, FaRobot, FaServer, FaTerminal } from "react-icons/fa";
import { SkillsCarousel } from "@/components/skills-carousel";

const container = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as any,
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function useScrollDirection() {
  const [direction, setDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastY + 2) {
        setDirection("down");
      } else if (y < lastY - 2) {
        setDirection("up");
      }
      lastY = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return direction;
}

function PanCardDown({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const direction = useScrollDirection();
  const controls = useAnimation();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const hasBaseline = useRef(false);

  useEffect(() => {
    if (!hasBaseline.current) {
      controls.set({ opacity: 1, y: 0 });
      hasBaseline.current = true;
    }

    if (inView && direction === "down") {
      controls.set({ opacity: 0, y: 18 });
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" },
      });
    }
  }, [controls, direction, inView]);

  return (
    <motion.article ref={ref} className={className} initial={false} animate={controls}>
      {children}
    </motion.article>
  );
}

function DownPanSection({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const direction = useScrollDirection();
  const [trigger, setTrigger] = useState(0);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && direction === "down") {
          setTrigger((t) => t + 1);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [direction]);

  const shouldAnimate = trigger > 0;

  return (
    <motion.section
      key={trigger}
      ref={ref}
      id={id}
      className={className}
      initial={shouldAnimate ? "hidden" : false}
      animate="visible"
      variants={container}
    >
      {children}
    </motion.section>
  );
}

type ContactStatus = "idle" | "submitting" | "success" | "error";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col gap-10">
      <HeroBackgroundVisual />

      <motion.section
        id="home"
        className="relative grid gap-10 md:grid-cols-[minmax(0,3.2fr)_minmax(0,2.3fr)] md:items-center"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <div className="space-y-6">
          <motion.div variants={item} className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative h-32 w-32 overflow-hidden rounded-[26px] border border-white/20 bg-slate-900/80">
              {/* Replace /public/profile.jpg with your own photo */}
        <Image
                  src="/profile.jpg"
                  alt="Portrait of Sharayu Rasal"
                  width={128}
                  height={128}
                  className="h-32 w-32 object-cover"
                />
              </div>
              <div className="space-y-1">
                <motion.h1
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.04,
                      },
                    },
                  }}
                  className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl"
                >
                  {HERO.name.split(" ").map((token) => (
                    <motion.span
                      key={token}
                      variants={{
                        hidden: { opacity: 0, y: 4 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      className="inline-block pr-2"
                    >
                      {token}
                    </motion.span>
                  ))}
                </motion.h1>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-300">
                  Software Engineering · Cloud · AI/ML
                </p>
              </div>
            </div>
          </motion.div>

          <motion.p
            variants={item}
            className="max-w-2xl space-y-3 text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            <span className="block font-semibold text-slate-50">
              I enjoy understanding how systems work and figuring out how to make them work
              better.
            </span>
            <span className="block">
              Most of what I do sits at the intersection of{" "}
              <span className="font-semibold text-slate-50">
                architecture, performance, and reliability.
              </span>{" "}
              I take an idea, break it down, and turn it into something clean, predictable,
              and production ready.
            </span>
            <span className="block">
              I like designing systems that behave well under pressure. The ones that stay
              fast when the data grows, stay stable when traffic spikes, and stay
              understandable long after the first version ships.
            </span>
            <span className="block font-semibold text-slate-50">
              My motto: Good engineering should feel simple from the outside and solid at
              its core.
            </span>
          </motion.p>
          <motion.div
            variants={item}
            className="pt-4"
          >
            <Link
              href={HERO.ctaSecondaryHref}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-100 backdrop-blur-md transition hover:bg-white/10"
            >
              {HERO.ctaSecondaryLabel}
            </Link>
          </motion.div>
        </div>

        <motion.aside
          variants={item}
          className="glass-card relative overflow-hidden px-5 py-5 sm:px-7 sm:py-7"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-sky-400/8 to-violet-500/20" />

          <div className="relative space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-300">
                  Reading logs from the tech world
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-50">
                  What&apos;s something new I learned recently in AI/ML, cloud, or systems?
                </p>
              </div>
            </div>

            <ReadingLogWidget />
          </div>
        </motion.aside>
      </motion.section>

      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}

type SimpleVariants = typeof item;

type ReadingEntry = {
  id: string;
  date?: string;
  title?: string;
  tags?: string[];
  summary?: string;
  funFact?: string;
};

type ReadingApiResponse = {
  notes: ReadingEntry[];
  updatedAt?: string | null;
};

function ReadingLogWidget() {
  const [entries, setEntries] = useState<ReadingEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/reading-log");
        if (!res.ok) throw new Error("Failed to fetch reading log");
        const json = (await res.json()) as ReadingApiResponse;
        if (!cancelled) {
          setEntries(json.notes ?? []);
          setLastUpdated(json.updatedAt ?? null);
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          setEntries([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-2 text-[11px] text-slate-300">
        <p>Loading this week&apos;s notes…</p>
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="space-y-2 text-[11px] text-slate-300">
        <p>
          I&apos;ll use this space to share quick notes from what I&apos;m reading in AI/ML,
          cloud, and backend engineering.
        </p>
        <p className="text-slate-400">
          New entries will appear here as I add them — check back for fresh reads.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 text-[12px] text-slate-200">
      {entries.slice(0, 3).map((entry) => (
        <div
          key={entry.id}
          className="rounded-lg border border-white/12 bg-slate-950/60 p-3"
        >
          <div className="flex flex-wrap items-center justify-end gap-2">
            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {entry.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-sky-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          {entry.title && (
            <p className="mt-1 text-[13px] font-semibold text-slate-50 sm:text-sm">
              {entry.title}
            </p>
          )}
          {entry.summary && (
            <p className="mt-1 text-[12px] leading-relaxed text-slate-200 sm:text-[13px]">
              {entry.summary}
            </p>
          )}
        </div>
      ))}
      {lastUpdated && (
        <p className="text-[10px] text-slate-400">
          Last updated{" "}
          {new Date(lastUpdated).toLocaleDateString(undefined, {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
          .
        </p>
      )}
    </div>
  );
}

function SkillBadges({ variants }: { variants: SimpleVariants }) {
  const groups = [
    ["PyTorch", "Transformers", "CNNs", "LLMs", "LoRA"],
    ["FastAPI", "Django", "Redis", "Celery"],
    ["AWS Lambda", "S3", "DynamoDB", "CloudWatch"],
    ["Docker", "Kubernetes", "CI/CD"],
  ];

  return (
    <motion.div
      variants={variants}
      className="flex flex-wrap gap-2 pt-3 text-[11px] text-slate-200"
    >
      {groups.flat().map((label) => (
        <span
          key={label}
          className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 backdrop-blur-md"
        >
          {label}
        </span>
      ))}
    </motion.div>
  );
}

function MetricRow({ variants }: { variants: SimpleVariants }) {
  const metrics = [
    { label: "Model latency", value: "148 ms", detail: "AWS Lambda · P95" },
    { label: "GPU memory savings", value: "95%", detail: "LoRA fine‑tuning" },
    { label: "Pipeline throughput", value: "3200 req/min", detail: "SmartCache API" },
  ];

  return (
    <motion.div
      variants={variants}
      className="mt-4 grid gap-3 text-xs text-slate-200 sm:grid-cols-3"
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-xl border border-white/10 bg-slate-950/70 px-3 py-3 backdrop-blur-md"
            >
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            {metric.label}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-50">{metric.value}</p>
          <p className="mt-0.5 text-[11px] text-slate-400">{metric.detail}</p>
        </div>
      ))}
    </motion.div>
  );
}

function HeroBackgroundVisual() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Attention grid */}
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-x-0 top-10 mx-auto h-[360px] max-w-4xl"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 960 360"
          preserveAspectRatio="xMidYMid slice"
        >
          <g stroke="rgba(148,163,184,0.25)" strokeWidth="0.5">
            <line x1="40" y1="60" x2="920" y2="60" />
            <line x1="40" y1="150" x2="920" y2="150" />
            <line x1="40" y1="240" x2="920" y2="240" />
            <line x1="40" y1="330" x2="920" y2="330" />
            <line x1="80" y1="40" x2="80" y2="340" />
            <line x1="260" y1="40" x2="260" y2="340" />
            <line x1="440" y1="40" x2="440" y2="340" />
            <line x1="620" y1="40" x2="620" y2="340" />
            <line x1="800" y1="40" x2="800" y2="340" />
          </g>

          {/* Attention nodes */}
          {[0, 1, 2, 3, 4, 5].map((row) =>
            [0, 1, 2, 3].map((col) => {
              const cx = 80 + col * 200 + (row % 2 === 0 ? 20 : -10);
              const cy = 60 + row * 45;
              const key = `${row}-${col}`;
              return (
                <motion.circle
                  key={key}
                  cx={cx}
                  cy={cy}
                  r={6}
                  fill="rgba(96,165,250,0.9)"
                  initial={{ opacity: 0.1, scale: 0.6 }}
                  animate={{
                    opacity: [0.15, 0.8, 0.15],
                    scale: [0.6, 1.1, 0.6],
                  }}
                  transition={{
                    duration: 5 + row,
                    repeat: Infinity,
                    delay: col * 0.4,
                    ease: "easeInOut",
                  }}
                />
              );
            }),
          )}
        </svg>
      </motion.div>

      {/* Cloud region map overlay */}
      <motion.div
        initial={{ opacity: 0.25 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-x-0 bottom-10 mx-auto h-40 max-w-3xl"
      >
        <svg className="h-full w-full" viewBox="0 0 600 200">
          <g stroke="rgba(148,163,184,0.4)" strokeWidth="0.5">
            <path d="M40 150 C 140 60 260 60 360 120 C 440 160 520 140 560 120" />
            <path d="M60 130 C 180 40 320 40 520 110" />
          </g>
          {[
            { x: 60, y: 140 },
            { x: 200, y: 90 },
            { x: 320, y: 120 },
            { x: 450, y: 130 },
            { x: 540, y: 110 },
          ].map((dot, index) => (
            <motion.circle
              key={index}
              cx={dot.x}
              cy={dot.y}
              r={5}
              fill="rgba(56,189,248,0.9)"
              initial={{ opacity: 0.2, scale: 0.8 }}
              animate={{
                opacity: [0.2, 0.9, 0.2],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.6,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      className="space-y-8 border-t border-white/10 pt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
    >
      <header className="space-y-3">
        <motion.p
          variants={item}
          className="text-xs sm:text-[13px] font-medium uppercase tracking-[0.26em] text-slate-400"
        >
          Qualifications
        </motion.p>
        <motion.h2
          variants={item}
          className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-[2.35rem]"
        >
          Building ML systems, platforms, and growth‑driven products
        </motion.h2>
      </header>

      <section className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)]">
        {/* Left: Work Experience timeline */}
        <div className="relative">
          <div className="absolute left-[10px] top-0 hidden h-full w-px bg-gradient-to-b from-slate-600/60 via-slate-700/40 to-transparent md:block" />
          <div className="space-y-6">
            {EXPERIENCE.map((exp, index) => (
              <PanCardDown
                // eslint-disable-next-line react/no-array-index-key
                key={`${exp.company}-${exp.role}-${index}`}
                className="group relative flex gap-4 md:pl-10"
              >
                <div className="mt-1 hidden flex-col items-center md:flex">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-slate-900 shadow-sm">
                    <span className="text-[11px] font-semibold text-slate-100">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div className="glass-card flex-1 border border-white/10 p-5 sm:p-6 transition hover:border-sky-400/80 hover:shadow-[0_0_24px_rgba(56,189,248,0.7)] group-hover:border-sky-400/80 group-hover:shadow-[0_0_24px_rgba(56,189,248,0.7)]">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-50 sm:text-base md:text-lg">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-slate-300">
                        {exp.company}
                        {exp.location ? ` · ${exp.location}` : ""}
                      </p>
                    </div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 text-right">
                      {exp.period}
                    </p>
                  </div>
                  <div className="mt-3 grid gap-3 text-sm text-slate-300 sm:grid-cols-[2fr,1.1fr] sm:text-[15px]">
                    <ul className="space-y-1.5">
                      {exp.focusAreas.map((point) => {
                        const textWithoutDash = point.replace(/^\s*-\s*/, "");
                        return (
                          <li key={point} className="relative pl-4">
                            <span className="absolute left-0 top-2 h-[3px] w-2 rounded-full bg-sky-400" />
                            <span>{textWithoutDash}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="rounded-lg border border-white/10 bg-slate-950/60 p-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        Stack
                      </p>
                      <p className="mt-1 text-xs text-slate-200 sm:text-[13px]">
                        {exp.technologies?.join(" · ")}
                      </p>
                    </div>
                  </div>
                </div>
              </PanCardDown>
            ))}
          </div>
        </div>

        {/* Right: Education column */}
        <div className="space-y-4 md:border-l md:border-white/10 md:pl-6">
          <motion.h3
            variants={item}
            className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400"
          >
            Education
          </motion.h3>
          <div className="grid gap-4">
            {EDUCATION.map((edu, index) => (
              <PanCardDown
                // eslint-disable-next-line react/no-array-index-key
                key={`${edu.school}-${edu.degree}-${index}`}
                className="glass-card border border-white/10 p-5 sm:p-6 transition hover:border-sky-400/80 hover:shadow-[0_0_24px_rgba(56,189,248,0.7)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-slate-300 sm:text-sm">
                      {edu.school}
                      {edu.location ? ` · ${edu.location}` : ""}
                    </p>
                  </div>
                  {edu.period && (
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                      {edu.period}
                    </p>
                  )}
                </div>
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-300 sm:text-[13px]">
                    {edu.highlights.map((point) => (
                      <li key={point} className="relative pl-4">
                        <span className="absolute left-0 top-2 h-[3px] w-2 rounded-full bg-emerald-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </PanCardDown>
            ))}
          </div>
        </div>
      </section>
    </motion.section>
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

function ProjectsSection() {
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
    <motion.section
      id="projects"
      className="space-y-8 border-t border-white/10 pt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
    >
      <header className="space-y-3">
        <motion.p
          variants={item}
          className="text-xs sm:text-[13px] font-medium uppercase tracking-[0.26em] text-slate-400"
        >
          Systems & Experiments
        </motion.p>
        <motion.h2
          variants={item}
          className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl"
        >
          Projects across ML systems, research, and production backends
        </motion.h2>
      </header>

      <section className="space-y-6">
        {FEATURED_PROJECTS.map((project) => (
          <PanCardDown
            key={project.slug}
            className="glass-card overflow-hidden border border-white/10 p-5 sm:p-6 transition hover:border-sky-400/80 hover:shadow-[0_0_24px_rgba(56,189,248,0.7)]"
          >
            <div className="flex flex-col gap-5">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-slate-50 sm:text-lg">
                    {project.name}
                  </h3>
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-slate-300">{project.shortDescription}</p>
                <div className="grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
                  <div>
                    <p className="inline-flex items-center gap-1 rounded-full border border-red-500/50 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-200 shadow-[0_0_12px_rgba(248,113,113,0.65)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.9)]" />
                      Problem
                    </p>
                    <p className="mt-2">{project.problem}</p>
                  </div>
                  <div>
                    <p className="inline-flex items-center gap-1 rounded-full border border-emerald-400/50 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.65)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
                      Solution
                    </p>
                    <p className="mt-2">{project.solution}</p>
                  </div>
                  {project.impact && (
                    <div>
                      <p className="inline-flex items-center gap-1 rounded-full border border-sky-400/50 bg-sky-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-200 shadow-[0_0_12px_rgba(56,189,248,0.65)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
                        Insight
                      </p>
                      <p className="mt-2">{project.impact}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2 text-[11px] text-slate-300">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-slate-900/60 px-2.5 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </PanCardDown>
        ))}
      </section>

      <section className="space-y-4 border-t border-white/10 pt-6">
        <motion.h3
          variants={item}
          className="text-[13px] sm:text-sm font-semibold uppercase tracking-[0.22em] text-slate-400"
        >
          GitHub Activity
        </motion.h3>
        <div className="glass-card space-y-3 border border-dashed border-white/20 px-4 py-4 text-xs text-slate-300">
          {loading && <p>Loading repositories…</p>}
          {!loading && repos && repos.length === 0 && (
            <p className="text-slate-400">
              No repositories found or GitHub API is currently unavailable. This section will
              auto‑populate once the API responds.
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
                  className="group rounded-lg border border-white/10 bg-slate-950/60 p-3 transition hover:border-sky-400/80 hover:bg-slate-900 hover:shadow-[0_0_24px_rgba(56,189,248,0.6)]"
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
    </motion.section>
  );
}

function GitHubContributionsSection() {
  return (
    <section className="mt-12 px-4">
      <div className="mt-0 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 shadow-xl max-w-4xl mx-auto">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold tracking-tight text-slate-50 sm:text-base">
            GitHub Contributions
          </h3>
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            Live from GitHub
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/60 p-3">
          <img
            src="/api/github-contributions"
            alt="GitHub contributions"
            className="contributions-graph w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <motion.section
      id="skills"
      className="space-y-8 border-t border-white/10 pt-12 pb-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-80px" }}
      variants={container}
    >
      <header className="space-y-3">
        <motion.p
          variants={item}
          className="text-xs sm:text-[13px] font-medium uppercase tracking-[0.26em] text-slate-400"
        >
          Skills
        </motion.p>
        <motion.h2
          variants={item}
          className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl"
        >
          Skills
        </motion.h2>
      </header>

      <section className="space-y-4">
        <div className="space-y-4">
          {SKILL_CATEGORIES.map((category) => (
            <PanCardDown
              key={category.name}
              className="glass-card border border-white/10 p-5 sm:p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-sky-400/80 bg-sky-500/20 text-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.6)]">
                  {category.icon ? (
                    <Image
                      src={category.icon}
                      alt={`${category.name} icon`}
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <span className="text-xs font-semibold tracking-[0.18em]">
                      {"</>"}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="mt-1 text-xs text-slate-300">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <SkillRowInline
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </PanCardDown>
          ))}
        </div>

        <SkillsCarousel />
      </section>
    </motion.section>
  );
}

function AboutSection() {
  const rolesForCarousel = LEADERSHIP.map((entry) => ({
    title: entry.organization,
    subtitle:
      entry.organization.toLowerCase().includes("nyu") && entry.role
        ? "STUDENT AMBASSADOR"
        : entry.role,
    bullet1: entry.highlights[0] ?? "",
    bullet2: entry.highlights[1] ?? "",
  }));

  return (
    <motion.section
      id="about"
      className="space-y-8 border-t border-white/10 pt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
    >
      <header className="space-y-3">
        <motion.p
          variants={item}
          className="text-xs sm:text-[13px] font-medium uppercase tracking-[0.26em] text-slate-400"
        >
          Leadership &amp; Volunteering
        </motion.p>
        <motion.h2
          variants={item}
          className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl"
        >
          Building communities through leadership and service
        </motion.h2>
        {/* Intro text intentionally left blank for now; content to be added later. */}
      </header>

      <section className="mt-6">
        <motion.div variants={item} className="space-y-5">
          <VerticalCarousel roles={rolesForCarousel} />
        </motion.div>
      </section>
    </motion.section>
  );
}

function ContactSection() {
  const [status, setStatus] = useState<ContactStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Contact submission failed with status ${response.status}`);
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      // Keep UX friendly while surfacing issues for debugging.
      console.error("Homepage contact form error:", error);
      setStatus("error");
    } finally {
      // Let the toast sit for a moment, then clear it.
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }
  }

  return (
    <DownPanSection id="contact" className="space-y-8 border-t border-white/10 pt-12 pb-12">
      <header className="space-y-3">
        <motion.p
          variants={item}
          className="text-xs sm:text-[13px] font-medium uppercase tracking-[0.26em] text-slate-400"
        >
          Contact
        </motion.p>
        <motion.h2
          variants={item}
          className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl"
        >
          Let&apos;s talk about ML systems, cloud, or full‑stack work
        </motion.h2>
        <motion.p
          variants={item}
          className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-[15px]"
        >
          Use the form below to reach out about roles, collaborations, or anything related to my
          work in ML, cloud, and AI-powered systems.
        </motion.p>
      </header>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
        <motion.form
          variants={item}
          onSubmit={handleSubmit}
          className="glass-card space-y-4 border border-white/10 p-5 sm:p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 text-sm">
              <label
                htmlFor="name"
                className="text-xs font-medium text-slate-200"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="h-9 w-full rounded-md border border-white/15 bg-black/20 px-3 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-1.5 text-sm">
              <label
                htmlFor="email"
                className="text-xs font-medium text-slate-200"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="h-9 w-full rounded-md border border-white/15 bg-black/20 px-3 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="space-y-1.5 text-sm">
            <label
              htmlFor="message"
              className="text-xs font-medium text-slate-200"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
              placeholder="Tell me a bit about what you have in mind."
            />
          </div>
          <div className="flex items-center justify-between gap-3 pt-1 text-xs">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center rounded-full bg-blue-500 px-4 py-2 text-xs font-medium text-slate-50 shadow-md shadow-blue-500/30 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Send message"}
            </button>
            {status === "success" && (
              <span className="rounded-full border border-sky-500/60 bg-sky-500/10 px-3 py-1 text-[11px] text-sky-300 shadow-sm">
                Message sent!
              </span>
            )}
            {status === "error" && (
              <span className="rounded-full border border-red-500/60 bg-red-500/10 px-3 py-1 text-[11px] text-red-300 shadow-sm">
                Please try again.
              </span>
            )}
          </div>
        </motion.form>

        <motion.aside
          variants={item}
          className="glass-card relative flex flex-col justify-between border border-white/10 bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-950/95 p-6 text-sm text-slate-200 shadow-lg shadow-sky-900/30 sm:p-7"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[12px] font-semibold tracking-[0.18em] text-slate-300">
                Let&apos;s talk
              </p>
              <div className="h-px w-16 rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-transparent" />
            </div>
            <p className="leading-relaxed sm:text-[15px]">
              I usually get back within a day or two.
            </p>
            <p className="leading-relaxed sm:text-[15px]">
              Whether it&apos;s a technical question, an opportunity, or just a hello, I&apos;d
              love to hear from you.
            </p>
            <motion.button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-sky-500/70 bg-sky-500/5 px-4 py-1.5 text-xs font-medium text-sky-200 transition hover:border-sky-400 hover:bg-sky-500/15 hover:text-sky-100"
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ scale: 1.03 }}
            >
              Excited to connect!
            </motion.button>
          </div>
        </motion.aside>
      </section>
    </DownPanSection>
  );
}

function ArchitectureInline() {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-[11px] text-slate-200">
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
        Inference pipeline (simplified)
      </p>
      <div className="grid grid-cols-4 gap-2">
        {["API", "Vector / Cache", "Model", "Storage / Monitoring"].map((node, idx) => (
          <div
            key={node}
            className={cn(
              "rounded-md border px-2 py-1.5 text-[10px]",
              idx === 0 && "border-sky-500/60 bg-sky-500/10",
              idx === 1 && "border-teal-500/60 bg-teal-500/10",
              idx === 2 && "border-violet-500/60 bg-violet-500/10",
              idx === 3 && "border-amber-400/60 bg-amber-400/5",
            )}
          >
            {node}
          </div>
        ))}
      </div>
    </div>
  );
}

type InlineMetric = {
  label: string;
  value: string;
  variant?: "positive" | "warning" | "accent";
};

function MetricsInline({ metrics }: { metrics: InlineMetric[] }) {
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
    </div>
  );
}

type SkillRowProps = {
  name: string;
  level: "working" | "advanced" | "expert";
};

function SkillRowInline({ name }: SkillRowProps) {
  const iconMap: Partial<Record<string, IconType>> = {
    // Programming
    Python: SiPython,
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    "C++": SiSequelize,
    SQL: SiPostgresql,
    // ML & AI
    PyTorch: SiPytorch,
    TensorFlow: SiTensorflow,
    HuggingFace: SiHuggingface,
    "Scikit-learn": SiScikitlearn,
    OpenCV: SiOpencv,
    "Classical ML": SiPython,
    // Backend & APIs
    Django: SiDjango,
    FastAPI: SiFastapi,
    Flask: SiPython,
    "Node.js": SiNodedotjs,
    Express: SiExpress,
    "REST APIs": SiSwagger,
    Kafka: SiApachekafka,
    Celery: SiCelery,
    "System Design": SiGitlab,
    // Frontend
    React: SiReact,
    HTML5: SiHtml5,
    CSS3: SiCss3,
    Bootstrap: SiBootstrap,
    // Cloud & DevOps - AWS
    AWS: FaAws,
    Lambda: FaAws,
    Lex: FaRobot,
    Rekognition: FaAws,
    S3: FaAws,
    RDS: FaDatabase,
    DynamoDB: FaDatabase,
    OpenSearch: SiElasticsearch,
    SES: FaAws,
    SQS: FaAws,
    "API Gateway": FaServer,
    CloudFormation: FaCloud,
    CodePipeline: SiGithubactions,
    "Amazon Bedrock": FaRobot,
    EKS: FaAws,
    // Cloud & DevOps - Other
    GCP: SiGooglecloud,
    Docker: SiDocker,
    Kubernetes: SiKubernetes,
    kubectl: SiKubernetes,
    "CI/CD": SiGithubactions,
    CLI: FaTerminal,
    // Databases
    PostgreSQL: SiPostgresql,
    MongoDB: SiMongodb,
    "MongoDB Compass": SiMongodb,
    Firebase: SiFirebase,
    MySQL: SiMysql,
    Redis: SiRedis,
    // Data Tools
    Pandas: SiPython,
    NumPy: SiNumpy,
    PySpark: SiApachespark,
    // Infrastructure & Monitoring
    Prometheus: SiPrometheus,
    CloudWatch: FaAws,
    // Tools & Productivity
    Git: SiGit,
    GitHub: SiGithub,
    Postman: SiPostman,
    "Docker Hub": SiDocker,
    Swagger: SiSwagger,
  };

  const iconColorMap: Partial<Record<string, string>> = {
    // Programming
    Python: "text-[#3776AB]",
    JavaScript: "text-[#F7DF1E]",
    TypeScript: "text-[#3178C6]",
    "C++": "text-[#00599C]",
    SQL: "text-[#336791]",
    // ML & AI
    PyTorch: "text-[#EE4C2C]",
    TensorFlow: "text-[#FF6F00]",
    HuggingFace: "text-[#FFCC4D]",
    "Scikit-learn": "text-[#F7931E]",
    OpenCV: "text-[#5C3EE8]",
    "Classical ML": "text-[#3776AB]",
    // Backend & APIs
    Django: "text-[#092E20]",
    FastAPI: "text-[#05998b]",
    Flask: "text-[#ffffff]",
    "Node.js": "text-[#3C873A]",
    Express: "text-[#ffffff]",
    Kafka: "text-[#231F20]",
    Celery: "text-[#37814A]",
    "System Design": "text-[#FC6D26]",
    // Frontend
    React: "text-[#61DAFB]",
    HTML5: "text-[#E34F26]",
    CSS3: "text-[#1572B6]",
    Bootstrap: "text-[#7952B3]",
    // Cloud & DevOps - AWS (Orange theme)
    AWS: "text-[#FF9900]",
    Lambda: "text-[#FF9900]",
    Lex: "text-[#FF9900]",
    Rekognition: "text-[#FF9900]",
    S3: "text-[#569A31]",
    RDS: "text-[#527FFF]",
    DynamoDB: "text-[#4053D6]",
    OpenSearch: "text-[#005EB8]",
    SES: "text-[#DD344C]",
    SQS: "text-[#FF4F8B]",
    "API Gateway": "text-[#FF4F8B]",
    CloudFormation: "text-[#FF4F8B]",
    CodePipeline: "text-[#2088FF]",
    "Amazon Bedrock": "text-[#01A88D]",
    EKS: "text-[#FF9900]",
    CloudWatch: "text-[#FF4F8B]",
    // Cloud & DevOps - Other
    GCP: "text-[#4285F4]",
    Docker: "text-[#0db7ed]",
    Kubernetes: "text-[#326CE5]",
    kubectl: "text-[#326CE5]",
    "CI/CD": "text-[#2088FF]",
    CLI: "text-[#4EAA25]",
    // Databases
    PostgreSQL: "text-[#336791]",
    MongoDB: "text-[#47A248]",
    "MongoDB Compass": "text-[#47A248]",
    Firebase: "text-[#FFCA28]",
    MySQL: "text-[#00758F]",
    Redis: "text-[#DC382D]",
    // Data Tools
    PySpark: "text-[#E25A1C]",
    // Infrastructure & Monitoring
    Prometheus: "text-[#E6522C]",
    // Tools & Productivity
    Git: "text-[#F1502F]",
    GitHub: "text-[#F9FAFB]",
    Postman: "text-[#FF6C37]",
    Swagger: "text-[#85EA2D]",
  };

  const Icon = iconMap[name as keyof typeof iconMap];
  const hasIcon = Boolean(Icon);

  return (
    <button
      type="button"
      className="group flex flex-col justify-between rounded-lg border border-white/10 bg-slate-950/70 p-2.5 text-left text-[11px] text-slate-200 shadow-sm transition hover:border-sky-500/60 hover:bg-slate-900/90 hover:shadow-lg hover:shadow-sky-900/40"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-slate-900/80 text-[10px] text-slate-200 group-hover:border-sky-400/70 group-hover:bg-sky-500/10">
          {Icon ? (
            <Icon className={cn("h-3.5 w-3.5", iconColorMap[name] ?? "text-slate-200")} />
          ) : (
            <span className="font-semibold">{name[0]}</span>
          )}
        </div>
        <div className="relative">
          <span
            className={cn(
              "text-[13px] font-medium",
              hasIcon
                ? "text-slate-50 group-hover:opacity-0 group-hover:transition-opacity"
                : "text-slate-50",
            )}
          >
            {name}
          </span>
          {hasIcon && (
            <span className="pointer-events-none absolute inset-0 flex items-center text-[13px] font-medium text-sky-200 opacity-0 group-hover:opacity-100 group-hover:transition-opacity">
              {name}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

