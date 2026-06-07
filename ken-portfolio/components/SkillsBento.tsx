"use client";

import {
  Code2,
  Database,
  Layers,
  Server,
  Sparkles,
  Terminal,
  Wrench,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionHeader from "./SectionHeader";
import { skills } from "@/data/skills";

const iconMap = {
  Frontend: Code2,
  "UI Design": Layers,
  Backend: Server,
  Tools: Wrench,
};

const terminalTextColor = [
  "text-green-300",
  "text-blue-300",
  "text-purple-300",
  "text-cyan-300",
  "text-orange-300",
];

export default function SkillsBento() {
  const { scrollYProgress } = useScroll();

  const sectionY = useTransform(scrollYProgress, [0.45, 0.85], [90, -50]);
  const sectionOpacity = useTransform(scrollYProgress, [0.4, 0.52], [0.25, 1]);

  return (
    <section id="skills" className="relative overflow-hidden px-6 py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-40 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-10 top-72 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <motion.div
        style={{
          y: sectionY,
          opacity: sectionOpacity,
        }}
        className="mx-auto max-w-6xl"
      >
        <SectionHeader
          eyebrow="Skills"
          title="My development terminal"
          description="A command-center style breakdown of the technologies, tools, and workflows I use to build full-stack web applications."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Terminal Overview */}
          <motion.div
            initial={{
              opacity: 0,
              y: 90,
              scale: 0.94,
              rotateX: 14,
              clipPath: "inset(16% 0 16% 0 round 2rem)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              clipPath: "inset(0% 0 0% 0 round 2rem)",
            }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            whileHover={{
              y: -10,
              rotateX: 2,
              rotateY: -2,
              borderColor: "rgba(147,197,253,0.4)",
            }}
            className="group relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl lg:col-span-12"
          >
            <div className="absolute inset-0 opacity-30">
              <div className="skills-terminal-grid absolute inset-0" />
            </div>

            <div className="terminal-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-300/10 to-transparent opacity-0 transition group-hover:opacity-100" />

            <div className="relative z-10">
              <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>

                  <span className="hidden text-sm text-slate-500 sm:inline">
                    ken@portfolio: ~/skills
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-green-300/20 bg-green-400/10 px-3 py-1 text-xs font-medium text-green-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  running
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <motion.p
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="font-mono text-sm text-slate-500"
                  >
                    $ run fullstack-profile --mode=production
                  </motion.p>

                  <motion.h3
                    initial={{ opacity: 0, y: 34, rotateX: -45 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                    className="mt-6 max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl"
                  >
                    Frontend, backend, database, and deployment working as one.
                  </motion.h3>

                  <motion.p
                    initial={{
                      opacity: 0,
                      clipPath: "inset(0 100% 0 0)",
                    }}
                    whileInView={{
                      opacity: 1,
                      clipPath: "inset(0 0% 0 0)",
                    }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                    className="mt-6 max-w-xl text-base leading-8 text-slate-400"
                  >
                    I use my stack to create complete systems: polished
                    interfaces, connected APIs, organized databases, and
                    practical project workflows.
                  </motion.p>
                </div>

                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.35 }}
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.12,
                        delayChildren: 0.55,
                      },
                    },
                  }}
                  className="grid gap-3 sm:grid-cols-2"
                >
                 {[
                  ["frontend", "ready"],
                  ["backend", "connected"],
                  ["database", "synced"],
                  ["deployment", "prepared"],
                ].map(([label, status], index) => (
                  <motion.div
                    key={label}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 20,
                        scale: 0.92,
                        rotate: -2,
                      },
                      show: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotate: 0,
                        transition: { duration: 0.55, ease: "easeOut" },
                      },
                    }}
                    whileHover={{
                      y: -6,
                      scale: 1.03,
                      backgroundColor: "rgba(255,255,255,0.08)",
                    }}
                    className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 font-mono"
                  >
                    <p className="text-sm text-slate-500">module.{label}</p>
                    <p
                      className={`mt-3 text-base font-bold sm:text-lg ${
                        terminalTextColor[index]
                      }`}
                    >
                      status: {status}
                    </p>
                  </motion.div>
                ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Skill Terminal Cards */}
          {skills.map((skill, index) => {
            const Icon =
              iconMap[skill.title as keyof typeof iconMap] || Database;

            return (
              <motion.div
                key={skill.title}
                initial={{
                  opacity: 0,
                  y: 80,
                  rotateX: 22,
                  rotateZ: index % 2 === 0 ? -2 : 2,
                  scale: 0.9,
                  clipPath: "inset(20% 0 20% 0 round 2rem)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  rotateZ: 0,
                  scale: 1,
                  clipPath: "inset(0% 0 0% 0 round 2rem)",
                }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{
                  duration: 0.85,
                  delay: 0.08 + index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -10,
                  rotateX: 3,
                  rotateY: index % 2 === 0 ? 3 : -3,
                  borderColor: "rgba(147,197,253,0.35)",
                }}
                className="group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl lg:col-span-6"
              >
                <div className="absolute inset-0 opacity-25">
                  <div className="skills-terminal-grid absolute inset-0" />
                </div>

                <div className="terminal-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-300/10 to-transparent opacity-0 transition group-hover:opacity-100" />

                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
                  <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-400/10 blur-3xl" />
                </div>

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-400" />
                      <span className="h-3 w-3 rounded-full bg-yellow-400" />
                      <span className="h-3 w-3 rounded-full bg-green-400" />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 0.6,
                        delay: 0.25 + index * 0.08,
                        ease: "easeOut",
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]"
                    >
                      <Icon className="h-5 w-5 text-blue-300" />
                    </motion.div>
                  </div>

                  <div className="font-mono">
                    <motion.p
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 0.55,
                        delay: 0.2 + index * 0.08,
                      }}
                      className="text-sm text-slate-500"
                    >
                      $ load-module {skill.title.toLowerCase().replaceAll(" ", "-")} --skills
                    </motion.p>

                    <motion.h3
                      initial={{ opacity: 0, y: 24, rotateX: -45 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 0.75,
                        delay: 0.3 + index * 0.08,
                        ease: "easeOut",
                      }}
                      className="mt-5 origin-bottom text-3xl font-black tracking-tight text-white"
                    >
                      {skill.title}
                    </motion.h3>

                    <motion.p
                      initial={{
                        opacity: 0,
                        clipPath: "inset(0 100% 0 0)",
                      }}
                      whileInView={{
                        opacity: 1,
                        clipPath: "inset(0 0% 0 0)",
                      }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 0.85,
                        delay: 0.4 + index * 0.08,
                        ease: "easeOut",
                      }}
                      className="mt-4 max-w-xl text-sm leading-7 text-slate-400"
                    >
                      {skill.description}
                    </motion.p>
                  </div>

                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.4 }}
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.06,
                          delayChildren: 0.5 + index * 0.08,
                        },
                      },
                    }}
                    className="mt-auto flex flex-wrap gap-2 pt-8"
                  >
                    {skill.items.map((item, itemIndex) => (
                      <motion.span
                        key={item}
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: 18,
                            x: -8,
                            rotate: -5,
                            scale: 0.88,
                          },
                          show: {
                            opacity: 1,
                            y: 0,
                            x: 0,
                            rotate: 0,
                            scale: 1,
                            transition: {
                              duration: 0.45,
                              ease: "easeOut",
                            },
                          },
                        }}
                        whileHover={{
                          y: -5,
                          scale: 1.08,
                          backgroundColor: "rgba(59, 130, 246, 0.16)",
                          borderColor: "rgba(125, 211, 252, 0.55)",
                          boxShadow: "0 0 24px rgba(56, 189, 248, 0.16)",
                        }}
                        className={`relative overflow-hidden rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3.5 py-1.5 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur ${
                          terminalTextColor[itemIndex % terminalTextColor.length]
                        }`}
                      >
                        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                        <span className="relative z-10">{item}</span>
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}