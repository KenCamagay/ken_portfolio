"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { projects } from "@/data/projects";

const easing = [0.22, 1, 0.36, 1] as const;

export default function ProjectsGrid() {
  const reduceMotion = useReducedMotion();

  // Only show the first 4 projects for now
  const visibleProjects = projects.slice(0, 4);

  const featuredProject = visibleProjects[0];
  const otherProjects = visibleProjects.slice(1);

  return (
    <section
      id="projects"
      className="
        relative
        overflow-hidden
        px-5
        py-28
        sm:px-8
        lg:px-12
        lg:py-36
      "
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            right-[-250px]
            top-[15%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-500/[0.07]
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            bottom-[10%]
            left-[-250px]
            h-[450px]
            w-[450px]
            rounded-full
            bg-cyan-400/[0.045]
            blur-[140px]
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.55,
            ease: easing,
          }}
          className="mb-14 sm:mb-16"
        >
          <div
            className="
              mb-4
              flex
              items-center
              gap-3
              font-mono
              text-[11px]
              uppercase
              tracking-[0.2em]
              text-blue-400
            "
          >
            <span>01</span>

            <span className="h-px w-8 bg-blue-400/40" />

            <span>Selected Work</span>
          </div>

          <div
            className="
              flex
              flex-col
              justify-between
              gap-5
              md:flex-row
              md:items-end
            "
          >
            <div>
              <h2
                className="
                  text-4xl
                  font-semibold
                  tracking-[-0.04em]
                  text-white
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Projects
              </h2>

              <p
                className="
                  mt-5
                  max-w-xl
                  text-base
                  leading-7
                  text-slate-400
                "
              >
                A selection of applications I&apos;ve designed and built across
                web, mobile, backend, and emerging technologies.
              </p>
            </div>

            <div
              className="
                hidden
                font-mono
                text-xs
                text-slate-600
                md:block
              "
            >
              &lt;projects /&gt;
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            FEATURED PROJECT — SIGNSIGHT
        ===================================================== */}

        {featuredProject && (
          <motion.article
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 26,
              scale: reduceMotion ? 1 : 0.985,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.65,
              ease: easing,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-white/[0.08]
              bg-gradient-to-br
              from-white/[0.06]
              to-white/[0.018]
              shadow-[0_30px_100px_rgba(0,0,0,0.3)]
              backdrop-blur-xl
            "
          >
            {/* Hover glow */}
            <div
              className="
                pointer-events-none
                absolute
                right-[-100px]
                top-[-100px]
                h-[300px]
                w-[300px]
                rounded-full
                bg-blue-400/[0.08]
                opacity-0
                blur-[90px]
                transition-opacity
                duration-500
                group-hover:opacity-100
              "
            />

            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              {/* Project image */}
              <div
                className="
                  relative
                  min-h-[320px]
                  overflow-hidden
                  border-b
                  border-white/[0.07]
                  bg-[#07101d]
                  lg:min-h-[520px]
                  lg:border-b-0
                  lg:border-r
                "
              >
                {/* Fake browser bar */}
                <div
                  className="
                    absolute
                    inset-x-0
                    top-0
                    z-20
                    flex
                    h-11
                    items-center
                    border-b
                    border-white/[0.06]
                    bg-[#08111e]/80
                    px-4
                    backdrop-blur-md
                  "
                >
                  <div className="flex gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-400/70" />
                    <span className="h-2 w-2 rounded-full bg-yellow-300/70" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                  </div>

                  <div
                    className="
                      absolute
                      left-1/2
                      -translate-x-1/2
                      font-mono
                      text-[9px]
                      tracking-[0.15em]
                      text-slate-600
                    "
                  >
                    featured.project
                  </div>
                </div>

                {/* Image is optional in your Project type */}
                {featuredProject.images?.[0] ? (
                  <motion.div
                    className="absolute inset-0 top-11"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            scale: 1.025,
                          }
                    }
                    transition={{
                      duration: 0.45,
                      ease: easing,
                    }}
                  >
                    <Image
                      src={featuredProject.images[0]}
                      alt={`${featuredProject.title} preview`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
                ) : (
                  <div
                    className="
                      absolute
                      inset-0
                      top-11
                      flex
                      items-center
                      justify-center
                      font-mono
                      text-sm
                      text-slate-600
                    "
                  >
                    preview unavailable
                  </div>
                )}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#050a13]/55
                    via-transparent
                    to-transparent
                  "
                />
              </div>

              {/* Project information */}
              <div
                className="
                  relative
                  flex
                  flex-col
                  justify-between
                  p-7
                  sm:p-9
                  lg:p-10
                "
              >
                <div>
                  <div
                    className="
                      mb-8
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className="
                        font-mono
                        text-xs
                        tracking-[0.18em]
                        text-slate-600
                      "
                    >
                      01
                    </span>

                    <span
                      className="
                        rounded-full
                        border
                        border-blue-400/[0.15]
                        bg-blue-400/[0.06]
                        px-3
                        py-1.5
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-[0.18em]
                        text-blue-300
                      "
                    >
                      Featured
                    </span>
                  </div>

                  {/* tag instead of category */}
                  <p
                    className="
                      mb-3
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-cyan-300
                    "
                  >
                    {featuredProject.tag}
                  </p>

                  <h3
                    className="
                      text-3xl
                      font-semibold
                      tracking-[-0.035em]
                      text-white
                      sm:text-4xl
                    "
                  >
                    {featuredProject.title}
                  </h3>

                  <p
                    className="
                      mt-5
                      text-sm
                      leading-7
                      text-slate-400
                      sm:text-base
                    "
                  >
                    {featuredProject.description}
                  </p>

                  {/* tech instead of technologies */}
                  <div className="mt-7 flex flex-wrap gap-2">
                    {featuredProject.tech
                      .slice(0, 6)
                      .map((technology) => (
                        <span
                          key={technology}
                          className="
                            rounded-lg
                            border
                            border-white/[0.07]
                            bg-white/[0.035]
                            px-2.5
                            py-1.5
                            font-mono
                            text-[10px]
                            text-slate-400
                          "
                        >
                          {technology}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Links */}
                <div className="mt-10 flex flex-wrap gap-3">
                  {/* repo instead of github */}
                  {featuredProject.repo && (
                    <a
                      href={featuredProject.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        group/link
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/[0.09]
                        bg-white/[0.035]
                        px-4
                        py-2.5
                        text-sm
                        text-slate-300
                        transition-all
                        hover:border-white/[0.16]
                        hover:bg-white/[0.06]
                        hover:text-white
                      "
                    >
                      GitHub

                      <span
                        className="
                          transition-transform
                          group-hover/link:-translate-y-0.5
                          group-hover/link:translate-x-0.5
                        "
                      >
                        ↗
                      </span>
                    </a>
                  )}

                  {featuredProject.live && (
                    <a
                      href={featuredProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        group/link
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-500
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        transition-all
                        hover:bg-blue-400
                      "
                    >
                      Live project

                      <span
                        className="
                          transition-transform
                          group-hover/link:translate-x-1
                        "
                      >
                        →
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* =====================================================
            OTHER PROJECTS
        ===================================================== */}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {otherProjects.map((project, index) => {
            const projectNumber = String(index + 2).padStart(2, "0");

            return (
              <motion.article
                key={project.title}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.55,
                  delay: reduceMotion ? 0 : index * 0.08,
                  ease: easing,
                }}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/[0.08]
                  bg-gradient-to-br
                  from-white/[0.05]
                  to-white/[0.015]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-400/[0.18]

                  ${index === 2 ? "md:col-span-2" : ""}
                `}
              >
                {/* Image */}
                <div
                  className={`
                    relative
                    overflow-hidden
                    border-b
                    border-white/[0.07]
                    bg-[#07101d]

                    ${
                      index === 2
                        ? "aspect-[16/7]"
                        : "aspect-[16/10]"
                    }
                  `}
                >
                  <div
                    className="
                      absolute
                      left-4
                      top-4
                      z-20
                      flex
                      gap-1.5
                    "
                  >
                    <span className="h-2 w-2 rounded-full bg-red-400/60" />
                    <span className="h-2 w-2 rounded-full bg-yellow-300/60" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
                  </div>

                  {project.images?.[0] ? (
                    <motion.div
                      className="absolute inset-0"
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              scale: 1.03,
                            }
                      }
                      transition={{
                        duration: 0.4,
                        ease: easing,
                      }}
                    >
                      <Image
                        src={project.images[0]}
                        alt={`${project.title} preview`}
                        fill
                        sizes={
                          index === 2
                            ? "100vw"
                            : "(max-width: 768px) 100vw, 50vw"
                        }
                        className="object-cover object-center"
                      />
                    </motion.div>
                  ) : (
                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        font-mono
                        text-xs
                        text-slate-600
                      "
                    >
                      preview unavailable
                    </div>
                  )}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-[#040812]/45
                      via-transparent
                      to-transparent
                    "
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <div>
                      <p
                        className="
                          mb-2
                          font-mono
                          text-[9px]
                          uppercase
                          tracking-[0.18em]
                          text-cyan-300
                        "
                      >
                        {project.tag}
                      </p>

                      <h3
                        className="
                          text-xl
                          font-semibold
                          tracking-[-0.025em]
                          text-white
                          sm:text-2xl
                        "
                      >
                        {project.title}
                      </h3>
                    </div>

                    <span
                      className="
                        font-mono
                        text-xs
                        tracking-[0.15em]
                        text-slate-600
                      "
                    >
                      {projectNumber}
                    </span>
                  </div>

                  <p
                    className="
                      mt-4
                      line-clamp-3
                      text-sm
                      leading-6
                      text-slate-400
                    "
                  >
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.slice(0, 5).map((technology) => (
                      <span
                        key={technology}
                        className="
                          rounded-lg
                          border
                          border-white/[0.06]
                          bg-white/[0.025]
                          px-2.5
                          py-1
                          font-mono
                          text-[9px]
                          text-slate-500
                        "
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="mt-7 flex items-center gap-5">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          text-xs
                          font-medium
                          text-slate-400
                          transition
                          hover:text-blue-300
                        "
                      >
                        GitHub ↗
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          group/link
                          flex
                          items-center
                          gap-1.5
                          text-xs
                          font-medium
                          text-blue-300
                          transition
                          hover:text-blue-200
                        "
                      >
                        View project

                        <span
                          className="
                            transition-transform
                            group-hover/link:translate-x-1
                          "
                        >
                          →
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* =====================================================
            GITHUB FOOTER
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            mt-14
            flex
            items-center
            gap-4
          "
        >
          <span
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-slate-600
            "
          >
            more on github
          </span>

          <div
            className="
              h-px
              flex-1
              bg-gradient-to-r
              from-white/[0.08]
              to-transparent
            "
          />

          <a
            href="https://github.com/KenCamagay"
            target="_blank"
            rel="noreferrer"
            className="
              group
              hidden
              font-mono
              text-[10px]
              text-slate-500
              transition
              hover:text-blue-300
              sm:block
            "
          >
            github.com/KenCamagay

            <span
              className="
                ml-2
                inline-block
                transition-transform
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            >
              ↗
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}