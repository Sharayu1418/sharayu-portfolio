"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Role = {
  title: string;
  subtitle: string;
  bullet1: string;
  bullet2: string;
};

type VerticalCarouselProps = {
  roles: Role[];
  onSlideChange?: (index: number) => void;
};

export default function VerticalCarousel({ roles, onSlideChange }: VerticalCarouselProps) {
  const slides = useMemo(
    () =>
      roles.reduce<Role[][]>((acc, role, idx) => {
        const slideIndex = Math.floor(idx / 2);
        if (!acc[slideIndex]) acc[slideIndex] = [];
        acc[slideIndex].push(role);
        return acc;
      }, []),
    [roles],
  );

  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const restartAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!slides.length) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % slides.length;
        if (onSlideChange) onSlideChange(next);
        return next;
      });
    }, 5000);
  };

  useEffect(() => {
    restartAuto();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    setCurrent(index);
    if (onSlideChange) onSlideChange(index);
    restartAuto();
  };

  if (!slides.length) return null;

  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-3">
      <div className="relative h-[320px] overflow-hidden">
        {slides.map((slide, slideIndex) => {
          const slideRoles =
            slide.length === 2
              ? slide
              : [...slide, { title: "", subtitle: "", bullet1: "", bullet2: "" }];

          return (
          <div
            key={slideIndex}
            className={`absolute inset-0 flex flex-col gap-4 transition-all duration-700 ease-out ${
              slideIndex === current
                ? "opacity-100 translate-y-0"
                : slideIndex < current
                  ? "pointer-events-none opacity-0 -translate-y-6"
                  : "pointer-events-none opacity-0 translate-y-6"
            }`}
          >
            {slideRoles.map((role) => {
              const isEmpty = !role.title;
              const lowerTitle = role.title.toLowerCase();
              const isGDSC = lowerTitle.includes("google developer student clubs");
              const isMSFT = lowerTitle.includes("microsoft");
              const isNYU =
                lowerTitle.includes("nyu") || lowerTitle.startsWith("new york university");
              return (
                <div
                  key={`${role.title}-${role.subtitle}`}
                  className="glass-card flex min-h-[150px] flex-col justify-start border border-white/10 bg-slate-950/70 p-3 shadow-lg shadow-sky-900/40"
                >
                  {!isEmpty && (
                    <>
                      <div className="flex items-baseline justify-between gap-3">
                        <div>
                          <h3 className={cn("text-sm font-semibold sm:text-base text-slate-50")}>
                            {isGDSC ? (
                              <GdscMulticolorTitle title={role.title} />
                            ) : isMSFT ? (
                              <MsftSplitTitle title={role.title} />
                            ) : isNYU ? (
                              <NyuSplitTitle title={role.title} />
                            ) : (
                              role.title
                            )}
                          </h3>
                        </div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
                          {role.subtitle}
                        </p>
                      </div>
                      <ul className="mt-3 space-y-1.5 text-sm text-slate-300 sm:text-[15px]">
                        <li className="relative pl-4">
                          <span className="absolute left-0 top-2 h-[3px] w-2 rounded-full bg-sky-400" />
                          <span>{role.bullet1}</span>
                        </li>
                        {role.bullet2 && role.bullet2.trim().length > 0 && (
                          <li className="relative pl-4">
                            <span className="absolute left-0 top-2 h-[3px] w-2 rounded-full bg-sky-400" />
                            <span>{role.bullet2}</span>
                          </li>
                        )}
                      </ul>
                    </>
                  )}
              </div>
              );
            })}
          </div>
        );
        })}
      </div>

      <div className="flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleDotClick(index)}
            className={`h-2.5 w-2.5 rounded-full border border-sky-400 transition-all duration-200 ${
              current === index
                ? "bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]"
                : "bg-transparent hover:bg-sky-500/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function GdscMulticolorTitle({ title }: { title: string }) {
  const palette = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];
  const [firstWord, ...rest] = title.split(" ");
  const restText = rest.join(" ");

  return (
    <span>
      {firstWord.split("").map((ch, idx) => {
        const color = palette[idx % palette.length];
        return (
          <span
            key={`g-${idx}`}
            className="gdsc-letter"
            style={{
              "--gdsc-color": color,
              animationDelay: `${idx * 0.08}s`,
            } as CSSProperties}
          >
            {ch}
          </span>
        );
      })}
      {restText && <span className="text-slate-50">{` ${restText}`}</span>}
    </span>
  );
}

function MsftSplitTitle({ title }: { title: string }) {
  const [firstWord, ...rest] = title.split(" ");
  const restText = rest.join(" ");

  return (
    <span>
      {firstWord.split("").map((ch, idx) => {
        const msftPalette = ["#00A4EF", "#7FBA00", "#FFB900", "#F25022"];
        const color = msftPalette[idx % msftPalette.length];
        return (
          <span
            key={`m-${idx}`}
            className="gdsc-letter"
            style={{
              "--gdsc-color": color,
              animationDelay: `${idx * 0.08}s`,
            } as CSSProperties}
          >
            {ch}
          </span>
        );
      })}
      {restText && <span className="text-slate-50">{` ${restText}`}</span>}
    </span>
  );
}

function NyuSplitTitle({ title }: { title: string }) {
  const lower = title.toLowerCase();

  let coloredSegment = "";
  let remainder = "";

  if (lower.startsWith("nyu")) {
    coloredSegment = title.slice(0, 3);
    remainder = title.slice(3).trimStart();
  } else if (lower.startsWith("new york university")) {
    const prefix = "New York University";
    coloredSegment = prefix;
    remainder = title.slice(prefix.length).trimStart();
  } else {
    const [firstWord, ...rest] = title.split(" ");
    coloredSegment = firstWord;
    remainder = rest.join(" ");
  }

  return (
    <span>
      {coloredSegment.split("").map((ch, idx) => {
        const nyuPalette = ["#57068c", "#7c3aed", "#a855f7", "#c4b5fd"];
        const color = nyuPalette[idx % nyuPalette.length];
        return (
          <span
            key={`n-${idx}`}
            className="gdsc-letter"
            style={{
              "--gdsc-color": color,
              animationDelay: `${idx * 0.08}s`,
            } as CSSProperties}
          >
            {ch}
          </span>
        );
      })}
      {remainder && <span className="text-slate-50">{` ${remainder}`}</span>}
    </span>
  );
}

