/**
 * ImageShowcase — cinematic image composition used with the supplied brand imagery
 * (/studio.png, /ai.png, /release.png). Provides a restrained cyan glow, subtle
 * scroll parallax, and a gradient rim — without heavy filters or WebGL.
 */
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ImageShowcaseProps {
  src: string;
  alt: string;
  /** Extra classes for the outer wrapper (sizing/rounding). */
  className?: string;
  /** Vertical parallax distance in pixels on scroll. Default 24. */
  parallax?: number;
  /** Render eagerly (hero images) or lazily (below-the-fold). */
  eager?: boolean;
  /** Optional floating glass caption chip rendered over the image. */
  caption?: string;
}

export default function ImageShowcase({
  src,
  alt,
  className = "",
  parallax = 24,
  eager = false,
  caption,
}: ImageShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [parallax, -parallax]);

  return (
    <div ref={ref} className={`relative group ${className}`}>
      {/* Ambient cyan glow behind the frame */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2rem] bg-brand-500/10 blur-3xl opacity-70 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none"
      />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
        <motion.img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          style={reduce ? undefined : { y }}
          className="w-full h-full object-cover scale-110 will-change-transform"
        />
        {/* Cinematic vignette + rim light */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-navy-950/60 via-transparent to-brand-400/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none"
        />
        {caption && (
          <div className="absolute bottom-4 left-4 px-3.5 py-2 rounded-xl bg-navy-950/80 backdrop-blur-md border border-white/10 text-xs font-medium text-brand-200 tracking-wide">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}
