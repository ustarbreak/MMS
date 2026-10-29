/**
 * Shared motion presets — the single source of truth for the site's animation system.
 * All reveal/entrance animations respect `prefers-reduced-motion` via useReducedMotion().
 */
import type { Transition, Variants } from "framer-motion";

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transitionDefault: Transition = { duration: 0.55, ease: EASE_OUT };

/** Standard section-entrance reveal (used with whileInView). */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionDefault,
  },
};

/** Softer reveal for small elements (badges, chips, icons). */
export const revealFade: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

/** Staggered container — pair children with itemVariants. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

/** Reduced-motion fallback variants (opacity only, no translation). */
export const reducedReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
};
