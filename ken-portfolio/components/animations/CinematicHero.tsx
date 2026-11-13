
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight } from "lucide-react";

import KcScrollIntro from "./KcScrollIntro";
import styles from "./CinematicHero.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TRIGGER_ID = "kc-opening-sequence";

export default function CinematicHero() {
  const heroRef = useRef<HTMLElement>(null);

 
const skipIntro = () => {
  const trigger = ScrollTrigger.getById("kc-opening-sequence");

  if (!trigger || !trigger.animation) return;

  // Tell TypeScript this animation is a GSAP Timeline.
  const timeline = trigger.animation as gsap.core.Timeline;

  const heroTime = timeline.labels["hero-ready"];

  if (heroTime === undefined) return;

  const progress = heroTime / timeline.duration();

  window.scrollTo({
    top:
      trigger.start +
      (trigger.end - trigger.start) * progress,
    behavior: "smooth",
  });
};


  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          const find = (selector: string) =>
            hero.querySelector<HTMLElement>(selector);

          // ORIGINAL K/C INTRO ELEMENTS
          const intro = find("[data-kc-intro]");
          const logo = find("[data-kc-logo]");
          const letterK = find('[data-part="k"]');
          const slash = find('[data-part="slash"]');
          const letterC = find('[data-part="c"]');

          const portal = find("[data-kc-portal]");
          const reveal = find("[data-kc-reveal]");

          const header = find("[data-kc-header]");
          const introFooter = find("[data-kc-footer]");
          const side = find("[data-kc-side]");
          const progressLine = find("[data-kc-progress]");

          // HERO ELEMENTS
          const first = find("[data-name-first]");
          const last = find("[data-name-last]");
          const poster = find("[data-hero-poster]");
          const kicker = find("[data-hero-kicker]");

          const description = find(
            "[data-hero-description]"
          );

          const heroFooter = find("[data-hero-bottom]");

          // EXISTING LOOK CLOSER PAGE
          const wipe = find("[data-hero-wipe]");
          const wipeText = find(
            "[data-hero-wipe-text]"
          );

          if (
            !intro ||
            !logo ||
            !letterK ||
            !slash ||
            !letterC ||
            !portal ||
            !reveal ||
            !header ||
            !introFooter ||
            !side ||
            !progressLine ||
            !first ||
            !last ||
            !poster ||
            !kicker ||
            !description ||
            !heroFooter ||
            !wipe ||
            !wipeText
          ) {
            return;
          }

          const getNavHeight = () => {
            const nav =
              document.querySelector<HTMLElement>(
                ".topnav"
              );

            const cssHeight = Number.parseFloat(
              getComputedStyle(
                document.documentElement
              ).getPropertyValue(
                "--site-nav-height"
              )
            );

            return Math.round(
              nav?.getBoundingClientRect().height ||
                cssHeight ||
                76
            );
          };

          // =====================================
          // INITIAL STATES
          // =====================================

          // K/C starts in its original appearance.
          gsap.set(intro, {
            autoAlpha: 1,
          });

          gsap.set(logo, {
            transformPerspective: 1400,
            transformOrigin: "50% 50%",
            force3D: true,
          });

          gsap.set([letterK, letterC, slash], {
            x: 0,
            y: 0,
            rotation: 0,
            rotationY: 0,
            opacity: 1,
          });

          gsap.set(portal, {
            xPercent: -50,
            yPercent: -50,
            scaleX: 0.001,
            scaleY: 0.9,
            transformOrigin: "center center",
            force3D: true,
          });

          gsap.set(reveal, {
            y: 35,
            autoAlpha: 0,
          });

          gsap.set(
            [header, introFooter, side],
            { autoAlpha: 1 }
          );

          gsap.set(progressLine, {
            scaleX: 0,
            transformOrigin: "left center",
          });

          // Hero begins behind the intro.
          gsap.set([first, last], {
            yPercent: 105,
            autoAlpha: 0,
            transformPerspective: 1400,
            force3D: true,
          });

          gsap.set(poster, {
            y: 75,
            rotation: 6,
            autoAlpha: 0,
            transformPerspective: 1400,
            force3D: true,
          });

          gsap.set(kicker, {
            y: 25,
            autoAlpha: 0,
          });

          gsap.set(description, {
            y: 40,
            autoAlpha: 0,
          });

          gsap.set(heroFooter, {
            y: 20,
            autoAlpha: 0,
          });

          // LOOK CLOSER stays below the screen.
          gsap.set(wipe, {
            yPercent: 101,
            rotationX: -9,
            transformPerspective: 1500,
            transformOrigin: "50% 100%",
            autoAlpha: 1,
            force3D: true,
          });

          gsap.set(wipeText, {
            yPercent: 115,
            autoAlpha: 0,
          });

          // =====================================
          // ONE STATIONARY TIMELINE
          // =====================================

          const timeline = gsap.timeline({
            defaults: { ease: "none" },

            scrollTrigger: {
              id: TRIGGER_ID,
              trigger: hero,

              start: () =>
                `top ${getNavHeight()}px`,

              end: () =>
                `+=${Math.round(
                  Math.max(
                    600,
                    window.innerHeight - getNavHeight()
                  ) * 1.65
                )}`,

              pin: true,
              pinSpacing: true,
              scrub: 0.2,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // =====================================
          // CHAPTER 1 — THE MONOGRAM
          // =====================================

          timeline.to({}, { duration: 0.13 });

          // Rotate the original CSS 3D monogram.
          timeline.to(
            logo,
            {
              rotationY: -38,
              rotationX: 17,
              z: 180,
              scale: 1.12,
              duration: 0.47,
              ease: "power2.inOut",
            },
            0.13
          );

          // K and C separate in perspective.
          timeline.to(
            letterK,
            {
              xPercent: -58,
              rotationY: -20,
              z: 70,
              duration: 0.52,
              ease: "power3.inOut",
            },
            0.35
          );

          timeline.to(
            letterC,
            {
              xPercent: 58,
              rotationY: 20,
              z: 70,
              duration: 0.52,
              ease: "power3.inOut",
            },
            0.35
          );

          timeline.to(
            slash,
            {
              rotationZ: 72,
              scaleY: 1.18,
              autoAlpha: 0,
              duration: 0.34,
            },
            0.38
          );

          // Dark doorway emerges in the middle.
          timeline.to(
            portal,
            {
              scaleX: 1,
              scaleY: 1,
              duration: 0.45,
              ease: "power3.inOut",
            },
            0.42
          );

          timeline.to(
            reveal,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.29,
              ease: "power2.out",
            },
            0.56
          );

          // =====================================
          // CHAPTER 2 — ENTER THE PORTAL
          // =====================================

          timeline.to(
            logo,
            {
              rotationY: -78,
              rotationX: 24,
              z: -650,
              scale: 0.4,
              autoAlpha: 0,
              duration: 0.48,
              ease: "power3.in",
            },
            0.83
          );

          timeline.to(
            reveal,
            {
              y: -30,
              autoAlpha: 0,
              duration: 0.25,
            },
            0.88
          );

          timeline.to(
            [header, introFooter, side],
            {
              autoAlpha: 0,
              duration: 0.22,
            },
            0.9
          );

          // The doorway fills the screen.
          timeline.to(
            portal,
            {
              scaleX: () =>
                (window.innerWidth /
                  Math.max(portal.offsetWidth, 1)) * 1.65,

              scaleY: () =>
                (window.innerHeight /
                  Math.max(portal.offsetHeight, 1)) * 1.65,

              duration: 0.52,
              ease: "power3.inOut",
            },
            0.86
          );

          // =====================================
          // CHAPTER 3 — HERO EMERGES
          // =====================================

          // The Hero is behind the opening,
          // so we dissolve only the front layer.
          timeline.to(
            intro,
            {
              autoAlpha: 0,
              duration: 0.31,
              ease: "power2.inOut",
            },
            1.14
          );

          timeline.to(
            kicker,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.35,
              ease: "power3.out",
            },
            1.22
          );

          timeline.to(
            [first, last],
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.57,
              stagger: 0.08,
              ease: "power4.out",
            },
            1.23
          );

          timeline.to(
            poster,
            {
              y: 0,
              rotation: 0,
              autoAlpha: 1,
              duration: 0.58,
              ease: "power3.out",
            },
            1.29
          );

          timeline.to(
            description,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.4,
              ease: "power3.out",
            },
            1.46
          );

          timeline.to(
            heroFooter,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.36,
              ease: "power3.out",
            },
            1.5
          );

          timeline.addLabel("hero-ready", 1.89);

          // Moment to appreciate the actual Hero.
          timeline.to({}, { duration: 0.28 }, 1.89);

          // =====================================
          // CHAPTER 4 — EXISTING HERO EXIT
          // =====================================

          const exitAt = 2.17;

          timeline.to(
            kicker,
            {
              x: -60,
              autoAlpha: 0,
              duration: 0.4,
            },
            exitAt
          );

          timeline.to(
            first,
            {
              xPercent: -27,
              yPercent: -10,
              rotationY: -27,
              rotationX: 8,
              z: -280,
              autoAlpha: 0,
              duration: 0.65,
              ease: "power2.inOut",
            },
            exitAt + 0.03
          );

          timeline.to(
            last,
            {
              xPercent: 24,
              yPercent: 12,
              rotationY: 24,
              z: -310,
              autoAlpha: 0,
              duration: 0.68,
              ease: "power2.inOut",
            },
            exitAt + 0.06
          );

          timeline.to(
            poster,
            {
              rotationY: -68,
              rotationZ: -12,
              xPercent: 42,
              z: -220,
              autoAlpha: 0,
              duration: 0.7,
              ease: "power3.inOut",
            },
            exitAt + 0.04
          );

          timeline.to(
            [description, heroFooter],
            {
              y: 38,
              autoAlpha: 0,
              duration: 0.42,
            },
            exitAt + 0.08
          );

          // =====================================
          // CHAPTER 5 — LOOK CLOSER
          // =====================================

          timeline.to(
            wipe,
            {
              yPercent: 0,
              rotationX: 0,
              duration: 0.64,
              ease: "power3.inOut",
            },
            exitAt + 0.36
          );

          timeline.to(
            wipeText,
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.38,
              ease: "power3.out",
            },
            exitAt + 0.73
          );

          timeline.to(
            progressLine,
            {
              scaleX: 1,
              duration: 1.45,
            },
            0
          );

          timeline.to(
            {},
            { duration: 0.14 },
            exitAt + 1.13
          );

          return () => timeline.kill();
        }
      );

      return () => mm.revert();
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      id="home"
      className={styles.hero}
      aria-label="Ken Camagay portfolio opening"
    >
      {/* THE EXISTING HERO */}
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.identity}>
            <p
              className={styles.kicker}
              data-hero-kicker
            >
              DESIGN × DEVELOPMENT
              <span className={styles.kickerLine} />
              001
            </p>

            <h1
              className={styles.name}
              aria-label="Ken Camagay"
            >
              <span className={styles.nameMask}>
                <span
                  className={styles.nameFirst}
                  data-name-first
                  aria-hidden="true"
                >
                  <span>KEN</span>
                </span>
              </span>

              <span className={styles.nameMask}>
                <span
                  className={styles.nameLast}
                  data-name-last
                  aria-hidden="true"
                >
                  <span>
                    CAMAGAY
                    <span className={styles.period}>
                      .
                    </span>
                  </span>
                </span>
              </span>
            </h1>

            <div
              className={styles.description}
              data-hero-description
            >
              <span className={styles.descriptionIndex}>
                01 / THE PERSON
              </span>

              <p>
                Hey, I&apos;m Ken. I build useful
                digital things with an eye for
                how they look, work, and feel.
              </p>
            </div>
          </div>

          <aside
            className={styles.poster}
            data-hero-poster
            aria-label="Design, code, and detail"
          >
            <div className={styles.posterTop}>
              <span>K—C / 001</span>
              <span>EST. / 2026</span>
            </div>

            <div className={styles.posterCenter}>
              <span className={styles.posterSmall}>
                A PERSONAL PRACTICE IN
              </span>

              <div className={styles.posterGlyph}>
                K<span>/</span>C
              </div>

              <div className={styles.posterStatement}>
                DESIGN.
                <br />
                CODE.
                <br />
                DETAIL.
              </div>
            </div>

            <div className={styles.posterBottom}>
              <span>MADE TO BE USED.</span>
              <span>NOT JUST SEEN. ↗</span>
            </div>

            <div
              className={styles.posterMark}
              aria-hidden="true"
            />
          </aside>
        </div>

        <footer
          className={styles.bottom}
          data-hero-bottom
        >
          <a
            href="#work"
            className={styles.explore}
          >
            <span>EXPLORE SELECTED WORK</span>
            <ArrowDownRight size={21} />
          </a>

          <span className={styles.scrollHint}>
            SCROLL TO EXPLORE
          </span>

          <span className={styles.pageCount}>
            01 — 04
          </span>
        </footer>
      </div>

      {/* EXISTING LOOK CLOSER TRANSITION */}
      <div
        className={styles.pageWipe}
        data-hero-wipe
        aria-hidden="true"
      >
        <div className={styles.wipeHeader}>
          <span>01 / THE INTRODUCTION</span>
          <span>KEN CAMAGAY © 2026</span>
        </div>

        <div className={styles.wipeMask}>
          <div
            className={styles.wipeTitle}
            data-hero-wipe-text
          >
            LOOK
            <br />
            CLOSER<span>.</span>
          </div>
        </div>

        <div className={styles.wipeFooter}>
          <span>THE PERSON BEHIND THE WORK</span>
          <span>CONTINUE ↓</span>
        </div>
      </div>

      {/* ORIGINAL K/C INTRO — NOW AN OVERLAY */}
      <KcScrollIntro onSkip={skipIntro} />
    </section>
  );
}
