/**
 * HowItWorksJourney — four-step scroll-animated journey used on Home and How It Works.
 * Steps mirror the real process: intake → AI-assisted analysis → roadmap → apply & refine.
 */
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { PenLine, Cpu, Map, Rocket } from "lucide-react";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    icon: PenLine,
    number: "01",
    title: "Tell us about your goals",
    description:
      "Complete a short intake: your niche, platforms, audience, objective, and the challenges you're facing. Ten minutes of context changes everything.",
    detail: "You receive: a confirmed order reference and a clear scope of deliverables.",
  },
  {
    icon: Cpu,
    number: "02",
    title: "AI analyzes, strategy structures",
    description:
      "AI workflows accelerate research across your profile, niche, and competitors. The findings are organized into a strategic framework rather than raw data.",
    detail: "In progress: your order moves through analysis and strategy stages you can track.",
  },
  {
    icon: Map,
    number: "03",
    title: "Receive your personalized roadmap",
    description:
      "You get a prioritized strategic roadmap: positioning notes, content pillars, formats, and a publishing plan built around your actual available time.",
    detail: "You receive: the files listed on your product page — reports, calendars, captions, hooks.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Apply, measure, refine",
    description:
      "Implement the plan, watch the metrics that matter, and iterate. Growth Partner clients continue the loop month after month with fresh reporting.",
    detail: "Ongoing: simple KPI guidance tells you what to keep and what to change.",
  },
];

export default function HowItWorksJourney({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <section id="how" className={`border-t border-white/5 ${compact ? "py-20" : "py-20 lg:py-24"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="How it works"
          title="From your goals to a plan you can"
          accent="actually run."
          subtitle="A transparent four-step process. No mystery retainers, no black-box 'growth' — just structured work with visible outputs at every stage."
        />

        <div className="relative grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* Connector line (desktop) */}
          <div
            aria-hidden="true"
            className="hidden xl:block absolute top-[52px] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"
          />
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-surface-800/60 border border-white/5 rounded-2xl p-6 hover:border-brand-500/25 hover:shadow-lg hover:shadow-brand-600/5 transition-colors group"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-brand-600/15 border border-brand-500/25 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <step.icon className="w-5 h-5 text-brand-400" />
                </div>
                <span className="text-3xl font-black text-white/5 group-hover:text-brand-500/20 transition-colors">
                  {step.number}
                </span>
              </div>
              <h3 className="text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{step.description}</p>
              <p className="text-xs text-brand-300/80 border-t border-white/5 pt-3 leading-relaxed">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors"
          >
            See the full process, timelines, and what's live vs. planned
          </Link>
        </div>
      </div>
    </section>
  );
}
