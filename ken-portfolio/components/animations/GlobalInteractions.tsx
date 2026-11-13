
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./GlobalInteractions.module.css";

export default function GlobalInteractions() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;

    if (!ring || !dot || !label) return;

    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );

    if (!media.matches) return;

    const root = document.documentElement;

    gsap.set([ring, dot], {
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 0,
    });

    const ringX = gsap.quickTo(ring, "x", {
    duration: 0.16,
    ease: "power2.out",
    });

    const ringY = gsap.quickTo(ring, "y", {
    duration: 0.16,
    ease: "power2.out",
    });

    const dotX = gsap.quickTo(dot, "x", {
      duration: 0.08,
      ease: "none",
    });

    const dotY = gsap.quickTo(dot, "y", {
      duration: 0.08,
      ease: "none",
    });

    let visible = false;
    let currentLabel = "";

   
    const hide = () => {
    visible = false;

    // Restore the browser's native cursor.
    root.classList.remove("ken-cursor-ready");

    // Hide immediately rather than waiting for the trail.
    gsap.killTweensOf([ring, dot], "opacity,visibility");

    gsap.set([ring, dot], {
        autoAlpha: 0,
    });

    ring.dataset.active = "false";
    ring.dataset.labeled = "false";

    currentLabel = "";
    label.textContent = "";
    };


    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
        
    

      const target =
        event.target instanceof Element
          ? event.target
          : null;

      const isField = target?.closest(
        "input, textarea, select, [contenteditable='true']"
      );

      // Restore native cursor for text entry.
      if (isField) {
        hide();
        return;
      }

      if (!visible) {
        visible = true;

        gsap.set([ring, dot], {
          x: event.clientX,
          y: event.clientY,
        });

        gsap.to([ring, dot], {
          autoAlpha: 1,
          duration: 0.2,
          overwrite: true,
        });

        root.classList.add("ken-cursor-ready");
      }

      ringX(event.clientX);
      ringY(event.clientY);

      dotX(event.clientX);
      dotY(event.clientY);

      const interactive = target?.closest<HTMLElement>(
        "a, button, [role='button']"
      );

      const active =
        Boolean(interactive) &&
        !interactive?.hasAttribute("disabled");

      ring.dataset.active = active ? "true" : "false";

      let nextLabel = "";

      if (interactive && active) {
        nextLabel =
          interactive.dataset.cursorLabel ?? "";

        if (!nextLabel && interactive.matches(".signal-link")) {
          nextLabel = "VIEW";
        }

        if (!nextLabel && interactive.matches(".nav-cta")) {
          nextLabel = "TALK";
        }

        if (
          !nextLabel &&
          interactive.matches("#expertise button")
        ) {
          nextLabel =
            interactive.getAttribute("aria-expanded") ===
            "true"
              ? "CLOSE"
              : "OPEN";
        }
      }

      if (nextLabel !== currentLabel) {
        currentLabel = nextLabel;
        label.textContent = nextLabel;
      }

      ring.dataset.labeled = nextLabel
        ? "true"
        : "false";
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) {
        hide();
      }
    };

    
    // When the pointer leaves the HTML document
    const handlePageLeave = () => {
    hide();
    };

    // Handles leaving the webpage for browser chrome
    const handleWindowMouseOut = (event: MouseEvent) => {
    if (!event.relatedTarget) {
        hide();
    }
    };

    // Handles switching browser tabs or windows
    const handleWindowBlur = () => {
    hide();
    };

    // Handles the browser tab becoming hidden
    const handleVisibilityChange = () => {
    if (document.hidden) {
        hide();
    }
    };


    document.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    document.addEventListener(
      "pointerout",
      handlePointerOut
    );

    
    document.documentElement.addEventListener(
    "pointerleave",
    handlePageLeave
    );

    window.addEventListener(
    "mouseout",
    handleWindowMouseOut
    );

    window.addEventListener(
    "blur",
    handleWindowBlur
    );

    document.addEventListener(
    "visibilitychange",
    handleVisibilityChange
    );


    // Magnetic targets are opt-in.
    const magnets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-magnetic]"
      )
    );

    const cleanupMagnets: Array<() => void> = [];

    magnets.forEach((element) => {
      const moveX = gsap.quickTo(element, "x", {
        duration: 0.45,
        ease: "power3.out",
      });

      const moveY = gsap.quickTo(element, "y", {
        duration: 0.45,
        ease: "power3.out",
      });

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;

        const rect = element.getBoundingClientRect();

        const normalizedX =
          (event.clientX -
            rect.left -
            rect.width / 2) /
          rect.width;

        const normalizedY =
          (event.clientY -
            rect.top -
            rect.height / 2) /
          rect.height;

        moveX(gsap.utils.clamp(-9, 9, normalizedX * 16));
        moveY(gsap.utils.clamp(-9, 9, normalizedY * 16));
      };

      const onLeave = () => {
        moveX(0);
        moveY(0);
      };

      element.addEventListener("pointermove", onMove);
      element.addEventListener("pointerleave", onLeave);

      cleanupMagnets.push(() => {
        element.removeEventListener(
          "pointermove",
          onMove
        );

        element.removeEventListener(
          "pointerleave",
          onLeave
        );

        gsap.killTweensOf(element);
        gsap.set(element, { clearProps: "x,y" });
      });
    });

    return () => {
      root.classList.remove("ken-cursor-ready");

      document.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      document.removeEventListener(
        "pointerout",
        handlePointerOut
      );

      
        document.documentElement.removeEventListener(
        "pointerleave",
        handlePageLeave
        );

        window.removeEventListener(
        "mouseout",
        handleWindowMouseOut
        );

        window.removeEventListener(
        "blur",
        handleWindowBlur
        );

        document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
        );


      cleanupMagnets.forEach((cleanup) => cleanup());

      gsap.killTweensOf([ring, dot]);
    };
  }, []);

  return (
    <div className={styles.layer} aria-hidden="true">
      <div
        ref={ringRef}
        className={styles.ring}
        data-active="false"
        data-labeled="false"
      >
        <span ref={labelRef} className={styles.label} />
      </div>

      <div ref={dotRef} className={styles.dot} />
    </div>
  );
}
