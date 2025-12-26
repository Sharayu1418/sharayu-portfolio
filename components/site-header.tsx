"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type SectionId = "home" | "experience" | "projects" | "skills" | "about" | "contact";

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Qualifications" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "Leadership" },
  { id: "contact", label: "Contact" },
];

export function SiteHeader() {
  const CODE_TITLE = "def portfolio():";
  const NAME_TITLE = "Sharayu Rasal";

  const [progress, setProgress] = useState(0);
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [titleStage, setTitleStage] = useState<"code" | "binary" | "name">("code");
  const timerRef = useRef<number | null>(null);
  const sectionOffsetsRef = useRef<{ id: SectionId; offsetTop: number }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      const value = total > 0 ? (scrollTop / total) * 100 : 0;
      setProgress(value);

       // Update active nav item based on scroll position.
       const current = scrollTop + 120; // account for fixed header height
       const sections = sectionOffsetsRef.current;
       if (sections.length) {
         let currentId: SectionId = sections[0].id;
         for (const section of sections) {
           if (current >= section.offsetTop - 80) {
             currentId = section.id;
           } else {
             break;
           }
         }
         setActiveSection(currentId);
       }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
      // When the hero is fully out of view, we consider ourselves "past" it.
      setIsPastHero(!entry.isIntersecting);
    });

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const computeOffsets = () => {
      const ids: SectionId[] = ["home", "experience", "projects", "skills", "about", "contact"];
      const offsets: { id: SectionId; offsetTop: number }[] = [];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const offsetTop = window.scrollY + rect.top;
          offsets.push({ id, offsetTop });
        }
      });
      offsets.sort((a, b) => a.offsetTop - b.offsetTop);
      sectionOffsetsRef.current = offsets;
    };

    computeOffsets();
    window.addEventListener("resize", computeOffsets);

    return () => window.removeEventListener("resize", computeOffsets);
  }, []);

  // Handle text transformation sequence when crossing the hero boundary.
  useEffect(() => {
    const targetStage: "code" | "name" = isPastHero ? "name" : "code";

    // If we're already in the final stage, nothing to do.
    if ((targetStage === "name" && titleStage === "name") || (targetStage === "code" && titleStage === "code")) {
      return;
    }

    // Clear any previous timer.
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Step 1: show a short binary transition.
    setTitleStage("binary");

    // Step 2: after a brief pause, settle into the target text.
    const timeout = window.setTimeout(() => {
      setTitleStage(targetStage);
      timerRef.current = null;
    }, 420);

    timerRef.current = timeout;

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPastHero, titleStage]);

  return (
    <header className="sticky top-0 z-40 mb-8 flex items-center justify-between gap-4 border-b border-slate-800/80 bg-slate-950/90 px-6 py-4 backdrop-blur-md">
      <Link href="/" className="flex items-center gap-2">
        <div className="relative flex h-10 min-w-[18ch] items-center overflow-hidden sm:h-11 sm:min-w-[20ch] md:h-12 md:min-w-[22ch]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={titleStage}
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: [1, 1.05, 1] }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl md:text-3xl"
            >
              {titleStage === "code"
                ? CODE_TITLE
                : titleStage === "name"
                  ? NAME_TITLE
                  : "01001100 01101111 01100001 01100100"}
            </motion.span>
          </AnimatePresence>
        </div>
      </Link>

      <nav className="hidden items-center gap-3 text-sm font-medium text-slate-300 md:flex">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                isActive
                  ? "bg-sky-500/20 text-sky-100 border border-sky-500/70 shadow-sm shadow-sky-900/40"
                  : "border border-transparent text-slate-300 hover:bg-slate-800/80 hover:text-slate-100"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-slate-900/80">
        <div
          className="h-full bg-sky-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}


