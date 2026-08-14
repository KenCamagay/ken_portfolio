"use client";

import { ArrowDown, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "motion/react";

const technologies = [
  "React",
  "Next.js",
  "Node.js",
  "Laravel",
  "React Native",
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-grid absolute inset-0 opacity-20" />

        {/* Static glows — much lighter than the previous animated blobs */}
        <div className="absolute left-[-12rem] top-20 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="absolute right-[-10rem] top-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="absolute bottom-[-12rem] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="origin-left"
        >
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 shadow-lg shadow-blue-950/20 backdrop-blur"
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-blue-400" />
            Full-Stack Developer
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Ken{" "}
            <span className="animated-gradient-text">
              Camagay
            </span>
          </motion.h1>

          {/* Role */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="mt-4 text-2xl font-semibold text-slate-200 sm:text-3xl"
          >
            Full-Stack Developer
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
          >
            I build modern web and mobile applications that turn ideas into
            practical digital solutions.
          </motion.p>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-7 flex flex-wrap gap-2.5"
          >
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-sm text-slate-300 backdrop-blur"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-blue-500/20"
            >
              View Projects
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur"
            >
              Contact Me
              <Mail className="ml-2 h-4 w-4" />
            </motion.a>
          </motion.div>

          {/* GitHub */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-7 flex items-center gap-4 text-sm text-slate-400"
          >
            <a
              href="https://github.com/KenCamagay"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </a>

            <span className="h-1 w-1 rounded-full bg-slate-600" />

            <span>Web · Mobile · Full-Stack</span>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          {/* Static decorative rings */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/10" />

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/10" />

          {/* Main card */}
          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/90 p-6">
              {/* Window header */}
              <div className="mb-7 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <span className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-medium text-green-300">
                  available
                </span>
              </div>

              {/* Code */}
              <div className="space-y-5 font-mono text-sm leading-6">
                <p className="text-slate-500">
                  // developer.profile.ts
                </p>

                <p>
                  <span className="text-purple-300">const</span>{" "}
                  <span className="text-blue-300">developer</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-green-300">
                    "Ken Camagay"
                  </span>
                </p>

                <p>
                  <span className="text-purple-300">const</span>{" "}
                  <span className="text-blue-300">role</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-green-300">
                    "Full-Stack Developer"
                  </span>
                </p>

                <p>
                  <span className="text-purple-300">const</span>{" "}
                  <span className="text-blue-300">stack</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-orange-300">
                    ["React", "Next.js", "Node.js"]
                  </span>
                </p>

                <p>
                  <span className="text-purple-300">const</span>{" "}
                  <span className="text-blue-300">focus</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-orange-300">
                    ["Web", "Mobile", "UI"]
                  </span>
                </p>

                <p>
                  <span className="text-purple-300">const</span>{" "}
                  <span className="text-blue-300">mission</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-green-300">
                    "Build useful software"
                  </span>
                </p>
              </div>

              {/* Small capability cards */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:bg-white/[0.07]">
                  <p className="text-sm font-semibold text-white">
                    Frontend
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    React / Next
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:bg-white/[0.07]">
                  <p className="text-sm font-semibold text-white">
                    Backend
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    APIs / Systems
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:bg-white/[0.07]">
                  <p className="text-sm font-semibold text-white">
                    Mobile
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    React Native
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-slate-500 transition-colors hover:text-slate-300 sm:flex"
      >
        <span>Scroll to explore</span>
        <ArrowDown className="h-3.5 w-3.5" />
      </motion.a>
    </section>
  );
}