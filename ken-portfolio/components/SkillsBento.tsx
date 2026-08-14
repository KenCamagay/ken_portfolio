"use client";

import {
  Code2,
  Database,
  Smartphone,
  Layers,
  Wrench,
  Server,
} from "lucide-react";
import { motion } from "motion/react";
import SectionHeader from "./SectionHeader";
import { skills } from "@/data/skills";

const iconMap = {
  "Web Development": Code2,
  "Backend & Database": Server,
  "Mobile Development": Smartphone,
  "UI / UX": Layers,
  "Tools & Workflow": Wrench,
};

export default function SkillsBento() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden px-6 py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-40 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute bottom-20 left-10 h-72 w-72 rounded-full bg-cyan-400/5 blur-3xl" />

        <div className="absolute right-10 top-72 h-72 w-72 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Skills"
          title="Technologies I work with"
          description="A practical overview of the technologies and tools I use to build web, mobile, and full-stack applications."
        />

        {/* Skills Grid */}
        <div className="flex flex-col gap-5">
          {skills.map((skill, index) => {
            const Icon =
              iconMap[skill.title as keyof typeof iconMap] || Database;

            return (
              <motion.article
                key={skill.title}
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.06, 0.2),
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -4,
                }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/75 p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-7"
              >
                {/* Subtle hover glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-blue-400/5 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                        <Icon className="h-5 w-5 text-blue-300" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {skill.title}
                        </h3>

                        <p className="mt-1 font-mono text-xs text-slate-600">
                          {String(index + 1).padStart(2, "0")} /{" "}
                          {skills.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-400">
                    {skill.description}
                  </p>

                  {/* Skills */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors duration-200 hover:border-blue-300/30 hover:bg-blue-400/[0.06] hover:text-blue-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}