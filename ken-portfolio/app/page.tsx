
"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Menu,
  X,
  MoveUpRight,
  Send,
} from "lucide-react";

import { projects } from "@/data/projects";
import CinematicHero from "@/components/animations/CinematicHero";
import HorizontalProjects from "@/components/animations/HorizontalProjects";
import AboutSection from "@/components/animations/AboutSection";
import ExpertiseSection from "@/components/animations/ExpertiseSection";
import AboutWorkFold from "@/components/animations/AboutWorkFold";
import ContactSection from "@/components/animations/ContactSection";

import WorkExpertiseBridge from "@/components/animations/WorkExpertiseBridge";

const ease = [0.22, 1, 0.36, 1] as const;

const appear = {
  initial: { opacity: 0, y: 55 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.9, ease },
};

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="topnav">
      <a href="#home" className="brand" aria-label="Ken Camagay home">
        KEN<span>®</span>
      </a>

      <nav
        className={open ? "navlinks is-open" : "navlinks"}
        aria-label="Main navigation"
      >
        {[
          ["About", "#about"],
          ["Work", "#work"],
          ["Expertise", "#expertise"],
          ["Contact", "#contact"],
        ].map(([name, href]) => (
          <a
            key={name}
            href={href}
            onClick={() => setOpen(false)}
          >
            {name}
          </a>
        ))}
      </nav>

     <a
      className="nav-cta"
      href="#contact"
      data-magnetic
      data-cursor-label="TALK"
    >
      LET&apos;S TALK
      <ArrowUpRight size={15} />
    </a>

      <button
        className="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}


