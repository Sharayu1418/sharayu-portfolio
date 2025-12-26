"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

// NOTE: Update these URLs to your real profiles when ready.
const SOCIALS = [
  {
    href: "https://github.com/Sharayu1418",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/sharayu-rasal-70a030213/",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

export function SocialLinks({ className }: Props) {
  return (
    <div className={cn("flex items-center gap-2 text-slate-300", className)}>
      {SOCIALS.map((social) => {
        const Icon = social.icon;
        return (
          <Link
            key={social.label}
            href={social.href}
            aria-label={social.label}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel={social.href.startsWith("http") ? "noreferrer" : undefined}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 shadow-sm backdrop-blur-md transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Icon className="h-4 w-4" />
          </Link>
        );
      })}
    </div>
  );
}
