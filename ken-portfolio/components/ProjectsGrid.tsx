"use client";

import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "motion/react";
import SectionHeader from "./SectionHeader";
import { projects } from "@/data/projects";
import ProjectPreview from "./ProjectPreview";

export default function ProjectsGrid() {
  return (
    <section id="projects" className="relative overflow-hidden px-6 py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-32 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-32 right-10 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work with real purpose"
          description="A showcase of full-stack systems, web applications, and interface-focused projects built with practical tools and clean user experiences."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          {projects.map((project, index) => {
            const isFeatured = index === 0;

            const layoutClass =
              index === 0
                ? "lg:col-span-12 min-h-[560px]"
                : index === 1
                  ? "lg:col-span-5 lg:row-span-2 min-h-[680px]"
                  : index === 2
                    ? "lg:col-span-7 min-h-[330px]"
                    : "lg:col-span-7 min-h-[330px]";

            const innerLayout =
              index === 0
                ? "lg:grid-cols-[1.2fr_0.8fr]"
                : index === 1
                  ? "grid-rows-[0.9fr_1.1fr]"
                  : "lg:grid-cols-[0.9fr_1.1fr]";

            const imageOrder = index === 3 ? "lg:order-2" : "";

            return (
              <motion.article
                key={project.title}
                initial={{
                  opacity: 0,
                  y: 70,
                  scale: 0.96,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.22,
                  margin: "0px 0px -80px 0px",
                }}
                transition={{
                  duration: 0.65,
                  delay: Math.min(index * 0.06, 0.18),
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -8,
                  borderColor: "rgba(147,197,253,0.35)",
                }}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 shadow-2xl shadow-black/30 backdrop-blur-xl will-change-transform ${layoutClass}`}
              >
                <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex shrink-0 gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>

                  <p className="truncate font-mono text-sm text-slate-500">
                    ken@portfolio: ~/projects/{project.title.toLowerCase().replaceAll(" ", "-")}
                  </p>
                </div>

                <p className="shrink-0 font-mono text-xs text-cyan-300">
                  0{index + 1}
                </p>
              </div>

              <div className={`grid flex-1 gap-6 p-5 sm:p-6 lg:p-7 ${innerLayout}`}>
                  {/* Image Side */}
                  <div className={`relative min-h-72 ${imageOrder}`}>
                    <ProjectPreview
                      title={project.title}
                      images={project.images}
                      featured={isFeatured}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
                      <div className="project-scan absolute inset-x-0 h-24 bg-gradient-to-b from-cyan-300/10 to-transparent" />
                    </div>

                    {isFeatured && (
                      <div className="absolute bottom-5 left-5 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold text-blue-200 backdrop-blur">
                        Featured Project
                      </div>
                    )}
                  </div>

                  {/* Content Side */}
                  <div className="relative flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                    <div>
                      <div className="mb-7 flex items-center justify-between gap-4">
                        <span className="rounded-full bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-200">
                          {project.tag}
                        </span>

                        <div className="flex items-center gap-2">
                          {project.repo && (
                            <motion.a
                              href={project.repo}
                              target="_blank"
                              rel="noreferrer"
                              whileHover={{ y: -3, scale: 1.06 }}
                              whileTap={{ scale: 0.95 }}
                              className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-blue-300/40 hover:text-white"
                              aria-label={`Open ${project.title} GitHub repo`}
                            >
                              <FaGithub className="h-4 w-4" />
                            </motion.a>
                          )}

                          {project.live && (
                            <motion.a
                              href={project.live}
                              target="_blank"
                              rel="noreferrer"
                              whileHover={{ y: -3, scale: 1.06 }}
                              whileTap={{ scale: 0.95 }}
                              className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-blue-300/40 hover:text-white"
                              aria-label={`Open ${project.title} live demo`}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </motion.a>
                          )}
                        </div>
                      </div>

                      <motion.h3
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 0.55,
                          delay: 0.12,
                          ease: "easeOut",
                        }}
                        className={`origin-bottom text-white ${
                          isFeatured
                            ? "text-4xl font-black sm:text-5xl"
                            : "text-3xl font-bold sm:text-4xl"
                        }`}
                      >
                        {project.title}
                      </motion.h3>

                      <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 0.55,
                          delay: 0.18,
                          ease: "easeOut",
                        }}
                        className="mt-5 max-w-2xl rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 font-mono shadow-inner shadow-black/30"
                      >
                        <p className="text-xs text-slate-500">
                          <span className="text-cyan-300">$</span>{" "}
                          describe --project="{project.title}"
                        </p>

                        <p className="mt-3 text-sm leading-7 text-slate-300">
                          <span className="text-green-300">output:</span>{" "}
                          {project.description}
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.35 }}
                      variants={{
                        hidden: {},
                        show: {
                          transition: {
                            staggerChildren: 0.035,
                            delayChildren: 0.18,
                          },
                        },
                      }}
                      className="mt-8 flex flex-wrap gap-2"
                    >
                      {project.tech.map((item) => (
                        <motion.span
                          key={item}
                          variants={{
                            hidden: {
                              opacity: 0,
                              y: 12,
                              scale: 0.96,
                            },
                            show: {
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              transition: {
                                duration: 0.32,
                                ease: "easeOut",
                              },
                            },
                          }}
                          whileHover={{
                            y: -3,
                            scale: 1.04,
                            backgroundColor: "rgba(255,255,255,0.1)",
                          }}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
                  <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-400/10 blur-3xl" />
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