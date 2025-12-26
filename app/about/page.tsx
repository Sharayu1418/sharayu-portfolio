"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ABOUT_SUMMARY,
  COUNTERS,
  EDUCATION,
  LEADERSHIP,
} from "@/lib/content";

const container = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      // Framer Motion type is strict here; cast ease for simplicity.
      ease: "easeOut" as any,
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
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
          About
        </motion.p>
        <motion.h1
          variants={item}
          className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl"
        >
          Journey into ML engineering and cloud‑native systems
        </motion.h1>
        <motion.p
          variants={item}
          className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-[15px]"
        >
          A short story of how I moved from learning the fundamentals to
          building production systems that blend AI, backend engineering, and
          cloud infrastructure.
        </motion.p>
      </header>

      <section className="grid gap-6 md:grid-cols-[minmax(0,2.1fr)_minmax(0,1.4fr)]">
        <motion.div variants={item} className="space-y-4">
          <div className="space-y-3 text-sm text-slate-300">
            <p className="font-medium text-slate-100">{ABOUT_SUMMARY.headline}</p>
            {ABOUT_SUMMARY.body.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass-card border border-white/10 p-4 text-xs text-slate-200">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Education
              </p>
              <ul className="mt-2 space-y-2">
                {EDUCATION.map((edu) => (
                  <li key={edu.school}>
                    <p className="text-[13px] font-semibold text-slate-50">
                      {edu.school}
                    </p>
                    <p>{edu.degree}</p>
                    <p className="text-[11px] text-slate-400">
                      {edu.location} · {edu.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 text-xs text-slate-200">
              <div className="glass-card border border-white/10 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Leadership
                </p>
                <ul className="mt-2 space-y-2">
                  {LEADERSHIP.map((role) => (
                    <li key={role.organization}>
                      <p className="text-[13px] font-semibold text-slate-50">
                        {role.organization}
                      </p>
                      <p>{role.role}</p>
                      <p className="text-[11px] text-slate-400">{role.period}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card border border-white/10 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Certifications & Achievements
                </p>
                <p className="mt-2 text-[11px] text-slate-300">
                  Google Cloud Skills Boost profile with hands‑on labs in cloud engineering,
                  BigQuery ML, security, networking, and ML APIs.
                </p>
                <a
                  href="https://www.skills.google/public_profiles/8fef00cc-7281-46ba-a7e7-2e6b360a273d"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center justify-center rounded-full border border-blue-500/50 bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-sky-200 shadow-sm shadow-blue-500/40 transition hover:bg-blue-500/20"
                >
                  View Google Cloud Skills profile
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.aside
          variants={item}
          className="flex flex-col gap-4 md:pl-2"
        >
          <div className="glass-card relative border border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/15 bg-slate-900">
                <Image
                  src="/profile.jpg"
                  alt="Profile placeholder"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Profile
                </p>
                <p className="text-sm font-semibold text-slate-50">
                  Sharayu Rasal
                </p>
                <p className="text-[11px] text-slate-400">
                  Software Engineer • ML Engineer • Cloud Engineer
                </p>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-slate-400">
              Replace this placeholder with a real profile photo in{" "}
              <span className="font-semibold text-slate-200">
                /public/profile.jpg
              </span>
              .
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <CounterCard label="Years coding" value={COUNTERS.yearsCoding} />
            <CounterCard label="Projects built" value={COUNTERS.projectsBuilt} />
            <CounterCard
              label="Cloud deployments"
              value={COUNTERS.cloudDeployments}
            />
          </div>
        </motion.aside>
      </section>
    </motion.div>
  );
}

type CounterCardProps = {
  label: string;
  value: number;
};

function CounterCard({ label, value }: CounterCardProps) {
  const safeValue = Number.isFinite(value) ? value : 0;

  return (
    <div className="glass-card flex flex-col justify-between border border-white/10 p-3 text-xs text-slate-200">
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <motion.p
        initial={{ opacity: 0.4, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-2 text-2xl font-semibold text-slate-50"
      >
        {safeValue}
      </motion.p>
      <p className="mt-1 text-[10px] text-slate-500">
        Placeholder value – update in <code>COUNTERS</code> once final numbers
        are known.
      </p>
    </div>
  );
}


