
"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data/projects";
import styles from "./AboutWorkFold.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Use the same selection logic as the Works section.
const archiveProjects = projects
  .filter(
    (project) =>
      project.title.toLowerCase() !== "dagudorms" &&
      Boolean(project.images?.[0])
  )
  .slice(0, 4);

export default function AboutWorkFold({
  children,
}: {
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const aboutAnchorRef = useRef<HTMLDivElement>(null);
  const aboutPaperRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const aboutAnchor = aboutAnchorRef.current;
      const aboutPaper = aboutPaperRef.current;
      const transition = transitionRef.current;

      if (!aboutAnchor || !aboutPaper || !transition) {
        return;
      }

      const cream = transition.querySelector<HTMLElement>(
        "[data-archive-cream]"
      );

      const dark = transition.querySelector<HTMLElement>(
        "[data-archive-dark]"
      );

      const words = gsap.utils.toArray<HTMLElement>(
        "[data-archive-word]",
        transition
      );

      const records = gsap.utils.toArray<HTMLElement>(
        "[data-archive-record]",
        transition
      );

      const details = transition.querySelectorAll<HTMLElement>(
        "[data-archive-detail]"
      );

      const progress = transition.querySelector<HTMLElement>(
        "[data-archive-progress]"
      );

      if (!cream || !dark || !progress) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          const navHeight = () => {
            const nav =
              document.querySelector<HTMLElement>(
                ".topnav"
              );

            return Math.round(
              nav?.getBoundingClientRect().height ?? 76
            );
          };

          // ABOUT ENTRANCE
          // Uses only y and opacity, leaving the
          // About section's own text animations alone.
          gsap.fromTo(
            aboutPaper,
            {
              y: 46,
              opacity: 0.94,
            },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: aboutAnchor,
                start: "top 95%",
                end: "top 76%",
                scrub: 0.25,
                invalidateOnRefresh: true,
              },
            }
          );

          // ABOUT EXIT
          // A short fold into depth, without a fade
          // to black or a prolonged empty viewport.
          gsap.to(aboutPaper, {
            rotationX: -7,
            z: -110,
            scale: 0.975,
            transformPerspective: 1500,
            transformOrigin: "50% 0%",
            ease: "none",
            scrollTrigger: {
              trigger: aboutAnchor,
              start: "bottom 97%",
              end: "bottom 65%",
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          });

          // THE ARCHIVE SHEET
          // This is separate from About and Works.
          // Nothing inside the pinned Works section
          // is modified.
          gsap.set(cream, {
            transformPerspective: 1600,
            transformOrigin: "50% 0%",
            force3D: true,
          });

          gsap.set(dark, {
            yPercent: 107,
            rotation: 5,
            rotationX: 11,
            transformPerspective: 1500,
            transformOrigin: "50% 100%",
            force3D: true,
          });

          gsap.set(words, {
            yPercent: 115,
            opacity: 0,
          });

          gsap.set(records, {
            x: 38,
            opacity: 0,
          });

          gsap.set(details, {
            y: 20,
            opacity: 0,
          });

          gsap.set(progress, {
            scaleX: 0,
            transformOrigin: "left center",
          });

          const timeline = gsap.timeline({
            defaults: {
              ease: "none",
            },
            scrollTrigger: {
              trigger: transition,

              // The sticky scene sits below the navbar.
              start: () => `top ${navHeight()}px`,

              // Finish when the sticky section releases.
              end: "bottom bottom",

              scrub: 0.28,
              invalidateOnRefresh: true,
            },
          });

          // 01 — Establish the cream closing page.
          timeline.to({}, { duration: 0.08 });

          // 02 — Fold the old page away.
          timeline.to(
            cream,
            {
              rotationX: -16,
              yPercent: -16,
              z: -190,
              scale: 0.94,
              opacity: 0.25,
              duration: 0.62,
              ease: "power2.in",
            },
            0.05
          );

          // 03 — A dark sheet rises diagonally.
          timeline.to(
            dark,
            {
              yPercent: 0,
              rotation: 0,
              rotationX: 0,
              duration: 0.72,
              ease: "power3.inOut",
            },
            0.1
          );

          // 04 — Its irregular leading edge
          // becomes a perfectly straight page.
          timeline.to(
            dark,
            {
              clipPath:
                "polygon(0 0, 75% 0, 100% 0, 100% 100%, 0 100%)",
              duration: 0.23,
              ease: "power2.out",
            },
            0.69
          );

          // 05 — Oversized headline assembles.
          timeline.to(
            words,
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.34,
              stagger: 0.075,
              ease: "power3.out",
            },
            0.55
          );

          // 06 — The project index follows.
          timeline.to(
            records,
            {
              x: 0,
              opacity: 1,
              duration: 0.33,
              stagger: 0.065,
              ease: "power2.out",
            },
            0.66
          );

          timeline.to(
            details,
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              stagger: 0.04,
              ease: "power2.out",
            },
            0.7
          );

          // Brief final hold before the real Works.
          timeline.to({}, { duration: 0.12 });

          // Actual reading progress of this timeline.
          timeline.to(
            progress,
            {
              scaleX: 1,
              duration: timeline.duration(),
              ease: "none",
            },
            0
          );
        }
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={styles.scene}>
      {/* EXISTING ABOUT SECTION */}
      <div
        ref={aboutAnchorRef}
        className={styles.aboutAnchor}
      >
        <div
          ref={aboutPaperRef}
          className={styles.aboutPaper}
        >
          {children}
        </div>
      </div>

      {/* NEW ABOUT → WORKS TRANSITION */}
      <section
        ref={transitionRef}
        className={styles.transition}
        aria-label="Selected Work introduction"
      >
        <div className={styles.stage}>
          {/* Closing cream page */}
          <div
            className={styles.cream}
            data-archive-cream
            aria-hidden="true"
          >
            <div className={styles.creamTop}>
              <span>01 / THE INTRODUCTION</span>
              <span>END OF CHAPTER</span>
            </div>

            <div className={styles.creamMiddle}>
              <span>THE NEXT PAGE</span>
              <strong>IS THE WORK.</strong>
            </div>

            <div className={styles.creamBottom}>
              <span>KEN CAMAGAY © 2026</span>
              <span>TURN THE PAGE ↓</span>
            </div>
          </div>

          {/* Incoming dark archive sheet */}
          <div
            className={styles.archive}
            data-archive-dark
          >
            <div className={styles.archiveContent}>
              <div
                className={styles.archiveTop}
                data-archive-detail
              >
                <span>02 / THE ARCHIVE</span>
                <span>SELECTED PROJECTS — 2026</span>
              </div>

              <div className={styles.archiveBody}>
                <div className={styles.archiveIdentity}>
                  <p
                    className={styles.archiveEyebrow}
                    data-archive-detail
                  >
                    DESIGN / DEVELOPMENT / EXPERIMENTS
                  </p>

                  <h2
                    className={styles.archiveHeading}
                    aria-label="Selected Work"
                  >
                    <span className={styles.wordMask}>
                      <span data-archive-word>
                        SELECTED
                      </span>
                    </span>

                    <span className={styles.wordMask}>
                      <span data-archive-word>
                        WORK<span className={styles.period}>.</span>
                      </span>
                    </span>
                  </h2>
                </div>

                <div className={styles.index}>
                  <div
                    className={styles.indexHeading}
                    data-archive-detail
                  >
                    <span>PROJECT INDEX</span>
                    <span>
                      {String(archiveProjects.length).padStart(
                        2,
                        "0"
                      )}{" "}
                      ENTRIES
                    </span>
                  </div>

                  {archiveProjects.map((project, index) => (
                    <div
                      key={`${project.title}-${index}`}
                      className={styles.indexRow}
                      data-archive-record
                    >
                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <strong>{project.title}</strong>
                    </div>
                  ))}

                  <p
                    className={styles.indexFoot}
                    data-archive-detail
                  >
                    REAL PROJECTS. REAL PROBLEMS.
                    <br />
                    MADE WITH INTENTION.
                  </p>
                </div>
              </div>

              <div
                className={styles.archiveBottom}
                data-archive-detail
              >
                <span>KEN CAMAGAY / PROJECT ARCHIVE</span>
                <span>SCROLL TO EXPLORE ↓</span>
              </div>
            </div>

            <div
              className={styles.progress}
              data-archive-progress
              aria-hidden="true"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
