
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./WorkExpertiseBridge.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WorkExpertiseBridge() {
  const [work, setWork] = useState<HTMLElement | null>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWork(document.getElementById("work"));
  }, []);

  useGSAP(
    () => {
      const bridge = bridgeRef.current;
      if (!work || !bridge) return;

      const sheet = bridge.querySelector<HTMLElement>(
        "[data-bridge-sheet]"
      );

      const eyebrow = bridge.querySelector<HTMLElement>(
        "[data-bridge-eyebrow]"
      );

      const title = bridge.querySelector<HTMLElement>(
        "[data-bridge-title]"
      );

      const details = gsap.utils.toArray<HTMLElement>(
        "[data-bridge-detail]",
        bridge
      );

      const line = bridge.querySelector<HTMLElement>(
        "[data-bridge-line]"
      );

      if (!sheet || !eyebrow || !title || !line) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          const animation = gsap.timeline({
            paused: true,
            defaults: { ease: "none" },
          });

          // A technical page opens over the final project.
          animation.fromTo(
            sheet,
            {
              yPercent: 105,
              rotationX: -12,
              rotationZ: 3,
              clipPath:
                "polygon(0 12%, 100% 0, 100% 100%, 0 100%)",
            },
            {
              yPercent: 0,
              rotationX: 0,
              rotationZ: 0,
              clipPath:
                "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              duration: 0.72,
              ease: "power3.inOut",
              immediateRender: false,
            },
            0
          );

          animation.fromTo(
            eyebrow,
            { y: 25, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.3,
              ease: "power2.out",
              immediateRender: false,
            },
            0.37
          );

          animation.fromTo(
            title,
            {
              yPercent: 120,
              rotationX: -18,
              autoAlpha: 0,
            },
            {
              yPercent: 0,
              rotationX: 0,
              autoAlpha: 1,
              duration: 0.39,
              ease: "power3.out",
              immediateRender: false,
            },
            0.42
          );

          animation.fromTo(
            details,
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              stagger: 0.065,
              duration: 0.28,
              ease: "power2.out",
              immediateRender: false,
            },
            0.61
          );

          animation.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.32,
              immediateRender: false,
            },
            0.58
          );

          animation.to({}, { duration: 0.12 }, 0.88);

          // Read progress from the EXISTING Works pin.
          // No new pin, spacer, or extra scroll distance.
          const START_AT = 0.84;
          let previous = -1;

          const update = () => {
            const pinnedTrigger = ScrollTrigger.getAll()
              .filter(
                (trigger) =>
                  trigger.trigger === work &&
                  Boolean(trigger.pin)
              )
              .sort(
                (a, b) =>
                  (b.end - b.start) - (a.end - a.start)
              )[0];

            if (!pinnedTrigger) {
              if (previous !== 0) {
                animation.progress(0);
                previous = 0;
              }
              return;
            }

            const progress = gsap.utils.clamp(
              0,
              1,
              (pinnedTrigger.progress - START_AT) /
                (1 - START_AT)
            );

            if (Math.abs(progress - previous) > 0.0005) {
              animation.progress(progress);
              previous = progress;
            }
          };

          gsap.ticker.add(update);
          update();

          return () => {
            gsap.ticker.remove(update);
            animation.kill();
          };
        }
      );

      return () => mm.revert();
    },
    {
      dependencies: [work],
      revertOnUpdate: true,
    }
  );

  if (!work) return null;

  return createPortal(
    <div
      ref={bridgeRef}
      className={styles.bridge}
      aria-hidden="true"
    >
      <div
        className={styles.sheet}
        data-bridge-sheet
      >
        <div className={styles.top}>
          <span>03 / THE WORKING INDEX</span>
          <span>WHAT GOES INTO THE WORK</span>
        </div>

        <div className={styles.body}>
          <div className={styles.intro}>
            <span
              className={styles.eyebrow}
              data-bridge-eyebrow
            >
              THE PROCESS BEHIND THE PROJECTS
            </span>

            <div className={styles.titleMask}>
              <h2
                className={styles.title}
                data-bridge-title
              >
                BEHIND
                <br />
                THE <em>WORK.</em>
              </h2>
            </div>
          </div>

          <div className={styles.disciplines}>
            {[
              ["01", "DESIGN"],
              ["02", "DEVELOP"],
              ["03", "DEPLOY"],
            ].map(([number, label]) => (
              <div
                key={number}
                className={styles.discipline}
                data-bridge-detail
              >
                <span>{number}</span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <span data-bridge-detail>
            FROM PROJECTS TO PRACTICE
          </span>

          <span data-bridge-detail>
            EXPLORE MY CAPABILITIES ↓
          </span>
        </div>

        <div className={styles.line} data-bridge-line />
      </div>
    </div>,
    work
  );
}
