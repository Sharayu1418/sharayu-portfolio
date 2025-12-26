"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs, { type EmailJSResponseStatus } from "emailjs-com";

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

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    setStatus("submitting");
    try {
      const response: EmailJSResponseStatus = await emailjs.send(
        "service_i3qdekK",
        "template_510u2yr",
        {
          from_name: name,
          email,
          reply_to: email,
          message,
        },
        "YNm7ASgIyNpSjCUhP",
      );

      if (response.status !== 200) {
        throw new Error(`EmailJS failed with status ${response.status}`);
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      // Surface the error in development while keeping UX friendly.
      console.error("EmailJS contact form error:", error);
      setStatus("error");
    } finally {
      setTimeout(() => {
        setStatus("idle");
      }, 3500);
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
          Contact
        </motion.p>
        <motion.h1
          variants={item}
          className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl"
        >
          Let&apos;s talk about ML systems, cloud, or building products.
        </motion.h1>
        <motion.p
          variants={item}
          className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-[15px]"
        >
          Use the form below for collaboration, roles, or questions about any of
          the projects. You&apos;ll receive a reply at the email you provide.
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
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-full border border-sky-500/60 bg-sky-500/10 px-3 py-1 text-[11px] text-sky-300 shadow-sm"
              >
                Message sent! I&apos;ll get back to you soon.
              </motion.span>
            )}
            {status === "error" && (
              <span className="rounded-full border border-red-500/60 bg-red-500/10 px-3 py-1 text-[11px] text-red-300 shadow-sm">
                Something went wrong — please try again.
              </span>
            )}
          </div>
        </motion.form>

        <motion.aside
          variants={item}
          className="glass-card flex flex-col justify-between border border-white/10 p-5 text-xs text-slate-200 sm:p-6"
        >
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Response expectations
            </p>
            <p>
              I typically respond to relevant opportunities and collaboration
              requests within 1–2 business days. If you&apos;re sharing a
              technical problem, including a short description of your stack and
              constraints helps a lot.
            </p>
          </div>
          <p className="mt-4 text-[10px] text-slate-500">
            This form is backed by an API route that can send emails via a
            provider like Resend or SMTP. In development or without credentials,
            it falls back to a safe mocked mode.
          </p>
        </motion.aside>
      </section>
    </motion.div>
  );
}


