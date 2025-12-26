"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatches by only reading resolved theme on the client.
  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-slate-100 shadow-sm backdrop-blur-md transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {/* While mounting, render a neutral icon state so server & client HTML match */}
      {!mounted ? (
        <Sun className="h-4 w-4 transition" />
      ) : (
        <>
          <Sun
            className={cn(
              "h-4 w-4 transition",
              isDark && "scale-0 opacity-0",
            )}
          />
          <Moon
            className={cn(
              "absolute h-4 w-4 transition",
              !isDark && "scale-0 opacity-0",
            )}
          />
        </>
      )}
    </button>
  );
}

