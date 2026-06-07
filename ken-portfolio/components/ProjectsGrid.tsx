"use client";

import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "motion/react";
import SectionHeader from "./SectionHeader";
import { projects } from "@/data/projects";

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
                className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur-xl will-change-transform ${layoutClass}`}
              >
                <div className={`grid h-full ${innerLayout}`}>
                  {/* Image Side */}
                  <div
                    className={`relative min-h-72 overflow-hidden bg-slate-900 ${imageOrder}`}
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full min-h-72 items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40">
                        <div className="text-center">
                          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5">
                            <ArrowUpRight className="h-8 w-8 text-blue-300" />
                          </div>
                          <p className="text-sm font-medium text-slate-400">
                            Project Preview
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
                      <div className="project-scan absolute inset-x-0 h-24 bg-gradient-to-b from-cyan-300/10 to-transparent" />
                    </div>

                    <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                      0{index + 1}
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

                      <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 0.55,
                          delay: 0.18,
                          ease: "easeOut",
                        }}
                        className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base"
                      >
                        {project.description}
                      </motion.p>
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
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}