function About() {
  return (
    <section id="about" className="about section-pad">
      <motion.div {...appear} className="section-label">
        <span>01 / THE INTRODUCTION</span>
        <span>ABOUT ME ↗</span>
      </motion.div>

      <div className="about-layout">
        <motion.div {...appear}>
          <span className="eyebrow">A LITTLE ABOUT ME</span>

          <h2 className="display-heading">
            NOT JUST
            <br />
            CODE.
            <br />
            <span className="violet-text">CURIOSITY.</span>
          </h2>
        </motion.div>

        <motion.div {...appear} className="about-copy">
          <div className="asterisk">✳</div>

          <p>
            I&apos;m Ken — a developer who cares as much about{" "}
            <em>how something feels</em> as how it works.
          </p>

          <p>
            I build responsive web applications, intuitive
            interfaces, and practical full-stack solutions.
            I love turning complex ideas into experiences
            that feel effortless.
          </p>

          <a href="#contact" className="text-link">
            MORE ABOUT WORKING TOGETHER
            <ArrowUpRight size={19} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Work() {
  const featured = projects.filter(
    (p) =>
      p.images?.[0] &&
      !p.images[0].includes("dagudorms")
  );

  return (
    <section id="work" className="work section-pad">
      <motion.div {...appear} className="section-label">
        <span>02 / SELECTED PROJECTS</span>
        <span>2024 — 2026</span>
      </motion.div>

      <motion.div {...appear} className="work-intro">
        <h2 className="display-heading">
          PROOF IN
          <br />
          <span className="outline-dark">THE WORK.</span>
        </h2>

        <p>
          A selection of things I&apos;ve built,
          explored, and brought to life.
        </p>
      </motion.div>

      <div className="project-list">
        {featured.map((project, i) => (
          <motion.article
            {...appear}
            key={`${project.title}-${i}`}
            className="project-card"
          >
            <div className="project-image">
              <Image
                src={project.images![0]}
                alt={`${project.title} project screenshot`}
                fill
                sizes="(max-width: 800px) 100vw, 65vw"
                className="project-img"
              />

              <span className="project-index">
                0{i + 1} / 0{featured.length}
              </span>

              <a
                href={project.repo || project.live || "#work"}
                target="_blank"
                rel="noopener noreferrer"
                className="project-arrow"
                aria-label={`View ${project.title} project`}
              >
                <ArrowUpRight size={27} />
              </a>
            </div>

            <div className="project-meta">
              <div>
                <span className="project-tag">
                  {project.tag}
                </span>

                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <div className="tech-list">
                {project.tech.slice(0, 4).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.a
        {...appear}
        className="all-projects"
        href="https://github.com/KenCamagay"
        target="_blank"
        rel="noopener noreferrer"
      >
        MORE ON GITHUB
        <ArrowUpRight size={24} />
      </motion.a>
    </section>
  );
}

const expertise = [
  {
    n: "01",
    name: "FRONTEND",
    desc: "Interfaces that look sharp, feel natural, and work everywhere.",
    tags: "React · Next.js · TypeScript · Tailwind",
  },
  {
    n: "02",
    name: "BACKEND",
    desc: "Solid systems, thoughtful APIs, and reliable data flows.",
    tags: "Node.js · Laravel · FastAPI · MySQL",
  },
  {
    n: "03",
    name: "MOBILE",
    desc: "Mobile-first experiences designed for real people.",
    tags: "React Native · Expo · Android",
  },
  {
    n: "04",
    name: "DESIGN & UX",
    desc: "Visual systems, intuitive journeys, and the details in between.",
    tags: "Responsive UI · Accessibility · Interaction",
  },
];

function Expertise() {
  return (
    <section
      id="expertise"
      className="expertise section-pad"
    >
      <motion.div {...appear} className="section-label">
        <span>03 / WHAT I DO</span>
        <span>CAPABILITIES</span>
      </motion.div>

      <motion.h2
        {...appear}
        className="display-heading"
      >
        TOOLS ARE
        <br />
        JUST THE{" "}
        <span className="violet-text">START.</span>
      </motion.h2>

      <div className="expertise-list">
        {expertise.map((e) => (
          <motion.div
            key={e.n}
            initial={{ opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="expertise-row"
          >
            <span className="expertise-num">
              {e.n}
            </span>

            <h3>{e.name}</h3>

            <div>
              <p>{e.desc}</p>
              <span>{e.tags}</span>
            </div>

            <MoveUpRight
              className="expertise-arrow"
              size={26}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [feedback, setFeedback] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to send message."
        );
      }

      setStatus("success");
      setFeedback(
        "Message sent. Thanks for reaching out!"
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  }

  return (
    <section id="contact" className="contact section-pad">
      <motion.div {...appear} className="section-label">
        <span>04 / GET IN TOUCH</span>
        <span>THE NEXT CHAPTER</span>
      </motion.div>

      <motion.div {...appear} className="contact-heading">
        <span>HAVE AN IDEA?</span>

        <h2>
          LET&apos;S MAKE
          <br />
          <em>IT REAL.</em>
        </h2>

        <a
          href="#contact-form"
          className="contact-orb"
          aria-label="Jump to contact form"
        >
          <ArrowDownRight size={45} />
        </a>
      </motion.div>

      <div className="contact-bottom">
        <motion.div {...appear}>
          <p>
            Have a project, collaboration, or just want
            to say hello? My inbox is open.
          </p>

          <div className="socials">
            <a
              href="https://github.com/KenCamagay"
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB ↗
            </a>

            <a
              href="https://www.linkedin.com/in/ken-camagay-024a56429/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN ↗
            </a>

            <a
              href="https://www.facebook.com/ken.devenecia.98"
              target="_blank"
              rel="noopener noreferrer"
            >
              FACEBOOK ↗
            </a>
          </div>
        </motion.div>

        <motion.form
          {...appear}
          id="contact-form"
          onSubmit={submit}
          className="contact-form"
        >
          <label htmlFor="name">YOUR NAME</label>
          <input
            id="name"
            name="name"
            placeholder="How should I call you?"
            required
            maxLength={100}
          />

          <label htmlFor="email">EMAIL ADDRESS</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            maxLength={200}
          />

          <label htmlFor="message">YOUR MESSAGE</label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Tell me what you're thinking..."
            required
            maxLength={5000}
          />

          <button
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending"
              ? "SENDING..."
              : "SEND MESSAGE"}
            <Send size={18} />
          </button>

          {feedback && (
            <p role="status" className="form-feedback">
              {feedback}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });


return (
  <>
    {/* Navbar stays outside the GSAP scroll container */}
    <Nav />

    <div className="portfolio">
      <motion.div
        className="scroll-indicator"
        style={{ scaleX }}
      />

     
      <main>
       

        <CinematicHero />

        <AboutWorkFold>
          <AboutSection />
        </AboutWorkFold>

        <HorizontalProjects />
        <WorkExpertiseBridge />
        <ExpertiseSection />

        <ContactSection />
      </main>

    </div>
  </>
);


}
