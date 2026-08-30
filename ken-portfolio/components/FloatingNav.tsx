"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  {
    label: "Home",
    href: "#home",
    id: "home",
  },
  {
    label: "Work",
    href: "#projects",
    id: "projects",
  },
  {
    label: "Skills",
    href: "#skills",
    id: "skills",
  },
  {
    label: "Contact",
    href: "#contact",
    id: "contact",
  },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /*
   * Make navbar slightly stronger when the
   * user starts scrolling.
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Detect which section is currently active.
   */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(
        (section): section is HTMLElement =>
          section !== null
      );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActiveSection(
            visibleSections[0].target.id
          );
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.2, 0.5, 0.8],
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className="
        pointer-events-none
        fixed
        inset-x-0
        top-4
        z-[100]
        px-4
        sm:top-5
      "
    >
      {/* Main Navbar */}
      <motion.nav
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1,
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          pointer-events-auto
          mx-auto
          flex
          max-w-[760px]
          items-center
          justify-between
          rounded-2xl
          border
          border-white/[0.08]

          bg-[#07111f]/55

          px-3
          py-2

          shadow-[0_15px_50px_rgba(0,0,0,0.25)]

          backdrop-blur-xl

          transition-all
          duration-300

          ${
            isScrolled
              ? `
                bg-[#07111f]/85
                shadow-[0_20px_60px_rgba(0,0,0,0.35)]
              `
              : ""
          }
        `}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={() => setMobileOpen(false)}
          className="
            group
            flex
            h-10
            items-center
            gap-2
            rounded-xl
            px-3
          "
        >
          <span
            className="
              font-mono
              text-sm
              font-semibold
              tracking-[0.18em]
              text-white
            "
          >
            KC
            <span className="text-blue-400">
              .
            </span>
          </span>

          <span
            className="
              hidden
              h-1.5
              w-1.5
              rounded-full
              bg-blue-400

              shadow-[0_0_12px_rgba(96,165,250,0.9)]

              sm:block
            "
          />
        </a>

        {/* Desktop Navigation */}
        <div
          className="
            hidden
            items-center
            gap-1
            md:flex
          "
        >
          {navLinks.map((link) => {
            const active =
              activeSection === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                className="
                  relative
                  rounded-xl
                  px-4
                  py-2

                  text-sm
                  text-slate-400

                  transition-colors

                  hover:text-white
                "
              >
                {/* Active background */}
                {active && (
                  <motion.span
                    layoutId="nav-active-background"
                    className="
                      absolute
                      inset-0
                      rounded-xl
                      bg-white/[0.055]
                    "
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 35,
                    }}
                  />
                )}

                <span className="relative z-10">
                  {link.label}
                </span>

                {/* Active blue dot */}
                {active && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="
                      absolute
                      bottom-[3px]
                      left-1/2

                      h-1
                      w-1

                      -translate-x-1/2

                      rounded-full

                      bg-blue-400

                      shadow-[0_0_10px_rgba(96,165,250,0.9)]
                    "
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right CTA */}
        <a
          href="#contact"
          className="
            hidden
            rounded-xl

            border
            border-blue-400/20

            bg-blue-400/[0.07]

            px-4
            py-2

            text-sm
            font-medium
            text-blue-200

            transition-all
            duration-200

            hover:border-blue-300/40
            hover:bg-blue-400/[0.12]
            hover:text-white

            md:block
          "
        >
          Let&apos;s talk
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() =>
            setMobileOpen((current) => !current)
          }
          className="
            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-xl

            text-slate-300

            transition

            hover:bg-white/[0.06]
            hover:text-white

            md:hidden
          "
        >
          <span className="relative h-4 w-5">
            {/* Top line */}
            <span
              className={`
                absolute
                left-0
                top-0

                h-px
                w-5

                bg-current

                transition-all
                duration-200

                ${
                  mobileOpen
                    ? "translate-y-[7px] rotate-45"
                    : ""
                }
              `}
            />

            {/* Middle line */}
            <span
              className={`
                absolute
                left-0
                top-[7px]

                h-px
                w-5

                bg-current

                transition-all
                duration-200

                ${
                  mobileOpen
                    ? "opacity-0"
                    : ""
                }
              `}
            />

            {/* Bottom line */}
            <span
              className={`
                absolute
                left-0
                top-[14px]

                h-px
                w-5

                bg-current

                transition-all
                duration-200

                ${
                  mobileOpen
                    ? "-translate-y-[7px] -rotate-45"
                    : ""
                }
              `}
            />
          </span>
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              pointer-events-auto

              mx-auto
              mt-2

              max-w-[760px]

              overflow-hidden
              rounded-2xl

              border
              border-white/[0.08]

              bg-[#07111f]/90

              p-2

              shadow-[0_20px_60px_rgba(0,0,0,0.4)]

              backdrop-blur-xl

              md:hidden
            "
          >
            {navLinks.map((link) => {
              const active =
                activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={`
                    flex
                    items-center
                    justify-between

                    rounded-xl

                    px-4
                    py-3

                    text-sm

                    transition-all

                    ${
                      active
                        ? `
                          bg-white/[0.06]
                          text-white
                        `
                        : `
                          text-slate-400
                          hover:bg-white/[0.04]
                          hover:text-white
                        `
                    }
                  `}
                >
                  <span>{link.label}</span>

                  {active && (
                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-blue-400

                        shadow-[0_0_10px_rgba(96,165,250,0.8)]
                      "
                    />
                  )}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}