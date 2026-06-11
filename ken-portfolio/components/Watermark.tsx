"use client";

import { motion } from "motion/react";

export default function Watermark() {
  return (
    <motion.a
      href="#hero"
      initial={{
        opacity: 0,
        y: -14,
        filter: "blur(8px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.7,
        delay: 4.3,
        ease: "easeOut",
      }}
      whileHover={{
        opacity: 1,
        y: -2,
      }}
      className="fixed left-6 top-5 z-50 hidden font-mono text-sm font-semibold tracking-[0.18em] text-white/80 transition hover:text-white sm:block"
    >
      <span className="text-white">KEN</span>
      <span className="text-cyan-300">.</span>
      <span className="text-slate-400">DEV</span>

      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.75,
          delay: 2.55,
          ease: "easeOut",
        }}
        className="mt-1 block h-px origin-left bg-gradient-to-r from-cyan-300 via-violet-300 to-transparent"
      />
    </motion.a>
  );
}