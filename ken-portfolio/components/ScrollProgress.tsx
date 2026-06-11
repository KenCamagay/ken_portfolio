"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue } from "motion/react";

const sections = [
  {
    id: "hero",
    label: "Hero",
    number: "01",
    x: 36,
    y: 28,
    pathProgress: 0,
  },
  {
    id: "projects",
    label: "Projects",
    number: "02",
    x: 30,
    y: 112,
    pathProgress: 0.33,
  },
  {
    id: "skills",
    label: "Skills",
    number: "03",
    x: 48,
    y: 196,
    pathProgress: 0.66,
  },
  {
    id: "contact",
    label: "Contact",
    number: "04",
    x: 36,
    y: 280,
    pathProgress: 1,
  },
];

const path =
  "M36 28 C36 60 30 78 30 112 C30 148 48 160 48 196 C48 232 36 246 36 280";

export default function ScrollProgress() {
  const [activeSection, setActiveSection] = useState("hero");
  const pathLength = useMotionValue(0);

  useEffect(() => {
    function updateActiveSection() {
      const scrollPosition = window.scrollY + window.innerHeight * 0.42;

      let currentSection = sections[0];

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;

        if (scrollPosition >= element.offsetTop) {
          currentSection = section;
        }
      }

      setActiveSection(currentSection.id);

      animate(pathLength, currentSection.pathProgress, {
        duration: 0.55,
        ease: "easeOut",
      });
    }

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathLength]);

  return (
    <div className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 xl:block">
      <div className="relative h-[340px] w-[68px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/35 shadow-2xl shadow-black/30 backdrop-blur-xl">
        {/* soft inner glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-300/10 via-violet-300/5 to-emerald-300/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(103,232,249,0.22),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(110,231,183,0.16),transparent_34%)]" />
        <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_0_30px_rgba(15,23,42,0.75)]" />

        {/* decorative scan line */}
        <motion.div
          animate={{
            y: [-80, 340],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-0 top-0 h-20 w-full bg-gradient-to-b from-transparent via-cyan-300/10 to-transparent"
        />

        <svg
          viewBox="0 0 68 308"
          className="absolute left-1/2 top-1/2 h-[308px] w-[68px] -translate-x-1/2 -translate-y-1/2 overflow-visible"
          fill="none"
        >
          {/* outer glow path */}
          <path
            d={path}
            stroke="rgba(103,232,249,0.08)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* base path */}
          <path
            d={path}
            stroke="rgba(255,255,255,0.13)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* animated progress glow */}
          <motion.path
            d={path}
            stroke="url(#routeGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength }}
          />

          {/* bright center line */}
          <motion.path
            d={path}
            stroke="rgba(255,255,255,0.65)"
            strokeWidth="1"
            strokeLinecap="round"
            style={{ pathLength }}
          />

          <defs>
            <linearGradient
              id="routeGradient"
              x1="36"
              y1="28"
              x2="36"
              y2="280"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#67e8f9" />
              <stop offset="0.5" stopColor="#c084fc" />
              <stop offset="1" stopColor="#6ee7b7" />
            </linearGradient>
          </defs>
        </svg>

        {sections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-label={`Go to ${section.label}`}
              className="group absolute z-10"
              style={{
                left: `${section.x}px`,
                top: `${section.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* active aura behind bubble */}
              {isActive && (
                <motion.span
                  layoutId="active-progress-aura"
                  className="absolute -inset-4 rounded-full bg-cyan-300/15 blur-md"
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 24,
                  }}
                />
              )}

              <motion.span
                animate={{
                  scale: isActive ? 1.12 : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className={`relative flex h-10 w-10 items-center justify-center rounded-full border font-mono text-[11px] font-bold transition ${
                  isActive
                    ? "border-cyan-300/80 bg-cyan-300/20 text-cyan-50 shadow-[0_0_24px_rgba(103,232,249,0.55)]"
                    : "border-white/10 bg-slate-950/95 text-slate-500 shadow-lg shadow-black/30 group-hover:border-cyan-300/50 group-hover:text-cyan-300"
                }`}
              >
                {/* small inner dot */}
                <span
                  className={`absolute bottom-1.5 h-1 w-1 rounded-full ${
                    isActive ? "bg-cyan-200" : "bg-slate-600"
                  }`}
                />

                {isActive && (
                  <motion.span
                    animate={{
                      scale: [1, 1.45, 1],
                      opacity: [0.45, 0, 0.45],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full border border-cyan-300/70"
                  />
                )}

                <span className="relative z-10 -translate-y-0.5">
                  {section.number}
                </span>
              </motion.span>

              <span className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-slate-950/90 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl shadow-black/30 backdrop-blur transition group-hover:translate-x-1 group-hover:opacity-100">
                {section.label}
              </span>
            </a>
          );
        })}

        {/* start/end pins */}
        <div className="absolute left-1/2 top-3 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
        <div className="absolute bottom-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.9)]" />
      </div>
    </div>
  );
}