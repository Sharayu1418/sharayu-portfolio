"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

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

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi, I’m the portfolio assistant. Ask me about Sharayu’s ML systems, cloud experience, or specific projects like SmartCache AI, the multimodal depression detector, or the LoRA‑RoBERTa news classifier.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    const nextId = messages.length ? messages[messages.length - 1].id + 1 : 1;
    const userMessage: Message = {
      id: nextId,
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmed }),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as { answer?: string };

      const assistantMessage: Message = {
        id: nextId + 1,
        role: "assistant",
        content:
          data.answer ??
          "Something went wrong reaching the assistant, but the UI and mocked backend are wired correctly.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: nextId + 1,
        role: "assistant",
        content:
          "I couldn’t reach the backend just now. Please try again in a moment or refresh the page.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  }

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
          AI Chatbot Assistant
        </motion.p>
        <motion.h1
          variants={item}
          className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl"
        >
          Ask questions about Sharayu’s AI, cloud, and engineering work
        </motion.h1>
        <motion.p
          variants={item}
          className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-[15px]"
        >
          This assistant is wired to a mocked backend that understands the core
          projects and themes in the portfolio. Later, it can be upgraded to use
          OpenAI and retrieval over the full resume and GitHub history.
        </motion.p>
      </header>

      <section className="glass-card flex min-h-[360px] flex-col border border-white/10 p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between text-[11px] text-slate-400">
          <span className="uppercase tracking-[0.18em]">Conversation</span>
          <span>{isThinking ? "Thinking…" : "Ready"}</span>
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto rounded-lg bg-slate-950/60 p-3 text-xs text-slate-200">
          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <div
                className={
                  message.role === "user"
                    ? "max-w-[80%] rounded-2xl bg-blue-500 px-3 py-2 text-[11px] text-slate-50"
                    : "max-w-[80%] rounded-2xl bg-slate-900 px-3 py-2 text-[11px] text-slate-100"
                }
              >
                {message.content}
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl bg-slate-900 px-3 py-2 text-[11px] text-slate-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
                <span>Generating answer…</span>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSend} className="mt-3 flex gap-2 text-xs">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about SmartCache AI, deployment patterns on AWS, or a specific project…"
            className="h-9 flex-1 rounded-full border border-white/15 bg-black/20 px-3 text-[11px] text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isThinking}
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-4 text-[11px] font-medium text-slate-50 shadow-md shadow-blue-500/30 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Send
          </button>
        </form>
      </section>
    </motion.div>
  );
}


