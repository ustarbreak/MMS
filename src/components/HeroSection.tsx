/**
 * HeroSection — cinematic landing hero using public/studio.png as a dimmed,
 * full-width background behind centered headline content. Subtle slow zoom
 * (Ken Burns) + scroll parallax; all motion disabled under prefers-reduced-motion.
 */
import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Compass, Eye, FileCheck2 } from "lucide-react";
import ParticleField from "./ParticleField";
import { homeContent } from "../config/site";

const trustIndicators = [
  { icon: Compass, text: "Strategy-first growth" },
  { icon: Eye, text: "Transparent pricing & deliverables" },
  { icon: FileCheck2, text: "Actionable files you can use" },
];

export default function HeroSection() {
  const reduce = useReducedMotion();
  const content = homeContent.hero;
  const [line1, line2] = content.headline.split("\n");

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Slow drift of the background image while scrolling out of view.
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Dimmed full-width studio image background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <motion.div style={reduce ? undefined : { y: bgY }} className="absolute -inset-x-0 -top-[10%] h-[120%]">
          <img
            src="/studio.png"
            alt=""
            role="presentation"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className={
              "w-full h-full object-cover object-center opacity-60 saturate-110 brightness-110 contrast-105 " +
              (reduce ? "" : "animate-hero-zoom")
            }
          />
        </motion.div>
        {/* Readability overlays: flat dark tint + radial focus + bottom fade into page */}
        <div className="absolute inset-0 bg-navy-950/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/15 to-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0)_0%,rgba(2,6,23,0.35)_75%,rgba(2,6,23,0.75)_100%)]" />
        {/* Restrained cyan glow behind the headline area */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[640px] h-[420px] bg-brand-500/10 rounded-full blur-3xl" />
      </div>

      {!reduce && <ParticleField count={14} />}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-600/10 border border-brand-500/25 text-brand-300 text-xs font-semibold mb-6"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-brand-400 opacity-60 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-brand-400" />
          </span>
          AI speed · Expert judgment · Real growth
        </motion.div>

        <motion.h1
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.04] tracking-tight mb-6 [text-shadow:0_2px_24px_rgba(2,6,23,0.85),0_1px_3px_rgba(2,6,23,0.9)]"
        >
          {line1}
          <br />
          <span className="bg-gradient-to-r from-brand-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
            {line2}
          </span>
        </motion.h1>

        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto mb-8 [text-shadow:0_1px_16px_rgba(2,6,23,0.9)]"
        >
          {content.subheadline}
        </motion.p>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl text-sm transition-all hover:shadow-xl hover:shadow-brand-600/25 hover:-translate-y-0.5"
          >
            {content.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 text-sm transition-all hover:-translate-y-0.5"
          >
            {content.secondaryCta}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-3"
        >
          {trustIndicators.map((t) => (
            <span key={t.text} className="flex items-center gap-2 text-xs text-slate-300">
              <t.icon className="w-4 h-4 text-brand-400" />
              {t.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
