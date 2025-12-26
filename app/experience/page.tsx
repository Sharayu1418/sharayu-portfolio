"use client";

import { motion } from "framer-motion";
import { EDUCATION, EXPERIENCE } from "@/lib/content";

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

export default function ExperiencePage() {
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
          Qualifications
        </motion.p>
        <motion.h1
          variants={item}
          className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl"
        >
          Building ML systems, platforms, and growth‑driven products
        </motion.h1>
        <motion.p
          variants={item}
          className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-[15px]"
        >
          A vertical timeline of qualifications across my education and roles in
          computer vision, data platforms, and full‑stack growth engineering.
        </motion.p>
      </header>

      <section className="relative">
        <div className="absolute left-[10px] top-0 hidden h-full w-px bg-gradient-to-b from-slate-600/60 via-slate-700/40 to-transparent md:block" />
        <div className="space-y-6">
          {EXPERIENCE.map((exp, index) => (
            <motion.article
              key={`${exp.company}-${exp.role}`}
              variants={item}
              className="relative flex gap-4 md:pl-10"
            >
              <div className="mt-1 hidden flex-col items-center md:flex">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-slate-900 shadow-sm">
                  <span className="text-[11px] font-semibold text-slate-100">
                    {index + 1}
                  </span>
                </div>
              </div>
              <div className="glass-card flex-1 border border-white/10 p-5 sm:p-6 transition hover:border-sky-400/80 hover:shadow-[0_0_24px_rgba(56,189,248,0.7)]">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
                      {exp.role}
                    </h2>
                    <p className="text-xs text-slate-300">
                      {exp.company}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </p>
                  </div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 text-right">
                    {exp.period}
                  </p>
                </div>
                <div className="mt-3 grid gap-3 text-xs text-slate-300 sm:grid-cols-[2fr,1.1fr]">
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
                    <p className="mt-1 text-[11px] text-slate-200">
                      {exp.technologies?.join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-4 border-t border-white/10 pt-6">
        <motion.h2
          variants={item}
          className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400"
        >
          Education
        </motion.h2>
        <div className="grid gap-4 md:grid-cols-2">
          {EDUCATION.map((edu) => (
            <motion.article
              key={`${edu.school}-${edu.degree}`}
              variants={item}
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
            </motion.article>
          ))}
        </div>
      </section>
    </motion.div>
  );
}


