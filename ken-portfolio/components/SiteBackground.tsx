"use client";

import { motion, useReducedMotion } from "motion/react";

export default function SiteBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        overflow-hidden
        bg-[#030712]
      "
    >
      {/* =====================================================
          BASE BACKGROUND
      ===================================================== */}

      <div
        className="
          absolute
          inset-0

          bg-[linear-gradient(180deg,#030712_0%,#06101d_45%,#030712_100%)]
        "
      />

      {/* =====================================================
          LARGE TOP-RIGHT BLUE AURORA
      ===================================================== */}

      <motion.div
        className="
          absolute
          -right-[12%]
          -top-[18%]

          h-[900px]
          w-[900px]

          rounded-full

          bg-blue-500/[0.20]

          blur-[170px]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -60, -15, 0],
                y: [0, 35, -15, 0],
                scale: [1, 1.08, 1.02, 1],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          LEFT CYAN AURORA
      ===================================================== */}

      <motion.div
        className="
          absolute
          -left-[18%]
          top-[25%]

          h-[850px]
          w-[850px]

          rounded-full

          bg-cyan-400/[0.12]

          blur-[180px]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 70, 20, 0],
                y: [0, -40, 25, 0],
                scale: [1, 1.05, 0.98, 1],
              }
        }
        transition={{
          duration: 27,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          CENTER BLUE LIGHT
      ===================================================== */}

      <motion.div
        className="
          absolute
          left-[38%]
          top-[35%]

          h-[700px]
          w-[700px]

          rounded-full

          bg-sky-500/[0.08]

          blur-[190px]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 35, -35, 0],
                y: [0, 30, -20, 0],
              }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          BOTTOM-RIGHT VIOLET
      ===================================================== */}

      <motion.div
        className="
          absolute
          -bottom-[25%]
          right-[-10%]

          h-[850px]
          w-[850px]

          rounded-full

          bg-violet-600/[0.09]

          blur-[190px]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -40, 10, 0],
                y: [0, -30, 15, 0],
                scale: [1, 1.04, 1, 1],
              }
        }
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          BOTTOM CYAN
      ===================================================== */}

      <motion.div
        className="
          absolute
          -bottom-[30%]
          -left-[12%]

          h-[850px]
          w-[850px]

          rounded-full

          bg-cyan-500/[0.08]

          blur-[190px]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 40, -15, 0],
                y: [0, -20, 20, 0],
              }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          CENTRAL AURORA MESH
      ===================================================== */}

      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(ellipse_at_20%_20%,rgba(34,211,238,0.09),transparent_35%),radial-gradient(ellipse_at_75%_25%,rgba(59,130,246,0.14),transparent_40%),radial-gradient(ellipse_at_55%_70%,rgba(99,102,241,0.07),transparent_40%)]
        "
      />

      {/* =====================================================
          GRID
      ===================================================== */}

      <div
        className="
          absolute
          inset-0

          opacity-[0.17]

          [background-image:linear-gradient(rgba(96,165,250,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.07)_1px,transparent_1px)]

          [background-size:72px_72px]

          [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_78%)]
        "
      />

      {/* =====================================================
          CENTER LIGHT
      ===================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-[20%]

          h-[700px]
          w-[1200px]

          -translate-x-1/2

          bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.07),transparent_65%)]
        "
      />

      {/* =====================================================
          EDGE VIGNETTE
      ===================================================== */}

      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(2,6,18,0.48)_100%)]
        "
      />

      {/* =====================================================
          NOISE
      ===================================================== */}

      <div className="portfolio-noise absolute inset-0 opacity-[0.025]" />
    </div>
  );
}