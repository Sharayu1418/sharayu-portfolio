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

export default function MLExplorerPage() {
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
          Model Explorer
        </motion.p>
        <motion.h1
          variants={item}
          className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl"
        >
          Visualising CNN and transformer internals
        </motion.h1>
        <motion.p
          variants={item}
          className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-[15px]"
        >
          A lightweight, static explorer for how convolutional networks and
          transformers reason about inputs. These diagrams are mocked but mirror
          the mental models I use when designing and debugging architectures.
        </motion.p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <motion.article
          variants={item}
          className="glass-card space-y-4 border border-white/10 p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                CNN Explorer
              </p>
              <p className="text-sm font-semibold text-slate-50">
                1D‑CNN for time‑series / HRV signals
              </p>
            </div>
          </div>
          <CNNDiagram />
          <p className="text-[11px] text-slate-400">
            This mirrors the multimodal depression detection pipeline: raw
            signals → feature extraction → 1D‑CNN blocks → pooled
            representation → classifier head.
          </p>
        </motion.article>

        <motion.article
          variants={item}
          className="glass-card space-y-4 border border-white/10 p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Transformer Explorer
              </p>
              <p className="text-sm font-semibold text-slate-50">
                LoRA‑tuned RoBERTa for news classification
              </p>
            </div>
          </div>
          <TransformerDiagram />
          <p className="text-[11px] text-slate-400">
            This approximates how the news classifier is structured: tokens +
            embeddings → stacked attention blocks with LoRA adapters → pooled
            CLS representation → classification head.
          </p>
        </motion.article>
      </section>
    </motion.div>
  );
}

function CNNDiagram() {
  const layers = [
    "Input: HRV / time‑series",
    "Conv1D + ReLU",
    "Conv1D + ReLU",
    "MaxPool",
    "Conv1D + ReLU",
    "Global Pool",
    "Dense + Output",
  ];

  return (
    <div className="relative overflow-hidden rounded-xl border border-sky-500/40 bg-slate-950/70 p-4 text-[11px] text-slate-200">
      <div className="grid gap-2">
        {layers.map((layer, index) => (
          <motion.div
            key={layer}
            initial={{ opacity: 0.4, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <div className="h-6 w-0.5 rounded-full bg-gradient-to-b from-sky-400 to-blue-500" />
            <div className="flex-1 rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-1.5">
              {layer}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TransformerDiagram() {
  const stages = ["Tokens + embeddings", "Multi‑head attention", "FFN", "LoRA adapters", "LayerNorm + residual", "CLS pooling", "Classifier head"];

  return (
    <div className="relative overflow-hidden rounded-xl border border-violet-500/40 bg-slate-950/70 p-4 text-[11px] text-slate-200">
      <div className="grid gap-2">
        {stages.map((stage, index) => (
          <motion.div
            key={stage}
            initial={{ opacity: 0.4, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <div className="flex-1 rounded-lg border border-violet-500/40 bg-violet-500/10 px-3 py-1.5">
              {stage}
            </div>
            <div className="h-6 w-0.5 rounded-full bg-gradient-to-b from-violet-400 to-fuchsia-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}


