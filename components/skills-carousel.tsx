"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

type Badge = {
  title: string;
  href: string;
  img: string;
};

const PROFILE_URL = "https://www.skills.google/public_profiles/8fef00cc-7281-46ba-a7e7-2e6b360a273d";

// All downloaded Google Cloud Skills Boost badges
const BADGES: Badge[] = [
  // Featured trio – will always appear first
  {
    title: "Google Developer Essentials",
    href: `${PROFILE_URL}/badges/1008966`,
    img: "/badges/google-developer-essentials.png",
  },
  {
    title: "Cloud Architecture",
    href: `${PROFILE_URL}/badges/1008893`,
    img: "/badges/cloud-architecture.png",
  },
  {
    title: "Create ML Models with BigQuery ML",
    href: `${PROFILE_URL}/badges/1008897`,
    img: "/badges/create-ml-models-bigquery-ml.png",
  },
  // Other known badge IDs
  {
    title: "Cloud Engineering",
    href: `${PROFILE_URL}/badges/1057906`,
    img: "/badges/cloud-engineering.png",
  },
  {
    title: "Baseline Infrastructure",
    href: `${PROFILE_URL}/badges/944313`,
    img: "/badges/infrastructure.png",
  },
  // Remaining badges – all link to profile root
  {
    title: "BigQuery Basics for Data Analysts",
    href: PROFILE_URL,
    img: "/badges/BigQuery Basics for Data Analysts.png",
  },
  {
    title: "BigQuery for Machine Learning",
    href: PROFILE_URL,
    img: "/badges/BigQuery for Machine Learning.png",
  },
  {
    title: "Build a Website on Google Cloud",
    href: PROFILE_URL,
    img: "/badges/Build a Website on Google Cloud.png",
  },
  {
    title: "Build and Secure Networks in Google Cloud",
    href: PROFILE_URL,
    img: "/badges/Build and Secure Networks in Google Cloud.png",
  },
  {
    title: "Cloud Development",
    href: PROFILE_URL,
    img: "/badges/Cloud Development.png",
  },
  {
    title: "Create and Manage Cloud Resources",
    href: PROFILE_URL,
    img: "/badges/Create and Manage Cloud Resources.png",
  },
  {
    title: "DevOps Essentials",
    href: PROFILE_URL,
    img: "/badges/DevOps Essentials.png",
  },
  {
    title: "Ensure Access & Identity in Google Cloud",
    href: PROFILE_URL,
    img: "/badges/Ensure Access & Identity in Google Cloud.png",
  },
  {
    title: "Exploring APIs",
    href: PROFILE_URL,
    img: "/badges/Exploring APIs.png",
  },
  {
    title: "Google Cloud Essentials",
    href: PROFILE_URL,
    img: "/badges/Google Cloud Essentials.png",
  },
  {
    title: "Google Cloud Solutions I - Scaling Your Infrastructure",
    href: PROFILE_URL,
    img: "/badges/Google Cloud Solutions I - Scaling Your Infrastructure.png",
  },
  {
    title: "Insights from Data with BigQuery",
    href: PROFILE_URL,
    img: "/badges/Insights from Data with BigQuery.png",
  },
  {
    title: "Integrate with Machine Learning APIs",
    href: PROFILE_URL,
    img: "/badges/Integrate with Machine Learning APIs.png",
  },
  {
    title: "Intro to ML Language Processing",
    href: PROFILE_URL,
    img: "/badges/Intro to ML Language Processing.png",
  },
  {
    title: "Kubernetes in Google Cloud",
    href: PROFILE_URL,
    img: "/badges/Kubernetes in Google Cloud.png",
  },
  {
    title: "Machine Learning APIs",
    href: PROFILE_URL,
    img: "/badges/Machine Learning APIs.png",
  },
  {
    title: "NCAA March Madness - Bracketology with Google Cloud",
    href: PROFILE_URL,
    img: "/badges/NCAA March Madness - Bracketology with Google Cloud.png",
  },
  {
    title: "Networking Fundamentals in Google Cloud",
    href: PROFILE_URL,
    img: "/badges/Networking Fundamentals in Google Cloud.png",
  },
  {
    title: "Perform Foundational Infrastructure Tasks in Google Cloud",
    href: PROFILE_URL,
    img: "/badges/Perform Foundational Infrastructure Tasks in Google Cloud.png",
  },
  {
    title: "Security & Identity Fundamentals",
    href: PROFILE_URL,
    img: "/badges/Security & Identity Fundamentals.png",
  },
  {
    title: "Set Up and Configure a Cloud Environment in Google Cloud",
    href: PROFILE_URL,
    img: "/badges/Set Up and Configure a Cloud Environment in Google Cloud.png",
  },
  {
    title: "Understand Your Google Cloud Costs",
    href: PROFILE_URL,
    img: "/badges/Understand Your Google Cloud Costs.png",
  },
  {
    title: "Website on Google Cloud",
    href: PROFILE_URL,
    img: "/badges/Website on Google Cloud.png",
  },
  {
    title: "Workspace - Add-ons",
    href: PROFILE_URL,
    img: "/badges/Workspace - Add-ons.png",
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    href: PROFILE_URL,
    img: "/badges/AWS Cloud Practitioner Essentials.png",
  },
];

const FEATURED_BADGES = [
  "AWS Cloud Practitioner Essentials",
  "Cloud Architecture",
  "Google Developer Essentials",
];

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function SkillsCarousel() {
  const [badges, setBadges] = useState<Badge[]>(BADGES);
  const initialIndex = 0;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    // Show two badges at a time and advance two per scroll
    slidesToScroll: 2,
  });

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    const featured = FEATURED_BADGES.map((title) => BADGES.find((badge) => badge.title === title)).filter(
      (badge): badge is Badge => Boolean(badge),
    );
    const featuredSet = new Set(featured.map((badge) => badge.title));
    const remaining = BADGES.filter((badge) => !featuredSet.has(badge.title));
    const orderedBadges = [...featured, ...shuffleArray(remaining)];
    setBadges(orderedBadges);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.scrollTo(initialIndex, true);
    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [badges, emblaApi, initialIndex, onSelect]);

  // Auto‑advance the carousel every ~3.5 seconds while preserving manual controls
  useEffect(() => {
    if (!emblaApi) return;

    const id = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 3500);

    return () => {
      window.clearInterval(id);
    };
  }, [emblaApi]);

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md sm:p-7">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-slate-50 sm:text-lg">Verified Skills</h3>
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
          {scrollSnaps.length > 0 ? `${(selectedIndex % scrollSnaps.length) + 1} / ${scrollSnaps.length}` : "1 / 1"}
        </span>
      </div>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-5">
            {badges.map((badge) => (
              <div key={badge.title} className="flex-[0_0_50%] px-1">
                <Link
                  href={badge.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-xl border border-white/20 bg-white/10 p-3 shadow-md backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:bg-white/20 hover:shadow-2xl"
                >
                  <div className="flex flex-1 items-center justify-center">
                    <Image
                      src={badge.img}
                      alt={badge.title}
                      width={220}
                      height={220}
                      className="max-h-52 w-auto object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100 sm:max-h-64"
                    />
                  </div>
                  <p className="mt-3 line-clamp-2 text-center text-[11px] font-medium text-slate-100 sm:text-xs">
                    {badge.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-slate-200 transition hover:bg-white/15"
          >
            ← Prev
          </button>
          <motion.button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            whileTap={{ scale: 0.96 }}
            className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-slate-200 transition hover:bg-white/15"
          >
            Next →
          </motion.button>
        </div>
      </div>
    </div>
  );
}


