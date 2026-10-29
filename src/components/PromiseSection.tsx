/**
 * PromiseSection — "Our Promise: AI Speed. Expert Judgment." using public/ai.png.
 */
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Eye, Scale } from "lucide-react";
import ImageShowcase from "./ImageShowcase";
import Reveal from "./Reveal";

export default function PromiseSection() {
  return (
    <section id="promise-ai" className="py-20 lg:py-24 border-t border-white/5 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_20%_30%,rgba(8,145,178,0.07),transparent_50%)]"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <Reveal>
            <ImageShowcase
              src="/ai.png"
              alt="AI-assisted strategy workflow at MediasMakers — machine speed guided by human judgment"
              className="aspect-[4/3]"
              parallax={30}
              caption="AI workflows · structured with human checkpoints"
            />
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400 mb-3">
                Our promise
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-5">
                AI Speed.{" "}
                <span className="bg-gradient-to-r from-brand-400 to-cyan-300 bg-clip-text text-transparent">
                  Expert Judgment.
                </span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                AI helps us move faster. Strategy helps us move in the right direction. Every
                deliverable is designed to turn your objectives into clear, actionable next steps —
                research and drafting accelerated by AI workflows, organized and quality-checked
                through a human-led review process before delivery.
              </p>
            </Reveal>

            <div className="space-y-4 mb-8">
              {[
                { icon: Cpu, title: "AI accelerates the grunt work", text: "Research sweeps, first-draft ideation, and structured planning happen in minutes, not days." },
                { icon: Eye, title: "Humans set the direction", text: "Prioritization, tone, and strategic fit are handled through our review workflow — not left to raw model output." },
                { icon: Scale, title: "Honest about limits", text: "We don't claim every file is hand-written. We claim every order passes a defined quality process before it reaches you." },
              ].map((item, i) => (
                <Reveal key={item.title} delay={0.1 + i * 0.08}>
                  <div className="flex gap-4 items-start bg-surface-800/50 border border-white/5 rounded-xl p-4">
                    <div className="w-9 h-9 rounded-lg bg-brand-600/15 border border-brand-500/25 flex items-center justify-center shrink-0">
                      <item.icon className="w-4.5 h-4.5 text-brand-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-0.5">{item.title}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-200 transition-colors group"
              >
                See what each package delivers
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
