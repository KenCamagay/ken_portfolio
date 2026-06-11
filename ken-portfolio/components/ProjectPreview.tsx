"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type ProjectPreviewProps = {
  title: string;
  images?: string[];
  featured?: boolean;
};

export default function ProjectPreview({
  title,
  images = [],
  featured = false,
}: ProjectPreviewProps) {
  const previewImages = images.slice(0, 5);
  const hasImages = previewImages.length > 0;

  const [activeImage, setActiveImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (previewImages.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % previewImages.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [previewImages.length, isPaused]);

  if (!hasImages) {
    return (
      <div className="flex h-full min-h-72 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5">
            <ArrowUpRight className="h-8 w-8 text-blue-300" />
          </div>
          <p className="text-sm font-medium text-slate-400">Project Preview</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-full min-h-72 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-3 shadow-inner shadow-black/40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_45%)]" />

      <div className="relative z-10 flex h-full flex-col gap-3">
        <div
          className={`relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/30 ${
            featured ? "min-h-[390px]" : "min-h-[240px]"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${title}-${activeImage}`}
              initial={{
                opacity: 0,
                scale: 1.03,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.985,
                filter: "blur(6px)",
              }}
              transition={{
                duration: 0.42,
                ease: "easeOut",
              }}
              className="absolute inset-0"
            >
              <Image
                src={previewImages[activeImage]}
                alt={`${title} preview ${activeImage + 1}`}
                fill
                priority={featured && activeImage === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-xs text-white/80 backdrop-blur">
            preview {activeImage + 1}/{previewImages.length}
          </div>
        </div>

        {previewImages.length > 1 && (
          <div>
            <div className="grid grid-cols-5 gap-2">
              {previewImages.map((image, index) => (
                <button
                  key={`${title}-${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show ${title} preview ${index + 1}`}
                  className={`relative h-14 overflow-hidden rounded-xl border transition ${
                    activeImage === index
                      ? "border-cyan-300/70"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${title} thumbnail ${index + 1}`}
                    fill
                    sizes="100px"
                    className={`object-cover transition duration-300 ${
                      activeImage === index
                        ? "scale-105 opacity-100"
                        : "opacity-50 hover:opacity-90"
                    }`}
                  />

                  <div
                    className={`absolute inset-0 ${
                      activeImage === index
                        ? "bg-cyan-300/10"
                        : "bg-slate-950/35"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                key={`${title}-progress-${activeImage}`}
                initial={{ width: "0%" }}
                animate={{ width: isPaused ? "0%" : "100%" }}
                transition={{
                  duration: isPaused ? 0 : 4.2,
                  ease: "linear",
                }}
                className="h-full bg-cyan-300"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}