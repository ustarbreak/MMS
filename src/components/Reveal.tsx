/**
 * Reveal — scroll-triggered entrance wrapper.
 * Respects prefers-reduced-motion (opacity-only, no translation).
 */
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { revealUp, reducedReveal } from "../lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating in (used for simple staggering). */
  delay?: number;
}

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={reduce ? reducedReveal : revealUp}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
