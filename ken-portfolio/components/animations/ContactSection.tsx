
"use client";

import {
  useRef,
  useState,
  type FormEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  Send,
} from "lucide-react";
import styles from "./ContactSection.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type FormStatus = "idle" | "sending" | "success" | "error";

const socialLinks = [
  {
    label: "GITHUB",
    url: "https://github.com/KenCamagay",
  },
  {
    label: "LINKEDIN",
    url: "https://www.linkedin.com/in/ken-camagay-024a56429/",
  },
  {
    label: "FACEBOOK",
    url: "https://www.facebook.com/ken.devenecia.98",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  useGSAP(
    () => {
      const cover = coverRef.current;
      const formSection = formRef.current;

      if (!cover || !formSection) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          const lines = cover.querySelectorAll(
            "[data-contact-line]"
          );

          const content = cover.querySelector<HTMLElement>(
            "[data-contact-content]"
          );

          const note = cover.querySelector<HTMLElement>(
            "[data-contact-note]"
          );

          const cue = cover.querySelector<HTMLElement>(
            "[data-contact-cue]"
          );

          const progress = cover.querySelector<HTMLElement>(
            "[data-contact-progress]"
          );

          // OPENING: type reveals like a printed headline.
          gsap.timeline({
            scrollTrigger: {
              trigger: cover,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          })
          .from(lines, {
            yPercent: 112,
            rotation: 2,
            duration: 1.1,
            stagger: 0.13,
            ease: "power4.out",
          })
          .from(
            [note, cue],
            {
              y: 35,
              opacity: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.55"
          );

          // EXIT: the editorial layout falls into depth.
          // Animates the parent, not the individually
          // animated letters, to avoid GSAP conflicts.
          if (content) {
            gsap.to(content, {
              yPercent: -12,
              rotationX: -9,
              scale: 0.91,
              opacity: 0.32,
              transformPerspective: 1500,
              transformOrigin: "center bottom",
              ease: "none",
              scrollTrigger: {
                trigger: cover,
                start: "top top",
                end: "bottom top",
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            });
          }

          // Thin reading-progress line.
          if (progress) {
            gsap.fromTo(
              progress,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: cover,
                  start: "top top",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }

          const formHeader = formSection.querySelector(
            "[data-form-header]"
          );

          const formElements = formSection.querySelectorAll(
            "[data-form-reveal]"
          );

          // FORM: content arrives in a sequence.
          gsap.timeline({
            scrollTrigger: {
              trigger: formSection,
              start: "top 76%",
              toggleActions: "play none none reverse",
            },
          })
          .from(formHeader, {
            y: 48,
            opacity: 0,
            duration: 0.95,
            ease: "power3.out",
          })
          .from(
            formElements,
            {
              y: 27,
              opacity: 0,
              duration: 0.75,
              stagger: 0.075,
              ease: "power3.out",
            },
            "-=0.4"
          );
        }
      );

      // Mobile: simple reveal, no perspective folding.
      mm.add(
        "(max-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.from("[data-contact-line]", {
            yPercent: 105,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cover,
              start: "top 85%",
              once: true,
            },
          });
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const body = String(data.get("message") ?? "").trim();

    if (!name || !email || !body) {
      setStatus("error");
      setFeedback("Please complete all three fields.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message: body,
        }),
      });

      const result = (await response.json().catch(
        () => ({})
      )) as {
        error?: string;
        success?: boolean;
      };

      if (!response.ok || result.success === false) {
        throw new Error(
          result.error || "Unable to send your message."
        );
      }

      setStatus("success");
      setFeedback(
        "Message sent. Thanks for reaching out!"
      );

      form.reset();
      setMessage("");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={styles.contact}
    >
      {/* PART 1: THE INVITATION */}
      <div ref={coverRef} className={styles.cover}>
        <div className={styles.coverTop}>
          <span>04 / GET IN TOUCH</span>
          <span>THE NEXT CHAPTER</span>
        </div>

        <div
          className={styles.coverContent}
          data-contact-content
        >
          <div className={styles.coverIntro}>
            <span className={styles.asterisk}>✳</span>
            <span>GOT SOMETHING IN MIND?</span>
          </div>

          <h2 className={styles.bigTitle}>
            <span className={styles.titleMask}>
              <span data-contact-line>
                LET&apos;S MAKE
              </span>
            </span>

            <span className={styles.titleMask}>
              <span
                className={styles.titleAccent}
                data-contact-line
              >
                IT REAL<span className={styles.fullStop}>.</span>
              </span>
            </span>
          </h2>

          <div className={styles.coverLower}>
            <div
              className={styles.invitation}
              data-contact-note
            >
              <span className={styles.microLabel}>
                A NOTE FROM KEN / 001
              </span>

              <p>
                No perfect brief required.
                Tell me what you have in mind —
                we can figure out the rest together.
              </p>
            </div>

            <a
              href="#contact-form"
              className={styles.coverAction}
              data-contact-cue
              aria-label="Go to contact form"
            >
              <span>START A CONVERSATION</span>
              <span className={styles.actionCircle}>
                <ArrowDownRight size={31} />
              </span>
            </a>
          </div>
        </div>

        <div className={styles.coverBottom}>
          <span>YOUR NEXT IDEA STARTS HERE</span>
          <span>SCROLL TO CONTINUE ↓</span>
        </div>

        <div className={styles.progressTrack}>
          <div
            data-contact-progress
            className={styles.progressFill}
          />
        </div>
      </div>

      {/* PART 2: THE OPEN BRIEF */}
      <div
        id="contact-form"
        ref={formRef}
        className={styles.formStage}
      >
        <div className={styles.formTop}>
          <span>04.1 / OPEN BRIEF</span>
          <span>START HERE ↗</span>
        </div>

        <div className={styles.formHeading} data-form-header>
          <span className={styles.microLabel}>
            FROM YOUR SCREEN TO MY INBOX
          </span>

          <h2>
            Tell me the
            <br />
            <em>messy version.</em>
          </h2>

          <p>
            A project idea, a collaboration, or simply
            a hello. Write what you know so far.
          </p>
        </div>

        <div className={styles.formGrid}>
          <aside className={styles.contactAside}>
            <div data-form-reveal>
              <span className={styles.asideNumber}>
                A / BEFORE WE TALK
              </span>

              <p className={styles.asideText}>
                I work across interfaces, full-stack
                applications, and interactive experiences.
                Tell me what you&apos;re trying to make.
              </p>
            </div>

            <div
              className={styles.asideRule}
              data-form-reveal
            />

            <div data-form-reveal>
              <span className={styles.asideNumber}>
                B / ELSEWHERE ON THE INTERNET
              </span>

              <div className={styles.socials}>
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={17} />
                  </a>
                ))}
              </div>
            </div>

            <div
              className={styles.signature}
              data-form-reveal
              aria-hidden="true"
            >
              K<span>/</span>C
              <small>KEN CAMAGAY © 2026</small>
            </div>
          </aside>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
            aria-label="Send a message to Ken"
          >
            <div
              className={styles.field}
              data-form-reveal
            >
              <div className={styles.fieldHeader}>
                <span className={styles.fieldNumber}>01</span>
                <label htmlFor="contact-name">
                  YOUR NAME
                </label>
              </div>

              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="What should I call you?"
                autoComplete="name"
                maxLength={100}
                required
              />
            </div>

            <div
              className={styles.field}
              data-form-reveal
            >
              <div className={styles.fieldHeader}>
                <span className={styles.fieldNumber}>02</span>
                <label htmlFor="contact-email">
                  EMAIL ADDRESS
                </label>
              </div>

              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="Where can I reply?"
                autoComplete="email"
                maxLength={200}
                required
              />
            </div>

            <div
              className={styles.field}
              data-form-reveal
            >
              <div className={styles.fieldHeader}>
                <span className={styles.fieldNumber}>03</span>
                <label htmlFor="contact-message">
                  YOUR MESSAGE
                </label>
              </div>

              <textarea
                id="contact-message"
                name="message"
                placeholder="The idea, the challenge, or just a hello..."
                rows={5}
                maxLength={5000}
                required
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  if (status !== "sending" && status !== "idle") {
                    setStatus("idle");
                    setFeedback("");
                  }
                }}
              />

              <span className={styles.counter}>
                {message.length} / 5000
              </span>
            </div>

            <div
              className={styles.submitArea}
              data-form-reveal
            >
              <button
                className={styles.submit}
                type="submit"
                disabled={status === "sending"}
              >
                <span>
                  {status === "sending"
                    ? "SENDING YOUR MESSAGE..."
                    : "SEND THE BRIEF"}
                </span>

                <span className={styles.submitIcon}>
                  {status === "sending" ? (
                    <span className={styles.spinner} />
                  ) : (
                    <Send size={22} />
                  )}
                </span>
              </button>

              <p
                className={`${styles.feedback} ${
                  status === "error"
                    ? styles.error
                    : status === "success"
                      ? styles.success
                      : ""
                }`}
                role={status === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                {feedback ||
                  "Your message goes directly through the contact form."}
              </p>
            </div>
          </form>
        </div>

        <footer className={styles.footer}>
          <span>KEN CAMAGAY — INDEPENDENT DEVELOPER</span>

          <a href="#home">
            BACK TO TOP
            <ArrowRight size={15} />
          </a>
        </footer>
      </div>
    </section>
  );
}
