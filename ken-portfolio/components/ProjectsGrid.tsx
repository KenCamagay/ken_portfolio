"use client";

import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "motion/react";
import SectionHeader from "./SectionHeader";
import { projects } from "@/data/projects";
import ProjectPreview from "./ProjectPreview";

export default function ProjectsGrid() {
  const featuredProjects = projects.slice(0, 4);

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-6 py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-10 top-32 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-32 right-10 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work"
          description="A collection of practical web, mobile, and full-stack applications built to solve real problems."
        />

        {/* Projects */}
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              whileHover={{ y: -4 }}
              className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 shadow-2xl shadow-black/30 backdrop-blur-xl"
            >
              {/* Browser-style header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex shrink-0 gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>

                  <p className="truncate font-mono text-xs text-slate-500">
                    ~/projects/
                    {project.title.toLowerCase().replaceAll(" ", "-")}
                  </p>
                </div>

                <span className="font-mono text-xs text-cyan-300">
                  0{index + 1}
                </span>
              </div>

              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <ProjectPreview
                  title={project.title}
                  images={project.images}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

                {/* Subtle hover line */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex rounded-full bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-200">
                      {project.tag}
                    </span>

                    <h3 className="mt-4 text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>

                  {/* Links */}
                  <div className="flex shrink-0 items-center gap-2">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.title} GitHub repository`}
                        className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:border-blue-300/40 hover:bg-white/10 hover:text-white"
                      >
                        <FaGithub className="h-4 w-4" />
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.title} live demo`}
                        className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:border-blue-300/40 hover:bg-white/10 hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">
                  {project.description}
                </p>

                {/* Tech */}
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {project.tech.slice(0, 6).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-slate-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Subtle glow */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-blue-400/5 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}