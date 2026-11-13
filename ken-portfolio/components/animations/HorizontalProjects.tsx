
"use client";

import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const colors = [
  "#8954ff",
  "#ff62b4",
  "#b5f46c",
  "#ff8858",
  "#79baff",
];

const featured = projects.flatMap((project) => {
  if (project.title.toLowerCase() === "dagudorms") {
    return [];
  }

  const coverImage = project.images?.[0];

  return coverImage
    ? [{ ...project, coverImage }]
    : [];
});

type FeaturedProject = (typeof featured)[number];

function ProjectPanel({
  project,
  index,
}: {
  project: FeaturedProject;
  index: number;
}) {
  return (
    <article
      className={`signal-panel ${
        index === 0 ? "signal-first" : ""
      }`}
      style={
        {
          "--accent": colors[index % colors.length],
        } as CSSProperties
      }
    >
      <div className="signal-ambient" />

      <div className="signal-watermark">
        {String(index + 1).padStart(2, "0")}
      </div>

      <h2
        className="signal-title"
        aria-label={project.title}
      >
        {Array.from(project.title).map((letter, j) => (
          <span
            className="signal-letter"
            aria-hidden="true"
            key={`${j}-${letter}`}
          >
            {letter === " " ? "\u00a0" : letter}
          </span>
        ))}
      </h2>

      {/* Single complete screenshot — no strips */}
      <div className="signal-preview">
        <div className="signal-browser-top">
          <span>● ● ●</span>
          <span>{project.title}</span>
          <span>↗</span>
        </div>

        <div className="signal-image">
          <Image
            src={project.coverImage}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 900px) 90vw, 54vw"
            className="signal-portal-img"
            priority={index === 0}
          />

          <div
            className="signal-portal-ring"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="signal-details">
        <div className="signal-copy">
          <span className="signal-category">
            {project.tag}
          </span>

          <h3>{project.title}</h3>
          <p>{project.description}</p>

          <div className="signal-tech">
            {project.tech.slice(0, 4).map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>

        {(project.live || project.repo) && (
          <a
            className="signal-link"
            href={project.live || project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title}`}
          >
            <ArrowUpRight size={25} />
          </a>
        )}
      </div>
    </article>
  );
}

export default function HorizontalProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          const panels = gsap.utils.toArray<HTMLElement>(
            ".signal-panel",
            section
          );

          const count = panels.length;
          if (!count) return;

          const parts = panels.map((panel) => ({
            preview: panel.querySelector<HTMLElement>(
              ".signal-preview"
            )!,
            image: panel.querySelector<HTMLElement>(
              ".signal-portal-img"
            )!,
            ring: panel.querySelector<HTMLElement>(
              ".signal-portal-ring"
            )!,
            letters: gsap.utils.toArray<HTMLElement>(
              ".signal-letter",
              panel
            ),
            copy: gsap.utils.toArray<HTMLElement>(
              ".signal-category, .signal-copy h3, .signal-copy p, .signal-tech span, .signal-link",
              panel
            ),
            watermark: panel.querySelector<HTMLElement>(
              ".signal-watermark"
            )!,
            ambient: panel.querySelector<HTMLElement>(
              ".signal-ambient"
            )!,
          }));

          // Transparent panels, no visibility switching.
          // All animation states are initialized once.
          panels.forEach((panel, index) => {
            const p = parts[index];
            const first = index === 0;

            gsap.set(panel, {
              autoAlpha: 1,
              zIndex: index + 1,
              pointerEvents: first ? "auto" : "none",
              background: "transparent",
            });

            gsap.set(p.preview, {
              clipPath: first
                ? "circle(150% at 50% 50%)"
                : "circle(0% at 50% 50%)",
              xPercent: first ? 0 : 12,
              yPercent: first ? 0 : 10,
              scale: first ? 1 : 0.72,
              rotation: first ? -4 : 9,
              rotationY: first ? 0 : 24,
              transformPerspective: 1400,
              transformOrigin: "center center",
              opacity: 1,
            });

            gsap.set(p.image, {
              scale: first ? 1 : 1.18,
              filter: first
                ? "blur(0px)"
                : "blur(9px)",
            });

            gsap.set(p.ring, {
              autoAlpha: 0,
              scale: 0.2,
            });

            gsap.set(p.letters, {
              yPercent: first
                ? 0
                : (j: number) =>
                    j % 2 ? -145 : 145,
              rotation: first
                ? 0
                : (j: number) =>
                    j % 2 ? -12 : 12,
              opacity: first ? 1 : 0,
            });

            gsap.set(p.copy, {
              y: first ? 0 : 65,
              opacity: first ? 1 : 0,
            });

            gsap.set(p.watermark, {
              xPercent: first ? 0 : 18,
              opacity: first ? 0.1 : 0,
            });

            gsap.set(p.ambient, {
              opacity: first ? 1 : 0,
            });
          });

          if (count === 1) return;

          const INTRO = 0.45;
          const STEP = 2.45;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () =>
                `+=${Math.round(
                  window.innerHeight *
                    (count - 1) *
                    2.5
                )}`,
              pin: true,
              scrub: 0.75,
              anticipatePin: 1,
              invalidateOnRefresh: true,

              onUpdate: (self) => {
                const t =
                  self.animation?.time() ?? 0;

                const index = Math.min(
                  count - 1,
                  Math.max(
                    0,
                    Math.floor(
                      (t - INTRO - 0.75) / STEP
                    ) + 1
                  )
                );

                setActive((prev) =>
                  prev === index ? prev : index
                );

                panels.forEach((panel, i) => {
                  panel.style.pointerEvents =
                    i === index ? "auto" : "none";
                });
              },
            },
          });

          timeline.to({}, { duration: INTRO });

          for (let i = 1; i < count; i++) {
            const out = parts[i - 1];
            const next = parts[i];

            const at =
              INTRO + (i - 1) * STEP;

            // EXIT: dimensional portal collapse
            timeline.to(
              out.preview,
              {
                clipPath:
                  "circle(0% at 50% 50%)",
                xPercent: -12,
                yPercent: -9,
                rotation: -15,
                rotationY: -25,
                scale: 0.64,
                duration: 1.1,
                ease: "power2.inOut",
              },
              at
            );

            timeline.to(
              out.image,
              {
                scale: 1.14,
                filter: "blur(8px)",
                duration: 1.05,
                ease: "power2.inOut",
              },
              at
            );

            // ENTRY: new project expands out
            timeline.to(
              next.preview,
              {
                clipPath:
                  "circle(150% at 50% 50%)",
                xPercent: 0,
                yPercent: 0,
                rotation: -4,
                rotationY: 0,
                scale: 1,
                duration: 1.32,
                ease: "power3.out",
              },
              at + 0.22
            );

            timeline.to(
              next.image,
              {
                scale: 1,
                filter: "blur(0px)",
                duration: 1.32,
                ease: "power2.out",
              },
              at + 0.22
            );

            // Electric circular pulse
            timeline.fromTo(
              next.ring,
              {
                autoAlpha: 0,
                scale: 0.2,
              },
              {
                autoAlpha: 0.85,
                scale: 1.2,
                duration: 0.45,
                immediateRender: false,
              },
              at + 0.27
            );

            timeline.to(
              next.ring,
              {
                autoAlpha: 0,
                scale: 5,
                duration: 0.9,
                ease: "power2.out",
              },
              at + 0.7
            );

            // Text exit: keep the kinetic style
            timeline.to(
              out.letters,
              {
                yPercent: (j: number) =>
                  j % 2 ? 180 : -180,
                rotation: (j: number) =>
                  j % 2 ? 22 : -22,
                opacity: 0,
                stagger: 0.025,
                duration: 0.65,
                ease: "power3.in",
              },
              at
            );

            timeline.to(
              out.copy,
              {
                y: -70,
                opacity: 0,
                duration: 0.48,
                stagger: 0.035,
                ease: "power2.in",
              },
              at + 0.08
            );

            timeline.to(
              out.watermark,
              {
                xPercent: -20,
                opacity: 0,
                duration: 0.85,
              },
              at
            );

            timeline.to(
              out.ambient,
              {
                opacity: 0,
                duration: 0.85,
              },
              at
            );

            // Text entrance: staggered letters
            timeline.to(
              next.letters,
              {
                yPercent: 0,
                rotation: 0,
                opacity: 1,
                duration: 0.8,
                stagger: {
                  each: 0.035,
                  from: "random",
                },
                ease: "back.out(1.7)",
              },
              at + 0.48
            );

            timeline.to(
              next.copy,
              {
                y: 0,
                opacity: 1,
                duration: 0.65,
                stagger: 0.07,
                ease: "power3.out",
              },
              at + 0.73
            );

            timeline.to(
              next.watermark,
              {
                xPercent: 0,
                opacity: 0.1,
                duration: 1,
              },
              at + 0.25
            );

            timeline.to(
              next.ambient,
              {
                opacity: 1,
                duration: 1,
              },
              at + 0.25
            );

            // Rest between projects
            timeline.to(
              {},
              {
                duration: STEP - 1.7,
              },
              at + 1.7
            );
          }

          // Final project remains visible
          timeline.to(
            {},
            { duration: 0.95 },
            INTRO + (count - 1) * STEP
          );

          return () => timeline.kill();
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="signal-work"
    >
      <div className="signal-top">
        <span>02 / SELECTED WORK</span>
        <span>SCROLL TO SWITCH WORLDS ↓</span>
      </div>

      <div className="signal-stage">
        {featured.map((project, index) => (
          <ProjectPanel
            key={`${project.title}-${index}`}
            project={project}
            index={index}
          />
        ))}
      </div>

      <div className="signal-bottom">
        <div className="signal-counter">
          <strong>
            {String(active + 1).padStart(2, "0")}
          </strong>
          <span>
            / {String(featured.length).padStart(2, "0")}
          </span>
        </div>

        <div className="signal-progress">
          <div
            style={{
              transform: `scaleX(${
                featured.length > 1
                  ? active / (featured.length - 1)
                  : 1
              })`,
            }}
          />
        </div>

        <span className="signal-footer-label">
          KEN CAMAGAY — PROJECT ARCHIVE
        </span>
      </div>
    </section>
  );
}
