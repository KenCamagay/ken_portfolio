
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./KcThreeIntro.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* -----------------------------------------
   CUSTOM MONOGRAM GEOMETRY
----------------------------------------- */

const extrusion = {
  depth: 0.38,
  bevelEnabled: true,
  bevelThickness: 0.045,
  bevelSize: 0.035,
  bevelSegments: 3,
  curveSegments: 20,
  steps: 1,
};

function polygon(points: [number, number][]) {
  const shape = new THREE.Shape();

  points.forEach(([x, y], index) => {
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  });

  shape.closePath();
  return shape;
}

function makeK() {
  return polygon([
    [0, -1.1],
    [0.43, -1.1],
    [0.43, -0.36],
    [0.64, -0.12],
    [1.19, -1.1],
    [1.73, -1.1],
    [0.94, 0.16],
    [1.71, 1.1],
    [1.13, 1.1],
    [0.43, 0.26],
    [0.43, 1.1],
    [0, 1.1],
  ]);
}

function makeSlash() {
  return polygon([
    [-0.22, -1.1],
    [0.18, -1.1],
    [0.92, 1.1],
    [0.52, 1.1],
  ]);
}

function makeC() {
  const shape = new THREE.Shape();

  shape.moveTo(1.48, 0.8);

  shape.bezierCurveTo(
    0.98, 1.29,
    0.28, 1.21,
    0.04, 0.7
  );

  shape.bezierCurveTo(
    -0.16, 0.29,
    -0.15, -0.31,
    0.07, -0.72
  );

  shape.bezierCurveTo(
    0.35, -1.2,
    1.0, -1.26,
    1.48, -0.8
  );

  shape.lineTo(1.14, -0.36);

  shape.bezierCurveTo(
    0.94, -0.59,
    0.62, -0.6,
    0.43, -0.34
  );

  shape.bezierCurveTo(
    0.27, -0.15,
    0.26, 0.19,
    0.41, 0.41
  );

  shape.bezierCurveTo(
    0.59, 0.67,
    0.91, 0.71,
    1.15, 0.38
  );

  shape.closePath();

  return shape;
}

/* -----------------------------------------
   PROGRESS HELPERS
----------------------------------------- */

function phase(
  progress: number,
  start: number,
  end: number
) {
  return THREE.MathUtils.smoothstep(
    progress,
    start,
    end
  );
}

/* -----------------------------------------
   ACTUAL 3D LOGO + CAMERA
----------------------------------------- */

