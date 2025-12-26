"use client";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function ParticleBackground({ className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 -z-20 overflow-hidden",
        className,
      )}
    >
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(15,23,42,0.4),_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(15,23,42,0.98),_#020617)]" />

      {/* Aurora effect - flowing gradients */}
      <div className="aurora-container absolute inset-0">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
      </div>

      {/* Subtle mesh grid overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="mesh-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(148,163,184,0.4)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mesh-grid)" />
      </svg>

      {/* Soft horizontal bands for depth */}
      <div className="absolute inset-x-0 top-1/4 h-64 bg-gradient-to-b from-transparent via-sky-500/[0.03] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />

      {/* Noise texture overlay for organic feel */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
}
