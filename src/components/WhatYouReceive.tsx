/**
 * WhatYouReceive — honest social-proof alternative.
 * No fabricated customers, ratings, or results: instead we show exactly what a
 * delivered order contains (sample previews from the real deliverable structure).
 */
import { FileText, CalendarDays, Download } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const samples = [
  {
    icon: FileText,
    title: "Creator Audit — sample report outline",
    items: [
      "Profile & positioning scorecard",
      "Content gap analysis with examples",
      "Audience and competitor snapshot",
      "Prioritized seven-day action plan",
    ],
    note: "Structure preview · actual content customized per order",
  },
  {
    icon: CalendarDays,
    title: "Content Pack — sample calendar week",
    items: [
      "Mon: pillar intro post + caption draft",
      "Tue: short-video hook + CTA pairing",
      "Thu: value carousel outline",
      "Sat: remix of best performer",
    ],
    note: "Week 1 of a 30-day calendar · ideas tailored to your niche",
  },
  {
    icon: Download,
    title: "Every order ships as usable files",
    items: [
      "Clean documents you can edit",
      "Checklists you can actually finish",
      "Copy drafts ready to adapt",
      "Plain-language strategy notes",
    ],
    note: "Delivered by email / portal once your order is completed",
  },
];

export default function WhatYouReceive() {
  return (
    <section className="py-20 lg:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="What you'll receive"
          title="No invented testimonials."
          accent="Just clear deliverables."
          subtitle="We don't fabricate customer stories or growth numbers. Instead, here's exactly the kind of material your order produces — so you can judge the value before you buy."
        />

        <div className="grid md:grid-cols-3 gap-5">
          {samples.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="h-full bg-surface-800/50 border border-white/5 rounded-2xl p-6 hover:border-brand-500/20 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-brand-600/15 border border-brand-500/25 flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-4">{s.title}</h3>
                <ul className="space-y-2.5 mb-4">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-slate-500 border-t border-white/5 pt-3">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
