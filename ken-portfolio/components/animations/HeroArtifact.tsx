
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroArtifact.module.css";

gsap.registerPlugin(ScrollTrigger);

// Create a continuous, sculptural metallic ribbon.
// No downloaded 3D model required.
function createRibbon() {
  const geometry = new THREE.BufferGeometry();

  const vertices: number[] = [];
  const indices: number[] = [];

  const segments = 240;
  const widthSegments = 14;

  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;

    const radius = 1.2 + 0.09 * Math.sin(t * 3);
    const twist = 2 * t + 0.3 * Math.sin(t * 3);

    for (let j = 0; j <= widthSegments; j++) {
      const u = (j / widthSegments - 0.5) * 0.82;

      const x =
        (radius + u * Math.cos(twist)) * Math.cos(t);

      const y =
        (radius + u * Math.cos(twist)) * Math.sin(t);

      const z =
        u * Math.sin(twist) +
        0.13 * Math.sin(t * 3);

      vertices.push(x, y, z);
    }
  }

  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < widthSegments; j++) {
      const a = i * (widthSegments + 1) + j;
      const b = a + widthSegments + 1;

      indices.push(
        a, b, a + 1,
        b, b + 1, a + 1
      );
    }
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

function Sculpture() {
  const groupRef = useRef<THREE.Group>(null);

  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  const geometry = useMemo(createRibbon, []);

  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      pointer.current.x =
        (event.clientX / window.innerWidth) * 2 - 1;

      pointer.current.y =
        (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener(
      "pointermove",
      handlePointer,
      { passive: true }
    );

    const hero = document.querySelector(".hero");

    const trigger = hero
      ? ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            scroll.current = self.progress;
          },
        })
      : null;

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointer
      );

      trigger?.kill();
    };
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const time = clock.getElapsedTime();

    // Natural, continuous motion with pointer influence.
    const targetX =
      0.25 +
      pointer.current.y * 0.28 +
      scroll.current * 0.3 +
      Math.sin(time * 0.38) * 0.08;

    const targetY =
      -0.4 +
      time * 0.13 +
      pointer.current.x * 0.36 +
      scroll.current * 0.85;

    const targetZ =
      0.2 +
      pointer.current.x * 0.08;

    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      targetX,
      3,
      delta
    );

    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      targetY,
      3,
      delta
    );

    group.rotation.z = THREE.MathUtils.damp(
      group.rotation.z,
      targetZ,
      3,
      delta
    );

    // The sculpture recedes slightly as the hero scrolls away.
    const targetScale = 1 - scroll.current * 0.18;

    const scale = THREE.MathUtils.damp(
      group.scale.x,
      targetScale,
      2.5,
      delta
    );

    group.scale.setScalar(scale);

    group.position.y = THREE.MathUtils.damp(
      group.position.y,
      scroll.current * 0.38,
      2.5,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      {/* Main folded metal ribbon */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#b18aff"
          metalness={0.68}
          roughness={0.24}
          clearcoat={1}
          clearcoatRoughness={0.18}
          emissive="#241136"
          emissiveIntensity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Thin orbital guide around the sculpture */}
      <mesh rotation={[0.55, 0.2, 0.3]}>
        <torusGeometry args={[1.62, 0.012, 8, 144]} />
        <meshBasicMaterial
          color="#b8a2ff"
          transparent
          opacity={0.43}
          depthWrite={false}
        />
      </mesh>

      {/* A second, more delicate orbital axis */}
      <mesh rotation={[1.15, 0.55, -0.25]}>
        <torusGeometry args={[1.44, 0.008, 8, 144]} />
        <meshBasicMaterial
          color="#e7dcff"
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function HeroArtifact() {
  const [enabled, setEnabled] = useState(false);
  const [inView, setInView] = useState(true);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Don't create a WebGL canvas on small screens,
  // reduced-motion devices, or unsupported browsers.
  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)"
    );

    const update = () => {
      if (!query.matches) {
        setEnabled(false);
        return;
      }

      try {
        const canvas = document.createElement("canvas");

        const supported = Boolean(
          canvas.getContext("webgl2") ||
          canvas.getContext("webgl")
        );

        setEnabled(supported);
      } catch {
        setEnabled(false);
      }
    };

    update();

    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  // Pause rendering when the hero isn't visible.
  useEffect(() => {
    const element = wrapperRef.current;
    if (!element || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [enabled]);

  return (
    <div
      ref={wrapperRef}
      className={styles.artifact}
      aria-hidden="true"
    >
      {enabled && (
        <Canvas
          camera={{
            position: [0, 0, 6.7],
            fov: 42,
            near: 0.1,
            far: 100,
          }}
          dpr={[1, 1.5]}
          frameloop={inView ? "always" : "never"}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
        >
          <ambientLight intensity={1.7} />

          <directionalLight
            position={[3, 4, 5]}
            intensity={4}
            color="#f4ebff"
          />

          <directionalLight
            position={[-4, -2, 3]}
            intensity={2.8}
            color="#8150ff"
          />

          <directionalLight
            position={[1, -4, -3]}
            intensity={2}
            color="#d0baff"
          />

          <Sculpture />
        </Canvas>
      )}

      <div className={styles.artifactCaption}>
        <span>FORM / 001</span>
        <span>DESIGN IN MOTION</span>
      </div>
    </div>
  );
}
