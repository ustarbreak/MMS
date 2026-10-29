/**
 * TrustSection — honest positioning: what MediasMakers is, and what it never is.
 * No fabricated statistics or testimonials.
 */
import { ShieldX, Bot, Ban, TrendingUp, FileCheck2, Target } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const notUs = [
  { icon: ShieldX, title: "No fake followers", text: "We don't sell, add, or promise purchased audiences." },
  { icon: Bot, title: "No engagement bots", text: "No automated likes, comments, or artificial activity." },
  { icon: Ban, title: "No manipulation tactics", text: "No tricks that risk your account or violate platform rules." },
  { icon: TrendingUp, title: "No misleading promises", text: "Nobody can guarantee virality — we never claim otherwise." },
];

const pillars = [
  {
    icon: FileCheck2,
    title: "Transparent deliverables & pricing",
    text: "You see exactly what you receive before you pay. Clear files, clear scope, clear price.",
  },
  {
    icon: Target,
    title: "Strategy tailored to your goals",
    text: "Recommendations are built around your niche, audience, platform, and available time — not templates.",
  },
  {
    icon: FileCheck2,
    title: "Cheaper than an agency, sharper than a tool",
    text: "Agencies charge retainers most creators can't justify. SaaS tools give no judgment. We sit in between: strategy + deliverables at creator-friendly prices.",
  },
];

export default function TrustSection() {
  return (
    <section id="promise" className="py-20 lg:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Built for real people"
          title="Growth without the"
          accent="grey areas."
          subtitle="Most 'growth services' cut corners with fake engagement. Most agencies cost more than your revenue. Here's the line we draw — and what you get instead."
        />

        {/* What we never do */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {notUs.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="h-full bg-surface-800/50 border border-white/5 rounded-xl p-5 hover:border-red-400/20 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform">
                  <item.icon className="w-4.5 h-4.5 text-red-400/80" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* What we do instead */}
        <div className="grid md:grid-cols-3 gap-4">
          {pillars.map((item, i) => (
            <Reveal key={item.title} delay={0.1 + i * 0.08}>
              <div className="h-full bg-gradient-to-b from-brand-600/8 to-surface-800/60 border border-brand-500/15 rounded-xl p-6">
                <div className="w-9 h-9 rounded-lg bg-brand-600/15 border border-brand-500/25 flex items-center justify-center mb-3.5">
                  <item.icon className="w-4.5 h-4.5 text-brand-400" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1.5">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
