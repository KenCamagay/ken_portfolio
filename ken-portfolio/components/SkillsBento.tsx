"use client";

import { motion, useReducedMotion } from "motion/react";
import { skills } from "@/data/skills";

const easing = [0.22, 1, 0.36, 1] as const;

/*
 * Controls the Bento layout on larger screens.
 */
const layouts = [
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

/*
 * We intentionally don't display every skill at once.
 * It keeps the portfolio easier to scan.
 */
const itemLimits = [12, 10, 10, 10, 10];

export default function SkillsBento() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
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
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Cyan glow */}
        <div
          className="
            absolute
            -right-[220px]
            top-[20%]
            h-[460px]
            w-[460px]
            rounded-full
            bg-cyan-400/[0.045]
            blur-[140px]
          "
        />

        {/* Blue glow */}
        <div
          className="
            absolute
            -left-[220px]
            bottom-[5%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-500/[0.055]
            blur-[150px]
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
          {/* Section number */}
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
            <span>02</span>

            <span className="h-px w-8 bg-blue-400/40" />

            <span>Toolkit</span>
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
                Skills & Technologies
              </h2>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-base
                  leading-7
                  text-slate-400
                "
              >
                Technologies and tools I use to build web, mobile, backend,
                and user-focused applications.
              </p>
            </div>

            {/* Terminal decoration */}
            <span
              className="
                hidden
                font-mono
                text-xs
                text-slate-600
                md:block
              "
            >
              $ cat skills.json
            </span>
          </div>
        </motion.div>

        {/* =====================================================
            BENTO GRID
        ===================================================== */}

        <div
          className="
            grid
            gap-5
            md:grid-cols-2
            lg:grid-cols-6
          "
        >
          {skills.map((skill, index) => {
            const limit = itemLimits[index] ?? 10;

            const shownItems = skill.items.slice(0, limit);

            const remainingItems =
              skill.items.length - shownItems.length;

            return (
              <motion.article
                key={skill.title}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 22,
                  scale: reduceMotion ? 1 : 0.985,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  delay: reduceMotion ? 0 : index * 0.07,
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
                  from-white/[0.055]
                  to-white/[0.015]
                  p-6
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-400/[0.18]
                  sm:p-7
                  md:col-span-1
                  ${layouts[index]}
                `}
              >
                {/* =================================================
                    HOVER GLOW
                ================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-52
                    w-52
                    rounded-full
                    bg-blue-400/[0.08]
                    opacity-0
                    blur-[80px]
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* Very subtle top highlight */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-8
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-blue-300/20
                    to-transparent
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />

                <div className="relative z-10">
                  {/* =================================================
                      CARD HEADER
                  ================================================= */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-5
                    "
                  >
                    <div>
                      {/* Terminal command */}
                      <p
                        className="
                          mb-3
                          font-mono
                          text-[9px]
                          uppercase
                          tracking-[0.18em]
                          text-cyan-300
                        "
                      >
                        {getCommand(skill.title)}
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
                        {skill.title}
                      </h3>
                    </div>

                    {/* Card number */}
                    <span
                      className="
                        font-mono
                        text-[10px]
                        tracking-[0.16em]
                        text-slate-600
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <p
                    className="
                      mt-4
                      max-w-2xl
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    {skill.description}
                  </p>

                  {/* Divider */}
                  <div
                    className="
                      my-6
                      h-px
                      w-full
                      bg-gradient-to-r
                      from-white/[0.08]
                      via-white/[0.04]
                      to-transparent
                    "
                  />

                  {/* =================================================
                      SKILLS
                  ================================================= */}

                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                      once: true,
                    }}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: reduceMotion
                            ? 0
                            : 0.025,
                        },
                      },
                    }}
                  >
                    {shownItems.map((item) => (
                      <motion.span
                        key={item}
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: 5,
                          },

                          visible: {
                            opacity: 1,
                            y: 0,
                          },
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="
                          rounded-lg
                          border
                          border-white/[0.07]
                          bg-white/[0.03]
                          px-2.5
                          py-1.5
                          font-mono
                          text-[10px]
                          text-slate-400
                          transition-all
                          duration-200
                          hover:border-blue-400/[0.2]
                          hover:bg-blue-400/[0.06]
                          hover:text-blue-200
                        "
                      >
                        {item}
                      </motion.span>
                    ))}

                    {/* Show remaining amount */}
                    {remainingItems > 0 && (
                      <motion.span
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: 5,
                          },

                          visible: {
                            opacity: 1,
                            y: 0,
                          },
                        }}
                        className="
                          rounded-lg
                          border
                          border-blue-400/[0.1]
                          bg-blue-400/[0.04]
                          px-2.5
                          py-1.5
                          font-mono
                          text-[10px]
                          text-blue-300/70
                        "
                      >
                        +{remainingItems} more
                      </motion.span>
                    )}
                  </motion.div>

                  {/* =================================================
                      CARD FOOTER
                  ================================================= */}

                  <div
                    className="
                      mt-7
                      flex
                      items-center
                      gap-2
                      font-mono
                      text-[9px]
                      text-slate-700
                    "
                  >
                    <span className="text-blue-400/50">$</span>

                    <span>
                      {skill.items.length} technologies
                    </span>

                    <motion.span
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: [1, 0.15, 1],
                            }
                      }
                      transition={{
                        duration: 1.3,
                        repeat: Infinity,
                      }}
                      className="
                        ml-1
                        inline-block
                        h-3
                        w-[5px]
                        bg-blue-400/35
                      "
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* =====================================================
            BOTTOM DECORATION
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
            mt-12
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
              text-slate-700
            "
          >
            always learning
          </span>

          <div
            className="
              h-px
              flex-1
              bg-gradient-to-r
              from-white/[0.07]
              to-transparent
            "
          />

          <span
            className="
              hidden
              font-mono
              text-[9px]
              text-slate-700
              sm:block
            "
          >
            continuously_building()
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   TERMINAL COMMAND LABEL
========================================================= */

function getCommand(title: string) {
  switch (title) {
    case "Web Development":
      return "$ stack.web";

    case "Backend & Database":
      return "$ stack.backend";

    case "Mobile Development":
      return "$ stack.mobile";

    case "UI / UX":
      return "$ design.ui";

    case "Tools & Workflow":
      return "$ tools.list";

    default:
      return "$ skills.list";
  }
}