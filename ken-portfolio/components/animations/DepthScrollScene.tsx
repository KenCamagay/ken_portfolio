
"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./DepthScrollScene.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type DepthScrollSceneProps = {
  hero: ReactNode;
  about: ReactNode;
};

export default function DepthScrollScene({
  hero,
  about,
}: DepthScrollSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const heroAnchorRef = useRef<HTMLDivElement>(null);
  const heroPlaneRef = useRef<HTMLDivElement>(null);
  const aboutAnchorRef = useRef<HTMLDivElement>(null);
  const aboutPlaneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const heroAnchor = heroAnchorRef.current;
      const heroPlane = heroPlaneRef.current;
      const aboutAnchor = aboutAnchorRef.current;
      const aboutPlane = aboutPlaneRef.current;

      if (
        !heroAnchor ||
        !heroPlane ||
        !aboutAnchor ||
        !aboutPlane
      ) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set([heroPlane, aboutPlane], {
            transformPerspective: 1500,
            transformOrigin: "center center",
            force3D: true,
          });

          // HERO: hold, then fold into the distance.
          // The anchor remains static for reliable scroll measurements.
          const heroTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: heroAnchor,
              start: "top top",
              end: "bottom 12%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });

          heroTimeline
            .to({}, { duration: 0.2 })
            .to(heroPlane, {
              rotationX: -16,
              rotationY: 5,
              z: -320,
              scale: 0.84,
              yPercent: -7,
              opacity: 0.2,
              ease: "none",
              duration: 0.8,
            });

          // ABOUT: approach from depth and straighten.
          gsap.fromTo(
            aboutPlane,
            {
              rotationX: 13,
              rotationY: -4,
              z: -260,
              yPercent: 8,
              opacity: 0.55,
            },
            {
              rotationX: 0,
              rotationY: 0,
              z: 0,
              yPercent: 0,
              opacity: 1,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: aboutAnchor,
                start: "top bottom",
                end: "top 25%",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      );

      return () => mm.revert();
    },
    { scope: sceneRef }
  );

  return (
    <div ref={sceneRef} className={styles.scene}>
      <div
        ref={heroAnchorRef}
        className={styles.anchor}
      >
        <div
          ref={heroPlaneRef}
          className={styles.plane}
        >
          {hero}
        </div>
      </div>

      <div
        ref={aboutAnchorRef}
        className={styles.anchor}
      >
        <div
          ref={aboutPlaneRef}
          className={styles.plane}
        >
          {about}
        </div>
      </div>
    </div>
  );
}
