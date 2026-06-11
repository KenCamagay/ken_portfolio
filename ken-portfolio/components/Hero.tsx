"use client";

import {
  ArrowDown,
  Mail,
  Sparkles,
  Code2,
  Database,
  Server,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
const wordContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.2,
    },
  },
};

const wordReveal: Variants = {
  hidden: {
    y: "110%",
    rotateX: -80,
    opacity: 0,
  },
  show: {
    y: "0%",
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

const clipReveal: Variants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
    opacity: 0,
  },
  show: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.55,
    },
  },
};
export default function Hero() {
  const techStack = [
    "Web Development",
    "Mobile Development",
    "UI Design",
    "React",
    "Next.js",
    "React Native",
    "Expo",
    "Tailwind CSS",
    "Laravel",
    "FastAPI",
    "MongoDB",
    "MySQL",
    "And More",
  ];

  const cardItems = [
    {
      title: "Frontend",
      subtitle: "UI & UX",
      icon: Code2,
      color: "text-blue-300",
    },
    {
      title: "Backend",
      subtitle: "APIs",
      icon: Server,
      color: "text-purple-300",
    },
    {
      title: "Database",
      subtitle: "Systems",
      icon: Database,
      color: "text-cyan-300",
    },
  ];


    const { scrollYProgress } = useScroll();

    const heroTextY = useTransform(scrollYProgress, [0, 0.25], [0, -130]);
    const heroTextScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.88]);
    const heroTextRotate = useTransform(scrollYProgress, [0, 0.25], [0, -4]);
    const heroTextBlur = useTransform(
    scrollYProgress,
    [0, 0.25],
    ["blur(0px)", "blur(10px)"]
    );
    const heroTextOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const heroVisualY = useTransform(scrollYProgress, [0, 0.25], [0, 90]);
    const heroVisualScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.08]);
    const heroVisualRotate = useTransform(scrollYProgress, [0, 0.25], [0, 5]);
    const heroVisualOpacity = useTransform(scrollYProgress, [0, 0.23], [1, 0.15]);

    const nameWords = ["Hi,", "I’m", "Ken", "Camagay"];


    
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-6 py-24">
      <div className="absolute inset-0 -z-10">
        <div className="hero-grid absolute inset-0 opacity-30" />

        <motion.div
          className="absolute left-[-10rem] top-20 h-96 w-96 rounded-full bg-blue-500/25 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, 24, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute right-[-8rem] top-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            x: [0, -38, 0],
            y: [0, 30, 0],
            scale: [1, 1.14, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-[-10rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
     <motion.div
        style={{
            y: heroTextY,
            opacity: heroTextOpacity,
            scale: heroTextScale,
            rotate: heroTextRotate,
            filter: heroTextBlur,
        }}
        className="origin-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 shadow-lg shadow-blue-950/20 backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-blue-300" />
            Full-stack developer building modern web experiences
          </motion.div>

         <motion.h1
            variants={wordContainer}
            initial="hidden"
            animate="show"
            className="perspective-dramatic max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
            {nameWords.map((word, index) => (
                <span key={word} className="mr-4 inline-block overflow-hidden pb-2">
                <motion.span
                    variants={wordReveal}
                    className={`inline-block ${index >= 2 ? "animated-gradient-text" : ""}`}
                    animate={
                    index >= 2
                        ? {
                            y: [0, -5, 0],
                            scale: [1, 1.015, 1],
                        }
                        : undefined
                    }
                    transition={
                    index >= 2
                        ? {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1 + index * 0.2,
                        }
                        : undefined
                    }
                >
                    {word}
                </motion.span>
                </span>
            ))}
            </motion.h1>

          <motion.p
            variants={clipReveal}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
            >
            I’m a Fullstack developer focused on web development, mobile development, and clean UI
            design. I build responsive interfaces, backend-connected systems, and practical
            digital experiences using tools like React, Next.js, React Native, Expo,
            Laravel, FastAPI, MongoDB, and MySQL.
            </motion.p>

          <div className="mt-8 flex flex-wrap gap-3">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 16, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.4 + index * 0.07,
                  duration: 0.45,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -5,
                  scale: 1.04,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-300 backdrop-blur"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.7, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <motion.a
              href="#projects"
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group idle-shimmer inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-blue-500/20"
            >
              View Projects
              <ArrowDown className="ml-2 h-4 w-4 transition group-hover:translate-y-1" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{
                y: -5,
                scale: 1.03,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur"
            >
              Contact Me
              <Mail className="ml-2 h-4 w-4" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.85, ease: "easeOut" }}
            className="mt-8 flex items-center gap-4 text-sm text-slate-400"
          >
            <motion.a
              href="https://github.com/KenCamagay"
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </motion.a>

            <span className="h-1 w-1 rounded-full bg-slate-600" />

            <span>Fullstack / Web / Mobile / UI Systems</span>
          </motion.div>
        </motion.div>

       <motion.div
            initial={{ opacity: 0, x: 48, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            style={{
                y: heroVisualY,
                scale: heroVisualScale,
                rotate: heroVisualRotate,
                opacity: heroVisualOpacity,
            }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
          <motion.div
            className="absolute left-1/2 top-1/2 h-80 w-80 rounded-full border border-blue-300/10"
            animate={{ rotate: 360 }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ x: "-50%", y: "-50%" }}
          />

          <motion.div
            className="absolute left-1/2 top-1/2 h-96 w-96 rounded-full border border-purple-300/10"
            animate={{
              rotate: -360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: {
                duration: 32,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            style={{ x: "-50%", y: "-50%" }}
          />

          <motion.div
            animate={{
              y: [0, -16, 0],
              rotate: [0, 1.2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.02,
              rotate: 0,
            }}
            className="relative rounded-[2rem] border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-blue-950/40 backdrop-blur-xl"
          >
            <div className="scanner-line" />

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/90 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-medium text-green-300"
                >
                  online
                </motion.span>
              </div>

              <div className="space-y-4 font-mono text-sm">
                <p className="text-slate-500">// developer.profile.ts</p>

                <p>
                  <span className="text-purple-300">const</span>{" "}
                  <span className="text-blue-300">developer</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-green-300">"Ken Camagay"</span>
                </p>

                <p>
                  <span className="text-purple-300">const</span>{" "}
                  <span className="text-blue-300">role</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-green-300">
                    "Full-stack Developer"
                  </span>
                </p>

                <p>
                  <span className="text-purple-300">const</span>{" "}
                  <span className="text-blue-300">focus</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-orange-300">
                    ["Frontend", "Backend", "Clean UI"]
                  </span>
                </p>

                <p>
                  <span className="text-purple-300">const</span>{" "}
                  <span className="text-blue-300">mission</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-green-300">
                    "Build full-stack web applications"
                  </span>
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {cardItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 1.1 + index * 0.12,
                        duration: 0.5,
                      }}
                      whileHover={{
                        y: -7,
                        backgroundColor: "rgba(255,255,255,0.08)",
                      }}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <Icon className={`mb-3 h-5 w-5 ${item.color}`} />
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.subtitle}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { delay: 1, duration: 0.5 },
              x: { delay: 1, duration: 0.5 },
              y: {
                delay: 1.2,
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm text-white shadow-xl backdrop-blur md:block"
          >
            Building real, usable web apps.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20, y: -10 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -12, 0],
            }}
            transition={{
              opacity: { delay: 1.15, duration: 0.5 },
              x: { delay: 1.15, duration: 0.5 },
              y: {
                delay: 1.4,
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute -right-4 -top-5 hidden rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm text-white shadow-xl backdrop-blur md:block"
          >
            Clean code. Clean design.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}