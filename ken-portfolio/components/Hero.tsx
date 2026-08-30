"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const easing = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="
        relative
        flex
        min-h-screen
        items-center
        overflow-hidden
        px-5
        pb-20
        pt-32

        sm:px-8
        lg:px-12
      "
    >
      {/* =====================================================
          BACKGROUND EFFECTS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main blue glow */}
        <motion.div
          className="
            absolute
            -right-[180px]
            top-[5%]

            h-[520px]
            w-[520px]

            rounded-full
            bg-blue-500/[0.12]

            blur-[130px]
          "
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, -25, 5, 0],
                  y: [0, 15, -10, 0],
                  scale: [1, 1.04, 0.98, 1],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Cyan glow */}
        <motion.div
          className="
            absolute
            -bottom-[180px]
            -left-[180px]

            h-[460px]
            w-[460px]

            rounded-full
            bg-cyan-400/[0.08]

            blur-[130px]
          "
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 20, -5, 0],
                  y: [0, -15, 5, 0],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Tiny violet accent */}
        <div
          className="
            absolute
            left-[35%]
            top-[30%]

            h-[350px]
            w-[350px]

            rounded-full

            bg-violet-500/[0.035]

            blur-[140px]
          "
        />

        {/* Subtle background grid */}
        <div
          className="
            absolute
            inset-0

            opacity-[0.13]

            [background-image:linear-gradient(rgba(96,165,250,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.08)_1px,transparent_1px)]

            [background-size:65px_65px]

            [mask-image:radial-gradient(circle_at_50%_35%,black,transparent_72%)]
          "
        />

        {/* Fade grid toward bottom */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[300px]

            bg-gradient-to-b
            from-transparent
            to-[#040812]
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          grid
          w-full
          max-w-7xl

          items-center

          gap-14

          lg:grid-cols-[1.08fr_0.92fr]
          lg:gap-20
        "
      >
        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.09,
                delayChildren: reduceMotion ? 0 : 0.15,
              },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          {/* Developer status badge */}

          <motion.div
            variants={fadeUp}
            transition={{
              duration: 0.5,
              ease: easing,
            }}
            className="
              mb-7

              inline-flex
              items-center
              gap-2.5

              rounded-full

              border
              border-blue-400/[0.15]

              bg-blue-400/[0.05]

              px-3.5
              py-2

              font-mono
              text-[11px]

              tracking-[0.14em]

              text-blue-300

              backdrop-blur-sm
            "
          >
            <span
              className="
                h-1.5
                w-1.5

                rounded-full

                bg-emerald-400

                shadow-[0_0_12px_rgba(52,211,153,0.8)]
              "
            />

            &gt; hello_world
          </motion.div>

          {/* Small role */}

          <motion.p
            variants={fadeUp}
            transition={{
              duration: 0.5,
              ease: easing,
            }}
            className="
              mb-3

              text-xs
              font-medium

              uppercase

              tracking-[0.24em]

              text-slate-500

              sm:text-sm
            "
          >
            Full-Stack Developer
          </motion.p>

          {/* Name */}

          <motion.h1
            variants={fadeUp}
            transition={{
              duration: 0.55,
              ease: easing,
            }}
            className="
              max-w-3xl

              text-5xl
              font-semibold

              leading-[0.98]

              tracking-[-0.05em]

              text-white

              sm:text-6xl

              lg:text-7xl

              xl:text-[5.3rem]
            "
          >
            I&apos;m Ken
            <br />

            <span
              className="
                bg-gradient-to-r
                from-white
                via-blue-100
                to-blue-400

                bg-clip-text

                text-transparent
              "
            >
              Camagay.
            </span>
          </motion.h1>

          {/* Main description */}

          <motion.p
            variants={fadeUp}
            transition={{
              duration: 0.55,
              ease: easing,
            }}
            className="
              mt-7

              max-w-xl

              text-base

              leading-8

              text-slate-400

              sm:text-lg
              sm:leading-8
            "
          >
            I build modern web and mobile applications that turn ideas into
            practical, polished digital solutions.
          </motion.p>

          {/* Specializations */}

          <motion.div
            variants={fadeUp}
            transition={{
              duration: 0.5,
              ease: easing,
            }}
            className="
              mt-7

              flex
              flex-wrap

              gap-2
            "
          >
            {["Full-Stack", "Mobile", "APIs"].map((item) => (
              <span
                key={item}
                className="
                  rounded-full

                  border
                  border-white/[0.07]

                  bg-white/[0.035]

                  px-3.5
                  py-1.5

                  font-mono
                  text-[11px]

                  text-slate-400
                "
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* Buttons */}

          <motion.div
            variants={fadeUp}
            transition={{
              duration: 0.5,
              ease: easing,
            }}
            className="
              mt-9

              flex
              flex-wrap

              items-center

              gap-3
            "
          >
            {/* Primary button */}

            <a
              href="#projects"
              className="
                group

                inline-flex
                items-center
                gap-2

                rounded-xl

                bg-blue-500

                px-5
                py-3

                text-sm
                font-semibold

                text-white

                shadow-[0_14px_40px_rgba(59,130,246,0.22)]

                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:bg-blue-400

                hover:shadow-[0_18px_50px_rgba(59,130,246,0.28)]
              "
            >
              View my work

              <span
                className="
                  transition-transform
                  duration-200

                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </a>

            {/* Secondary button */}

            <a
              href="#contact"
              className="
                inline-flex
                items-center

                rounded-xl

                border
                border-white/[0.09]

                bg-white/[0.035]

                px-5
                py-3

                text-sm
                font-medium

                text-slate-300

                backdrop-blur-md

                transition-all
                duration-200

                hover:-translate-y-0.5

                hover:border-white/[0.16]

                hover:bg-white/[0.06]

                hover:text-white
              "
            >
              Contact me
            </a>
          </motion.div>

          {/* Social / availability */}

          <motion.div
            variants={fadeUp}
            transition={{
              duration: 0.5,
              ease: easing,
            }}
            className="
              mt-8

              flex
              flex-wrap

              items-center

              gap-4

              text-xs

              text-slate-500

              sm:text-sm
            "
          >
            <a
              href="https://github.com/KenCamagay"
              target="_blank"
              rel="noreferrer"
              className="
                transition-colors

                hover:text-blue-300
              "
            >
              GitHub ↗
            </a>

            <span
              className="
                h-1
                w-1

                rounded-full

                bg-slate-700
              "
            />

            <span
              className="
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5

                  rounded-full

                  bg-emerald-400/80
                "
              />

              Open to opportunities
            </span>
          </motion.div>
        </motion.div>

        {/* =====================================================
            RIGHT SIDE - TERMINAL
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : 30,
            scale: reduceMotion ? 1 : 0.98,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            delay: reduceMotion ? 0 : 0.35,
            duration: 0.7,
            ease: easing,
          }}
          className="
            relative

            mx-auto

            w-full
            max-w-xl

            lg:mx-0
          "
        >
          {/* Glow behind terminal */}

          <div
            className="
              pointer-events-none

              absolute
              -inset-12
              -z-10

              rounded-full

              bg-blue-500/[0.08]

              blur-[100px]
            "
          />

          {/* Terminal window */}

          <motion.div
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -4,
                  }
            }
            transition={{
              duration: 0.25,
            }}
            className="
              group

              relative

              overflow-hidden

              rounded-3xl

              border
              border-white/[0.08]

              bg-gradient-to-br
              from-white/[0.065]
              to-white/[0.018]

              shadow-[0_25px_80px_rgba(0,0,0,0.35)]

              backdrop-blur-xl
            "
          >
            {/* Subtle hover reflection */}

            <div
              className="
                pointer-events-none

                absolute
                inset-0

                z-20

                translate-x-[-100%]

                bg-gradient-to-r

                from-transparent
                via-blue-300/[0.025]
                to-transparent

                transition-transform
                duration-1000

                group-hover:translate-x-[100%]
              "
            />

            {/* Terminal top */}

            <div
              className="
                relative
                z-10

                flex
                items-center

                border-b
                border-white/[0.07]

                px-5
                py-4
              "
            >
              {/* Window buttons */}

              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/75" />

                <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/75" />

                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/75" />
              </div>

              {/* Terminal title */}

              <span
                className="
                  absolute

                  left-1/2

                  -translate-x-1/2

                  font-mono

                  text-[10px]

                  tracking-[0.16em]

                  text-slate-500
                "
              >
                ken@portfolio
              </span>
            </div>

            {/* Terminal content */}

            <div
              className="
                relative

                min-h-[420px]

                overflow-hidden

                p-6

                font-mono

                text-[13px]

                leading-7

                sm:p-8
                sm:text-sm

                [background-image:linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)]

                [background-size:28px_28px]
              "
            >
              {/* whoami */}

              <TerminalBlock delay={0.65}>
                <Prompt>whoami</Prompt>

                <TerminalOutput>
                  Ken Camagay
                </TerminalOutput>

                <TerminalMuted>
                  Full-Stack Developer
                </TerminalMuted>
              </TerminalBlock>

              {/* Current focus */}

              <TerminalBlock delay={0.82}>
                <Prompt>focus --current</Prompt>

                <div
                  className="
                    mt-2

                    flex
                    flex-wrap

                    gap-2
                  "
                >
                  {[
                    "web",
                    "mobile",
                    "apis",
                    "databases",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="
                        rounded-md

                        border
                        border-cyan-300/[0.1]

                        bg-cyan-300/[0.045]

                        px-2.5
                        py-0.5

                        text-cyan-200
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </TerminalBlock>

              {/* Stack */}

              <TerminalBlock delay={1}>
                <Prompt>stack --favorite</Prompt>

                <p className="mt-1 text-slate-400">
                  React · Next.js · Laravel · React Native
                </p>
              </TerminalBlock>

              {/* Status */}

              <TerminalBlock delay={1.15}>
                <Prompt>status</Prompt>

                <p
                  className="
                    mt-1

                    flex
                    items-center

                    gap-2

                    text-slate-300
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5

                      rounded-full

                      bg-emerald-400

                      shadow-[0_0_10px_rgba(52,211,153,0.7)]
                    "
                  />

                  building &amp; learning
                </p>
              </TerminalBlock>

              {/* Final terminal cursor */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: reduceMotion ? 0 : 1.3,
                }}
                className="
                  mt-8

                  flex
                  items-center
                "
              >
                <span className="text-blue-300">
                  ken@portfolio
                </span>

                <span className="text-slate-600">
                  :
                </span>

                <span className="text-cyan-300">
                  ~
                </span>

                <span
                  className="
                    mx-2

                    text-slate-600
                  "
                >
                  $
                </span>

                <motion.span
                  className="
                    h-4
                    w-[7px]

                    rounded-[1px]

                    bg-blue-400
                  "
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: [1, 1, 0.15, 0.15],
                        }
                  }
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    times: [0, 0.48, 0.49, 1],
                  }}
                />
              </motion.div>
            </div>

            {/* Bottom blue line */}

            <div
              className="
                pointer-events-none

                absolute

                bottom-0
                left-1/2

                h-px
                w-[65%]

                -translate-x-1/2

                bg-gradient-to-r

                from-transparent
                via-blue-400/35
                to-transparent
              "
            />
          </motion.div>
        </motion.div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <motion.a
        href="#projects"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: reduceMotion ? 0 : 1.35,
        }}
        className="
          absolute

          bottom-7
          left-1/2

          z-20

          hidden

          -translate-x-1/2

          flex-col

          items-center

          gap-2

          font-mono

          text-[9px]

          uppercase

          tracking-[0.22em]

          text-slate-600

          sm:flex
        "
      >
        scroll.down()

        <motion.span
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, 4, 0],
                }
          }
          transition={{
            duration: 1.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-blue-400"
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  );
}

/* =========================================================
   TERMINAL HELPERS
========================================================= */

function TerminalBlock({
  children,
  delay,
}: {
  children: ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
        duration: 0.4,
        ease: easing,
      }}
      className="mb-6"
    >
      {children}
    </motion.div>
  );
}

function Prompt({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className="text-slate-300">
      <span className="text-blue-300">$</span>{" "}
      {children}
    </p>
  );
}

function TerminalOutput({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className="mt-1 text-slate-200">
      {children}
    </p>
  );
}

function TerminalMuted({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className="text-slate-500">
      {children}
    </p>
  );
}