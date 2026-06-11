"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const bootLines = [
  "$ initializing portfolio interface...",
  "$ loading web.projects",
  "$ loading mobile.stack",
  "$ loading ui.systems",
  "$ status: ready",
];

export default function IntroLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -24,
          }}
          transition={{
            duration: 0.85,
            ease: "easeOut",
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#020617]"
        >
          <div className="absolute inset-0 opacity-25">
            <div className="hero-grid absolute inset-0" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0.22] }}
            transition={{
              duration: 2.4,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[120px]"
          />

          <motion.div
            initial={{
              opacity: 0,
              y: 28,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="relative z-10 w-[min(36rem,90vw)] overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/85 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            {/* terminal header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <span className="hidden font-mono text-xs text-slate-500 sm:inline">
                  ken@portfolio: ~/boot
                </span>
              </div>

              <motion.span
                animate={{
                  opacity: [0.45, 1, 0.45],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="font-mono text-xs text-green-300"
              >
                online
              </motion.span>
            </div>

            {/* terminal body */}
            <div className="relative overflow-hidden px-6 py-7 font-mono">
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: ["-100%", "120%"] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-cyan-300/5 to-transparent"
              />

              <div className="space-y-3">
                {bootLines.map((line, index) => (
                  <motion.p
                    key={line}
                    initial={{
                      opacity: 0,
                      x: -14,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.38,
                      delay: 0.25 + index * 0.24,
                      ease: "easeOut",
                    }}
                    className="text-sm text-slate-400"
                  >
                    <span className="text-cyan-300">{line.slice(0, 1)}</span>
                    <span>{line.slice(1)}</span>
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 1.55,
                  ease: "easeOut",
                }}
                className="mt-7 rounded-2xl border border-white/10 bg-black/25 p-5"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  interface loaded
                </p>

                <div className="mt-3 flex items-end justify-between gap-4">
                  <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                    KEN<span className="text-cyan-300">.</span>
                    <span className="text-slate-300">DEV</span>
                  </h1>

                  <motion.span
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="mb-2 h-7 w-2 bg-cyan-300"
                  />
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Web development • Mobile development • UI systems
                </p>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: 1.9,
                  ease: "easeOut",
                }}
                className="mt-6"
              >
                <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-slate-600">
                  <span>booting</span>
                  <span>100%</span>
                </div>

                <div className="h-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 1.25,
                      delay: 0.65,
                      ease: "easeInOut",
                    }}
                    className="h-full bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}