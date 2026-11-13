
"use client";

import styles from "./KcScrollIntro.module.css";

const depths = [-12, -24, -36, -48, -60];

function Letter({
  character,
  className = "",
  part,
}: {
  character: string;
  className?: string;
  part: string;
}) {
  return (
    <span
      className={`${styles.letter} ${className}`}
      data-part={part}
      aria-hidden="true"
    >
      {depths.map((depth) => (
        <span
          key={depth}
          className={styles.depth}
          style={{
            transform: `translateZ(${depth}px)`,
          }}
        >
          {character}
        </span>
      ))}

      <span className={styles.face}>
        {character}
      </span>
    </span>
  );
}

export default function KcScrollIntro({
  onSkip,
}: {
  onSkip?: () => void;
}) {
  return (
    <section
      className={`${styles.intro} ${styles.embedded}`}
      data-kc-intro
      aria-label="K/C interactive portfolio introduction"
    >
      <div className={styles.stage}>
        <div
          className={styles.cornerTop}
          data-kc-header
        >
          <span>KEN CAMAGAY / 001</span>

          <button
            type="button"
            className={styles.skip}
            onClick={onSkip}
          >
            SKIP INTRO ↗
          </button>
        </div>

        <div
          className={styles.portal}
          data-kc-portal
          aria-hidden="true"
        />

        <div
          className={styles.reveal}
          data-kc-reveal
          aria-hidden="true"
        >
          <span>KEN CAMAGAY</span>
          <strong>DESIGN × DEVELOPMENT</strong>
          <small>PHILIPPINES / 2026</small>
        </div>

        <div className={styles.logoArea}>
          <div
            className={styles.logo}
            data-kc-logo
            role="img"
            aria-label="K slash C, Ken Camagay's monogram"
          >
            <Letter character="K" part="k" />

            <Letter
              character="/"
              part="slash"
              className={styles.slash}
            />

            <Letter character="C" part="c" />
          </div>
        </div>

        <div
          className={styles.sideNote}
          data-kc-side
          aria-hidden="true"
        >
          AN IDENTITY IN MOTION
        </div>

        <div
          className={styles.cornerBottom}
          data-kc-footer
        >
          <span>SCROLL TO OPEN THE MONOGRAM ↓</span>
          <span>IDENTITY / MOTION / DEPTH</span>
          <span>01 — ENTER</span>
        </div>

        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            data-kc-progress
          />
        </div>
      </div>
    </section>
  );
}
