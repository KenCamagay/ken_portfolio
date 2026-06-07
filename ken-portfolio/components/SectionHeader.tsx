"use client";

import { motion } from "motion/react";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="mx-auto mb-12 max-w-2xl text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-blue-300"
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.08, ease: "easeOut" }}
        className="text-3xl font-bold tracking-tight text-white sm:text-5xl"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.16, ease: "easeOut" }}
        className="mt-5 text-base leading-7 text-slate-400 sm:text-lg"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}