function MonogramScene({
  progress,
}: {
  progress: { current: number };
}) {
  const rigRef = useRef<THREE.Group>(null);
  const kRef = useRef<THREE.Group>(null);
  const slashRef = useRef<THREE.Group>(null);
  const cRef = useRef<THREE.Group>(null);

  const kGeometry = useMemo(
    () => new THREE.ExtrudeGeometry(makeK(), extrusion),
    []
  );

  const slashGeometry = useMemo(
    () => new THREE.ExtrudeGeometry(makeSlash(), extrusion),
    []
  );

  const cGeometry = useMemo(
    () => new THREE.ExtrudeGeometry(makeC(), extrusion),
    []
  );

  useFrame(({ camera, size }) => {
    const rig = rigRef.current;
    const k = kRef.current;
    const slash = slashRef.current;
    const c = cRef.current;

    if (!rig || !k || !slash || !c) return;

    const p = progress.current;

    // Each chapter is based on exact scroll progress.
    const orbit = phase(p, 0.06, 0.36);
    const separate = phase(p, 0.29, 0.7);
    const flight = phase(p, 0.64, 0.98);

    // Adjust size for different desktop aspect ratios.
    const aspect = size.width / Math.max(size.height, 1);

    const responsiveScale = THREE.MathUtils.clamp(
      aspect * 0.73,
      0.76,
      1.22
    );

    // The full logo reveals its depth.
    rig.rotation.x =
      0.06 + orbit * 0.19 + flight * 0.07;

    rig.rotation.y =
      -0.08 + orbit * 0.62 - flight * 0.18;

    rig.rotation.z =
      orbit * -0.055;

    rig.scale.setScalar(
      responsiveScale * (1 + orbit * 0.07)
    );

    // K separates to the left.
    k.position.x =
      -2.4 - separate * 2.0 - flight * 2.8;

    k.position.z =
      separate * 0.35 - flight * 0.5;

    k.rotation.y =
      -separate * 0.24;

    k.rotation.z =
      -separate * 0.08;

    // C separates to the right.
    c.position.x =
      0.55 + separate * 2.0 + flight * 2.8;

    c.position.z =
      separate * 0.35 - flight * 0.5;

    c.rotation.y =
      separate * 0.24;

    c.rotation.z =
      separate * 0.08;

    // Slash becomes the hinge of the transition.
    slash.position.x = -0.49;
    slash.position.z = separate * 0.5;

    slash.rotation.z =
      separate * 1.3 + flight * 0.9;

    slash.rotation.y =
      separate * 0.28;

    slash.scale.set(
      1 - separate * 0.12,
      1 + separate * 0.2,
      1
    );

    // Real camera movement through the opening.
    camera.position.set(
      0,
      0,
      7.5 -
        orbit * 0.5 -
        separate * 1.0 -
        flight * 4.6
    );

    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={1.8} />

      <directionalLight
        position={[-3, 5, 7]}
        intensity={4}
        color="#ffffff"
      />

      <directionalLight
        position={[5, -1, 3]}
        intensity={3}
        color="#ae83ff"
      />

      <directionalLight
        position={[-4, -3, -2]}
        intensity={2}
        color="#d5c3ff"
      />

      <group ref={rigRef}>
        <group ref={kRef} position={[-2.4, 0, 0]}>
          <mesh geometry={kGeometry}>
            <meshPhysicalMaterial
              color="#252128"
              metalness={0.45}
              roughness={0.32}
              clearcoat={0.65}
              clearcoatRoughness={0.2}
            />
          </mesh>
        </group>

        <group ref={slashRef} position={[-0.49, 0, 0.1]}>
          <mesh geometry={slashGeometry}>
            <meshPhysicalMaterial
              color="#9259ef"
              metalness={0.42}
              roughness={0.24}
              clearcoat={1}
              clearcoatRoughness={0.12}
            />
          </mesh>
        </group>

        <group ref={cRef} position={[0.55, 0, 0]}>
          <mesh geometry={cGeometry}>
            <meshPhysicalMaterial
              color="#252128"
              metalness={0.45}
              roughness={0.32}
              clearcoat={0.65}
              clearcoatRoughness={0.2}
            />
          </mesh>
        </group>
      </group>
    </>
  );
}

/* -----------------------------------------
   INTRO WITH SCROLLTRIGGER
----------------------------------------- */

export default function KcThreeIntro() {
  const introRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const progressRef = useRef(0);

  const [webglSupported, setWebglSupported] =
    useState<boolean | null>(null);

  const [visible, setVisible] = useState(true);

  // Enable WebGL only on supported desktop devices.
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)"
    );

    const check = () => {
      if (!media.matches) {
        setWebglSupported(false);
        return;
      }

      try {
        const canvas = document.createElement("canvas");

        const context =
          canvas.getContext("webgl2") ||
          canvas.getContext("webgl");

        setWebglSupported(Boolean(context));
      } catch {
        setWebglSupported(false);
      }
    };

    check();

    media.addEventListener("change", check);

    return () => {
      media.removeEventListener("change", check);
    };
  }, []);

  // Avoid rendering continuously after leaving the intro.
  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const intro = introRef.current;
      if (!intro) return;

      const portal = intro.querySelector<HTMLElement>(
        "[data-three-portal]"
      );

      const canvas = intro.querySelector<HTMLElement>(
        "[data-three-canvas]"
      );

      const top = intro.querySelector<HTMLElement>(
        "[data-three-top]"
      );

      const bottom = intro.querySelector<HTMLElement>(
        "[data-three-bottom]"
      );

      const side = intro.querySelector<HTMLElement>(
        "[data-three-side]"
      );

      const progressLine = intro.querySelector<HTMLElement>(
        "[data-three-progress]"
      );

      if (
        !portal ||
        !canvas ||
        !top ||
        !bottom ||
        !side ||
        !progressLine
      ) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          const driver = { value: 0 };

          gsap.set(portal, {
            clipPath: "inset(0 50% 0 50%)",
          });

          gsap.set(progressLine, {
            scaleX: 0,
            transformOrigin: "left center",
          });

          const timeline = gsap.timeline({
            defaults: {
              ease: "none",
            },

            scrollTrigger: {
              trigger: intro,

              start: () => {
                const nav = document.querySelector<HTMLElement>(
                  ".topnav"
                );

                const navHeight =
                  nav?.getBoundingClientRect().height ?? 76;

                return `top ${Math.round(navHeight)}px`;
              },

              // Matches the end of the CSS sticky range.
              end: "bottom bottom",

              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          });

          // GSAP controls a shared value for the Three.js camera.
          timeline.to(
            driver,
            {
              value: 1,
              duration: 1,
              onUpdate: () => {
                progressRef.current = driver.value;
              },
            },
            0
          );

          // The dark opening expands behind the 3D logo.
          timeline.to(
            portal,
            {
              clipPath: "inset(0 0% 0 0%)",
              duration: 0.46,
              ease: "power3.inOut",
            },
            0.42
          );

          // Let the camera disappear through the opening.
          timeline.to(
            canvas,
            {
              autoAlpha: 0,
              duration: 0.16,
            },
            0.82
          );

          timeline.to(
            [top, bottom, side],
            {
              autoAlpha: 0,
              duration: 0.18,
            },
            0.76
          );

          timeline.to(
            progressLine,
            {
              scaleX: 1,
              duration: 1,
            },
            0
          );

          return () => {
            progressRef.current = 0;
            timeline.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: introRef }
  );

  return (
    <section
      ref={introRef}
      className={`${styles.intro} ${
        webglSupported === false ? styles.fallbackMode : ""
      }`}
      aria-label="Ken Camagay interactive 3D introduction"
    >
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.portal} data-three-portal />

        <div className={styles.top} data-three-top>
          <span>KEN CAMAGAY / IDENTITY 001</span>

          <a href="#home">
            SKIP INTRO ↗
          </a>
        </div>

        <div
          className={styles.canvasLayer}
          data-three-canvas
          aria-hidden="true"
        >
          {webglSupported && (
            <Canvas
              camera={{
                position: [0, 0, 7.5],
                fov: 38,
                near: 0.1,
                far: 100,
              }}
              dpr={[1, 1.5]}
              frameloop={visible ? "always" : "never"}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference: "high-performance",
              }}
            >
              <MonogramScene progress={progressRef} />
            </Canvas>
          )}
        </div>

        {/* Static identity for loading and non-WebGL devices */}
        <div
          className={`${styles.staticLogo} ${
            webglSupported ? styles.staticHidden : ""
          }`}
          role="img"
          aria-label="K slash C monogram"
        >
          K<span>/</span>C
        </div>

        <div className={styles.side} data-three-side>
          AN IDENTITY IN MOTION
        </div>

        <div className={styles.bottom} data-three-bottom>
          <span>SCROLL TO ENTER ↓</span>
          <span>FORM / SPACE / MOTION</span>
          <span>001 — K/C</span>
        </div>

        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            data-three-progress
          />
        </div>
      </div>
    </section>
  );
}
