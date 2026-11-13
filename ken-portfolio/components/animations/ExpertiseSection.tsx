
"use client";

import {
  useRef,
  useState,
  type TransitionEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Plus } from "lucide-react";
import styles from "./ExpertiseSection.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const capabilities = [
  {
    id: "01",
    title: "FRONTEND",
    subtitle: "Interfaces & experiences",
    short: "The parts people see, use, and remember.",
    overview:
      "Building responsive interfaces that balance visual character with everyday usability.",
    focus: [
      "Responsive web applications",
      "Reusable component architecture",
      "Scroll-driven interactions",
      "Accessible navigation and forms",
      "Performance-conscious interfaces",
    ],
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "CSS",
      "GSAP",
      "Motion",
    ],
    projects: [
      {
        name: "KEN PORTFOLIO",
        note: "Interactive web portfolio",
        url: "https://github.com/KenCamagay/ken_portfolio",
      },
      {
        name: "MY PORTFOLIO",
        note: "Next.js portfolio project",
        url: "https://github.com/KenCamagay/my_portfolio",
      },
    ],
  },
  {
    id: "02",
    title: "BACKEND",
    subtitle: "APIs & application logic",
    short: "What makes an interface actually work.",
    overview:
      "Developing the services, authentication flows, and business logic behind real applications.",
    focus: [
      "REST API development",
      "Authentication and authorization",
      "Application routing",
      "CRUD operations",
      "Business logic and validation",
      "Error handling",
    ],
    tools: [
      "PHP",
      "Laravel",
      "REST APIs",
      "JWT",
      "Node.js",
      "Express.js",
      "FastAPI",
      "Composer",
    ],
    projects: [
      {
        name: "LADON WEBSERVICE",
        note: "PHP APIs and authentication",
        url: "https://github.com/KenCamagay/Ladon-Webservice",
      },
      {
        name: "PD-LALAS",
        note: "Laravel pharmacy system",
        url: "https://github.com/KenCamagay/PD_LALAS",
      },
    ],
  },
  {
    id: "03",
    title: "MOBILE",
    subtitle: "Applications beyond the browser",
    short: "Practical experiences built for smaller screens.",
    overview:
      "Exploring mobile applications with camera interaction, approachable interfaces, and accessibility in mind.",
    focus: [
      "Cross-platform application interfaces",
      "Camera-based user workflows",
      "Mobile-first navigation",
      "Touch-friendly interactions",
      "Accessibility-oriented experiences",
    ],
    tools: [
      "React Native",
      "Expo",
      "Android",
      "JavaScript",
      "TypeScript",
      "Camera APIs",
    ],
    projects: [
      {
        name: "SIGNSIGHT",
        note: "Mobile sign-language application",
        url: "https://github.com/KenCamagay",
      },
    ],
  },
  {
    id: "04",
    title: "COMPUTER VISION",
    subtitle: "Camera input & recognition",
    short: "Turning visual input into useful interaction.",
    overview:
      "Working with camera-driven applications and real-time recognition features for more accessible digital tools.",
    focus: [
      "Live camera-based recognition",
      "Sign-language letter translation",
      "Word translation workflows",
      "Visual feedback and prediction display",
      "Accessible learning experiences",
    ],
    tools: [
      "Computer Vision",
      "Machine Learning",
      "Camera Input",
      "Real-time Recognition",
      "Prediction Interfaces",
      "Accessibility",
    ],
    projects: [
      {
        name: "SIGNSIGHT",
        note: "ASL recognition project overview",
        url: "https://github.com/KenCamagay",
      },
    ],
  },
  {
    id: "05",
    title: "DATA & SYSTEMS",
    subtitle: "Information that stays organized",
    short: "From transactions to dashboards and reports.",
    overview:
      "Designing data-backed workflows for inventory, transactions, administration, and everyday operations.",
    focus: [
      "Relational database integration",
      "Inventory and stock monitoring",
      "Sales and transaction records",
      "Dashboard reporting",
      "Role-based access workflows",
      "Application deployment",
    ],
    tools: [
      "MySQL",
      "SQL",
      "Chart.js",
      "AJAX",
      "Laravel",
      "Railway",
      "Database Migrations",
    ],
    projects: [
      {
        name: "PD-LALAS",
        note: "Sales, inventory, and reporting",
        url: "https://github.com/KenCamagay/PD_LALAS",
      },
      {
        name: "LADON WEBSERVICE",
        note: "Persistent data and API routes",
        url: "https://github.com/KenCamagay/Ladon-Webservice",
      },
    ],
  },
  {
    id: "06",
    title: "DESIGN & MOTION",
    subtitle: "Interface thinking",
    short: "The details that make software feel considered.",
    overview:
      "Combining typography, layout, interaction, and animation to make interfaces both distinctive and understandable.",
    focus: [
      "Responsive layout systems",
      "Visual hierarchy and typography",
      "Interactive states and feedback",
      "Scroll-based motion",
      "Motion accessibility",
      "Interface refinement",
    ],
    tools: [
      "CSS",
      "Tailwind CSS",
      "GSAP",
      "ScrollTrigger",
      "Motion",
      "Responsive Design",
      "Accessibility",
    ],
    projects: [
      {
        name: "KEN PORTFOLIO",
        note: "Interface and motion experiments",
        url: "https://github.com/KenCamagay/ken_portfolio",
      },
      {
        name: "MY PORTFOLIO",
        note: "Interface design and implementation",
        url: "https://github.com/KenCamagay/my_portfolio",
      },
    ],
  },
];

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const refreshAfterExpansion = (
    event: TransitionEvent<HTMLDivElement>
  ) => {
    if (
      event.target === event.currentTarget &&
      event.propertyName === "grid-template-rows"
    ) {
      ScrollTrigger.refresh();
    }
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const heading = section.querySelectorAll<HTMLElement>(
            "[data-index-heading]"
          );

          gsap.fromTo(
            heading,
            {
              yPercent: 105,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.05,
              stagger: 0.11,
              ease: "power4.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true,
              },
            }
          );
        }
      );

      // Desktop: three phases — enter, hold, exit.
      // The same timeline runs backward when reverse-scrolling.
      mm.add(
        "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
        () => {
          const rows = gsap.utils.toArray<HTMLElement>(
            "[data-index-row]",
            section
          );

          rows.forEach((row) => {
            const shell = row.querySelector<HTMLElement>(
              "[data-index-shell]"
            );

            if (!shell) return;

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: row,
                  start: "top 95%",
                  end: "bottom 5%",
                  scrub: 0.65,
                  invalidateOnRefresh: true,
                },
              })
              .fromTo(
                shell,
                {
                  y: 48,
                  rotationX: -7,
                  opacity: 0,
                },
                {
                  y: 0,
                  rotationX: 0,
                  opacity: 1,
                  duration: 0.23,
                  ease: "power2.out",
                }
              )
              .to({}, { duration: 0.54 })
              .to(shell, {
                y: -32,
                rotationX: 5,
                opacity: 0,
                duration: 0.23,
                ease: "power2.in",
              });
          });
        }
      );

      // Smaller screens: same concept, less movement.
      mm.add(
        "(max-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const rows = gsap.utils.toArray<HTMLElement>(
            "[data-index-row]",
            section
          );

          rows.forEach((row) => {
            const shell = row.querySelector<HTMLElement>(
              "[data-index-shell]"
            );

            if (!shell) return;

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: row,
                  start: "top 98%",
                  end: "bottom 2%",
                  scrub: 0.4,
                  invalidateOnRefresh: true,
                },
              })
              .fromTo(
                shell,
                { y: 20, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.2,
                  ease: "none",
                }
              )
              .to({}, { duration: 0.6 })
              .to(shell, {
                y: -15,
                opacity: 0,
                duration: 0.2,
                ease: "none",
              });
          });
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className={styles.section}
    >
      <div className={styles.container}>
        <div className={styles.topline}>
          <span>03 / THE WORKING INDEX</span>
          <span>KEN CAMAGAY — SELECTED CAPABILITIES</span>
        </div>

        <div className={styles.layout}>
          <aside className={styles.intro}>
            <p className={styles.eyebrow}>
              TOOLS, METHODS & PRACTICE
            </p>

            <h2 className={styles.heading}>
              <span className={styles.headingMask}>
                <span data-index-heading>
                  HOW I
                </span>
              </span>
              <span className={styles.headingMask}>
                <span data-index-heading>
                  BUILD<span className={styles.dot}>.</span>
                </span>
              </span>
            </h2>

            <p className={styles.introDescription}>
              Not just a collection of technology names.
              Here's what I work with, what I build,
              and where those skills show up.
            </p>

            <div className={styles.introFoot}>
              <span className={styles.marker} />
              SIX AREAS / ONE PRACTICE
            </div>
          </aside>

          <div className={styles.records}>
            {capabilities.map((item) => {
              const expanded = openId === item.id;
              const panelId = `capability-${item.id}`;

              return (
                <article
                  key={item.id}
                  className={`${styles.record} ${
                    expanded ? styles.expanded : ""
                  }`}
                  data-index-row
                >
                  <div
                    className={styles.recordShell}
                    data-index-shell
                  >
                    <button
                      type="button"
                      className={styles.recordButton}
                      onClick={() => toggle(item.id)}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                    >
                      <span className={styles.number}>
                        {item.id}
                      </span>

                      <span className={styles.recordIdentity}>
                        <span className={styles.subtitle}>
                          {item.subtitle}
                        </span>
                        <span className={styles.recordTitle}>
                          {item.title}
                        </span>
                        <span className={styles.short}>
                          {item.short}
                        </span>
                      </span>

                      <span
                        className={styles.toggleIcon}
                        aria-hidden="true"
                      >
                        <Plus size={21} strokeWidth={1.5} />
                      </span>
                    </button>

                    <div
                      id={panelId}
                      className={styles.panel}
                      onTransitionEnd={refreshAfterExpansion}
                      aria-hidden={!expanded}
                      inert={!expanded}
                    >
                      <div className={styles.panelInner}>
                        <p className={styles.overview}>
                          {item.overview}
                        </p>

                        <div className={styles.detailGrid}>
                          <div className={styles.detailColumn}>
                            <h4>WHAT I WORK ON</h4>

                            <div className={styles.focusList}>
                              {item.focus.map((focus, index) => (
                                <div
                                  className={styles.focusRow}
                                  key={focus}
                                >
                                  <span>
                                    {String(index + 1).padStart(2, "0")}
                                  </span>
                                  <p>{focus}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className={styles.detailColumn}>
                            <h4>TOOLS & METHODS</h4>

                            <div className={styles.tools}>
                              {item.tools.map((tool) => (
                                <span key={tool}>
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className={styles.projectArea}>
                          <h4>WHERE IT SHOWS UP</h4>

                          {item.projects.map((project) => (
                            <a
                              key={project.name}
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.projectLink}
                            >
                              <span>
                                <strong>{project.name}</strong>
                                <small>{project.note}</small>
                              </span>

                              <ArrowUpRight size={18} />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <footer className={styles.footer}>
          <span>AN INDEX OF WORK, NOT A SKILL RATING.</span>

          <a
            href="https://github.com/KenCamagay"
            target="_blank"
            rel="noopener noreferrer"
          >
            EXPLORE THE GITHUB ARCHIVE
            <ArrowUpRight size={15} />
          </a>
        </footer>
      </div>
    </section>
  );
}
