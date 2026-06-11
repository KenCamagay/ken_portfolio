"use client";

import { motion, useScroll, useTransform } from "motion/react";

export default function SiteBackground() {
  const { scrollYProgress } = useScroll();

  const auroraY = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const auroraRotate = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-[#020617]">
      <motion.div
        style={{
          y: gridY,
        }}
        className="absolute inset-0 opacity-[0.18] site-grid"
      />

      <motion.div
        style={{
          y: auroraY,
          rotate: auroraRotate,
        }}
        className="absolute -left-40 top-[-10rem] h-[36rem] w-[36rem] rounded-full bg-cyan-400/20 blur-[120px]"
      />

      <motion.div
        style={{
          y: auroraY,
          rotate: auroraRotate,
        }}
        className="absolute right-[-12rem] top-40 h-[38rem] w-[38rem] rounded-full bg-violet-500/20 blur-[130px]"
      />

      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [100, -180]),
        }}
        className="absolute bottom-[-14rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[120px]"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.25)_45%,rgba(2,6,23,0.9)_100%)]" />

      <div className="absolute inset-0 opacity-[0.035] noise-bg" />
    </div>
  );
}