 "use client";

import { useEffect, useRef, useState } from "react";
import { SocialLinks } from "@/components/social-links";

const DEFAULT_COMMIT =
  'git commit -m "Where computer science meets real-world impact"';

export function SiteFooter() {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [techHeadline, setTechHeadline] = useState<string | null>(null);
  const [hasFetchedNews, setHasFetchedNews] = useState(false);
  const [isFetchingNews, setIsFetchingNews] = useState(false);
  const commandRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const el = commandRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(timeout);
  }, [copied]);

  const fetchTechNews = async () => {
    if (hasFetchedNews || isFetchingNews) return;

    try {
      setIsFetchingNews(true);
      const res = await fetch("/api/technews");
      if (!res.ok) throw new Error("Failed to fetch tech news");
      const data = await res.json();
      const headlines: string[] = Array.isArray(data?.headlines) ? data.headlines : [];
      if (headlines.length) {
        const random = headlines[Math.floor(Math.random() * headlines.length)];
        setTechHeadline(random);
      }
      setHasFetchedNews(true);
    } catch {
      // swallow errors and keep default commit message
    } finally {
      setIsFetchingNews(false);
    }
  };

  const showTechHeadline = Boolean(techHeadline) && isHovered;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(DEFAULT_COMMIT);
        setCopied(true);
      }
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <footer className="mt-12 border-t border-white/10 py-8 text-xs text-slate-500">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2 text-left">
          <p className="font-mono text-lg font-semibold text-sky-300 sm:text-2xl">
            cd sharayu-rasal/
          </p>
          <button
            ref={commandRef}
            type="button"
            onMouseEnter={() => {
              setIsHovered(true);
              fetchTechNews();
            }}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => {
              setIsHovered(true);
              fetchTechNews();
            }}
            onBlur={() => setIsHovered(false)}
            onClick={handleCopy}
            className="group inline-flex cursor-pointer items-center gap-2 font-mono text-base font-semibold text-sky-300 footer-command-fade-in sm:text-xl"
          >
            <span className="relative inline-block min-w-[48ch] max-w-full whitespace-normal break-words text-left">
              <span
                className={`transition-opacity duration-200 ${
                  showTechHeadline ? "opacity-0" : "opacity-100"
                }`}
              >
                {DEFAULT_COMMIT}
              </span>
              <span
                className={`absolute inset-0 transition-opacity duration-200 ${
                  showTechHeadline ? "opacity-100" : "opacity-0"
                }`}
              >
                {techHeadline
                  ? `git commit -m "Tech News: ${techHeadline}"`
                  : DEFAULT_COMMIT}
              </span>
            </span>
            <span
              className={`ml-0.5 inline-block h-3 w-px bg-sky-300 ${
                isVisible && !isHovered ? "footer-cursor-blink" : "opacity-0"
              }`}
            />
            <span
              className={`text-[11px] text-slate-400/80 italic transition-all duration-200 ${
                isHovered ? "opacity-0" : "opacity-90 group-hover:text-sky-200"
              }`}
            >
              hover for an insight
            </span>
            <span
              className={`text-[10px] text-emerald-300 transition-opacity duration-200 ${
                copied ? "opacity-100" : "opacity-0"
              }`}
            >
              Copied!
            </span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
            Connect
          </span>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}


