
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          // Coordinated section entrance
          const entrance = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          });

          entrance
            .from(".abt2-eyebrow", {
              y: 18,
              opacity: 0,
              duration: 0.65,
            })
            .from(
              ".abt2-line > span",
              {
                yPercent: 115,
                rotation: 2,
                duration: 1.05,
                stagger: 0.13,
                ease: "power4.out",
              },
              "-=0.3"
            )
            .from(
              ".abt2-right",
              {
                y: 35,
                opacity: 0,
                duration: 0.9,
              },
              "-=0.65"
            )
            .from(
              ".abt2-footer",
              {
                y: 15,
                opacity: 0,
                duration: 0.65,
              },
              "-=0.45"
            );

          // The violet symbol responds to scrolling
          gsap.to(".abt2-star", {
            rotation: 110,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });

          // Small progress detail
          gsap.fromTo(
            ".abt2-meter-fill",
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                end: "bottom 50%",
                scrub: true,
              },
            }
          );
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="abt2"
    >
      <div className="abt2-top">
        <span>01 / THE INTRODUCTION</span>
        <span>ABOUT ME ↗</span>
      </div>

      <div className="abt2-grid">
        <div className="abt2-left">
          <p className="abt2-eyebrow">
            A LITTLE ABOUT ME
          </p>

          <h2 className="abt2-headline">
            <span className="abt2-line">
              <span>NOT JUST</span>
            </span>

            <span className="abt2-line abt2-outline">
              <span>CODE.</span>
            </span>

            <span className="abt2-line abt2-violet">
              <span>CURIOSITY.</span>
            </span>
          </h2>

          <div className="abt2-caption">
            <span className="abt2-caption-dot" />
            ALWAYS EXPLORING WHAT&apos;S NEXT.
          </div>
        </div>

        <div className="abt2-right">
          <div className="abt2-symbol">
            <span
              className="abt2-star"
              aria-hidden="true"
            >
              ✳
            </span>

            <span>DESIGN × DEVELOPMENT</span>
          </div>

          <p className="abt2-lead">
            I&apos;m Ken — a developer who cares
            as much about{" "}
            <em>how something feels</em> as
            how it works.
          </p>

          <p className="abt2-description">
            I build responsive web applications,
            intuitive interfaces, and practical
            full-stack solutions. I love turning
            complex ideas into experiences that
            feel effortless.
          </p>

          <a
            href="#contact"
            className="abt2-link"
          >
            <span>LET&apos;S BUILD SOMETHING</span>
            <ArrowUpRight size={20} />
          </a>
        </div>
      </div>

      <div className="abt2-footer">
        <span>THINK → BUILD → REFINE</span>

        <div className="abt2-meter">
          <div className="abt2-meter-fill" />
        </div>

        <a href="#work">
          NEXT / SELECTED WORK ↓
        </a>
      </div>
    </section>
  );
}
