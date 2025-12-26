"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type TrailItem = {
  id: number;
  x: number;
  y: number;
  size: number;
};

const MAX_TRAIL_ITEMS = 24;
const TRAIL_LIFETIME_MS = 650;
const MIN_SIZE = 18;
const MAX_SIZE = 34;
const THROTTLE_MS = 28;

export function CloudCursorTrail() {
  const [items, setItems] = useState<TrailItem[]>([]);
  const lastTimeRef = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersCoarse =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches;
    const isSmallViewport = window.innerWidth < 768;

    // Disable on small screens or coarse pointers (touch devices)
    if (prefersCoarse || isSmallViewport) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      const now = performance.now();
      if (now - lastTimeRef.current < THROTTLE_MS) return;
      lastTimeRef.current = now;

      const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
      const id = idRef.current++;

      const x = event.clientX;
      const y = event.clientY;

      setItems((prev) => {
        const next: TrailItem[] = [...prev, { id, x, y, size }];
        if (next.length > MAX_TRAIL_ITEMS) {
          return next.slice(next.length - MAX_TRAIL_ITEMS);
        }
        return next;
      });

      // Schedule removal after lifetime
      window.setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }, TRAIL_LIFETIME_MS + 50);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      {items.map((item) => (
        <motion.svg
          key={item.id}
          initial={{ opacity: 0.8, scale: 1.05, y: 0 }}
          animate={{ opacity: 0, scale: 0.85, y: -6 }}
          transition={{ duration: TRAIL_LIFETIME_MS / 1000, ease: "easeOut" }}
          viewBox="0 0 64 40"
          className="absolute drop-shadow-[0_0_30px_rgba(148,163,184,0.55)]"
          style={{
            width: item.size * 1.6,
            height: item.size,
            left: item.x,
            top: item.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Simple cloud silhouette, inspired by AWS-style cloud */}
          <path
            d="M10 30h32c7 0 12-4 12-10 0-5-4-9-9-10C42 5 36 2 29 2 20 2 13 7 12 15 7 16 4 19 4 24c0 4 3 6 6 6z"
            fill="rgba(226,232,240,0.18)"
            stroke="rgba(148,163,184,0.7)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      ))}
    </div>
  );
}


