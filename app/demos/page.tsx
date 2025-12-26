"use client";

import { motion } from "framer-motion";

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

export default function DemosPage() {
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
          ML Demos
        </motion.p>
        <motion.h1
          variants={item}
          className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl"
        >
          Interactive, mocked demos of typical ML workflows
        </motion.h1>
        <motion.p
          variants={item}
          className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-[15px]"
        >
          These demos simulate the UX of text classification, sentiment
          analysis, and image inference experiences. They currently use mocked
          outputs but are structured so they can be wired to real HuggingFace or
          OpenAI endpoints later.
        </motion.p>
      </header>

      <section className="grid gap-5 md:grid-cols-3">
        <DemoCard
          title="News topic classification"
          description="Classify news headlines into topics using a transformer‑based model (simulated LoRA‑RoBERTa)."
          placeholder="Paste a news headline…"
          mockOutputs={[
            "finance · high confidence",
            "technology · medium confidence",
            "health · exploratory",
          ]}
        />
        <DemoCard
          title="Sentiment / emotion analysis"
          description="Interpret user feedback into coarse‑grained sentiment buckets (e.g., positive, neutral, negative)."
          placeholder="Paste a user review or short paragraph…"
          mockOutputs={["positive", "neutral", "negative"]}
        />
        <DemoCard
          title="Image tagging"
          description="Upload an image and get back high‑level tags (currently mocked, but wired for future HuggingFace models)."
          placeholder="Describe an image you would upload…"
          mockOutputs={["industrial", "outdoor", "people", "text‑heavy"]}
        />
      </section>

      <motion.section
        variants={item}
        className="glass-card border border-dashed border-white/20 p-4 text-[11px] text-slate-400 sm:p-5"
      >
        <p className="font-medium text-slate-200">Hooking up real models</p>
        <p className="mt-1">
          To convert these into live demos, you can point each card at a
          HuggingFace Space or a small FastAPI / Next.js route that calls
          hosted models. The UI and state handling are isolated so you only need
          to replace the mock generators with real API calls.
        </p>
      </motion.section>
    </motion.div>
  );
}

type DemoCardProps = {
  title: string;
  description: string;
  placeholder: string;
  mockOutputs: string[];
};

function DemoCard({ title, description, placeholder, mockOutputs }: DemoCardProps) {
  const sample = mockOutputs[0];

  return (
    <motion.article
      variants={item}
      className="glass-card flex flex-col border border-white/10 p-4 text-xs text-slate-200 sm:p-5"
    >
      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
          Demo
        </p>
        <p className="text-sm font-semibold text-slate-50">{title}</p>
        <p className="text-[11px] text-slate-400">{description}</p>
      </div>
      <div className="mt-3 flex-1 space-y-2">
        <textarea
          rows={3}
          className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-[11px] text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
          placeholder={placeholder}
        />
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-3 py-1.5 text-[11px] font-medium text-slate-50 shadow-sm shadow-blue-500/30 transition hover:bg-blue-400"
          >
            Run (mocked)
          </button>
          <span className="text-[10px] text-slate-500">
            Output below is randomly sampled for now.
          </span>
        </div>
        <div className="mt-2 rounded-md border border-white/10 bg-slate-950/70 p-2 text-[11px] text-slate-200">
          Example output: <span className="font-semibold">{sample}</span>
        </div>
      </div>
    </motion.article>
  );
}


