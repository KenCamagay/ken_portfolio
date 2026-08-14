"use client";

import { FormEvent, useState } from "react";
import {
  Mail,
  Send,
  ArrowUpRight,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { motion, useScroll, useTransform } from "motion/react";
import SectionHeader from "./SectionHeader";

const contactLinks = [
  {
    label: "GitHub",
    value: "github.com/KenCamagay",
    meta: "contact.github",
    href: "https://github.com/KenCamagay",
    icon: FaGithub,
    color: "purple",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/YOUR-LINKEDIN",
    meta: "contact.linkedin",
    href: "https://www.linkedin.com/in/ken-camagay-024a56429/",
    icon: FaLinkedin,
    color: "blue",
  },
  {
    label: "Facebook",
    value: "facebook.com/YOUR-FACEBOOK",
    meta: "contact.facebook",
    href: "https://www.facebook.com/ken.devenecia.98",
    icon: FaFacebook,
    color: "blue",
  },
];

export default function ContactSection() {
  const { scrollYProgress } = useScroll();

  const sectionY = useTransform(scrollYProgress, [0.68, 0.82, 1], [80, 0, 0]);
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0.65, 0.78, 1],
    [0.6, 1, 1]
  );

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
    };

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setStatus("success");
      setFeedback("Message sent successfully. I’ll get back to you soon.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-24 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <motion.div
        style={{
          y: sectionY,
          opacity: sectionOpacity,
        }}
        className="mx-auto max-w-6xl"
      >
        <SectionHeader
          eyebrow="Contact"
          title="Let’s build something useful"
          description="Send me a message directly from this portfolio or check out my work through my socials."
        />

        <motion.div
          initial={{
            opacity: 0,
            y: 90,
            scale: 0.94,
            rotateX: 16,
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
            y: -8,
            borderColor: "rgba(147,197,253,0.35)",
          }}
          className="group relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10"
        >
          <div className="absolute inset-0 opacity-25">
            <div className="contact-grid absolute inset-0" />
          </div>

          <div className="contact-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-300/10 to-transparent opacity-0 transition group-hover:opacity-100" />

          <div className="relative z-10">
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <span className="hidden font-mono text-sm text-slate-500 sm:inline">
                  ken@portfolio: ~/contact
                </span>
              </div>

              <motion.div
                animate={{
                  opacity: [0.55, 1, 0.55],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center gap-2 rounded-full border border-green-300/20 bg-green-400/10 px-3 py-1 text-xs font-medium text-green-300"
              >
                <span className="h-2 w-2 rounded-full bg-green-300" />
                available
              </motion.div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <motion.p
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="font-mono text-sm text-slate-500"
                >
                  $ start conversation --with=ken
                </motion.p>

                <motion.h3
                  initial={{ opacity: 0, y: 34, rotateX: -45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                  className="mt-6 max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl"
                >
                  Ready to turn an idea into a working web app?
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
                  I’m open to building full-stack projects, improving existing
                  systems, creating modern interfaces, and collaborating on
                  practical web applications.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.75, delay: 0.55 }}
                  className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="flex items-start gap-3">
                    <MessageSquare className="mt-1 h-5 w-5 text-blue-300" />
                    <div>
                      <p className="font-mono text-sm font-semibold text-white">
                        response.mode = direct
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Fill out the form and the message will be sent directly
                        to my Gmail inbox.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="grid content-center gap-4">
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, x: 60, rotate: 3, scale: 0.92 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ duration: 0.65, delay: 0.45, ease: "easeOut" }}
                  className="rounded-3xl border border-white/10 bg-white/[0.05] p-5"
                >
                  <div className="grid gap-4">
                    <div>
                      <label className="mb-2 block font-mono text-xs text-slate-500">
                        your.name
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-xs text-slate-500">
                        your.email
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="your.email@gmail.com"
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-xs text-slate-500">
                        message.body
                      </label>
                      <textarea
                        name="message"
                        required
                        minLength={10}
                        rows={5}
                        placeholder="Tell me about your project or idea..."
                        className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={
                        status === "sending"
                          ? undefined
                          : {
                              y: -4,
                              scale: 1.02,
                            }
                      }
                      whileTap={status === "sending" ? undefined : { scale: 0.97 }}
                      className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "sending" ? (
                        <>
                          Sending
                          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </motion.button>

                    {feedback && (
                      <p
                        className={`font-mono text-sm ${
                          status === "success"
                            ? "text-green-300"
                            : "text-red-300"
                        }`}
                      >
                        {feedback}
                      </p>
                    )}
                  </div>
                </motion.form>

                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.35 }}
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.12,
                        delayChildren: 0.65,
                      },
                    },
                  }}
                  className="grid gap-4 xl:grid-cols-3"
                >
                  {contactLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: 20,
                            scale: 0.94,
                          },
                          show: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { duration: 0.55, ease: "easeOut" },
                          },
                        }}
                        whileHover={{
                          y: -5,
                          scale: 1.03,
                          backgroundColor: "rgba(255,255,255,0.08)",
                        }}
                        className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                      >
                        <Icon className="h-5 w-5 shrink-0 text-blue-300" />
                        <span className="truncate text-sm font-semibold text-white">
                          {link.label}
                        </span>
                        <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-slate-500" />
                      </motion.a>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}