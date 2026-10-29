/**
 * HeroSection — cinematic landing hero built around public/studio.png.
 * Two-column on desktop, stacked on mobile. Parallax + glow + particles are
 * restrained and disabled under prefers-reduced-motion.
 */
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Compass, Eye, FileCheck2 } from "lucide-react";
import ImageShowcase from "./ImageShowcase";
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

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden pt-24 pb-16">
      {/* Atmospheric light field */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-[10%] w-[520px] h-[520px] bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[420px] h-[420px] bg-sky-700/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] bg-violet-600/5 rounded-full blur-3xl" />
      </div>
      {!reduce && <ParticleField count={18} />}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* Copy column */}
          <div>
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
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.04] tracking-tight mb-6"
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
              className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mb-8"
            >
              {content.subheadline}
            </motion.p>

            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="flex flex-wrap gap-4 mb-10"
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
              className="flex flex-wrap gap-x-6 gap-y-3"
            >
              {trustIndicators.map((t) => (
                <span key={t.text} className="flex items-center gap-2 text-xs text-slate-400">
                  <t.icon className="w-4 h-4 text-brand-400" />
                  {t.text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Studio image — dominant visual */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className={!reduce ? "animate-slow-float" : undefined}
          >
            <ImageShowcase
              src="/studio.png"
              alt="Creator studio environment representing the MediasMakers creator growth workspace"
              className="aspect-[4/3]"
              parallax={36}
              eager
              caption="Your growth workspace · strategy-led, AI-assisted"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
