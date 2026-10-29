/**
 * GrowthSnapshot — interactive "AI Growth Snapshot" explorer.
 *
 * IMPORTANT / HONESTY: This tool is an explicitly-labeled DEMO. It uses a
 * deterministic, rule-based sample engine (no live AI provider is called).
 * The output is clearly marked as a sample so visitors are never misled.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Layers,
  Clapperboard,
  CalendarDays,
  Gauge,
  Sparkles,
} from "lucide-react";

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}

function SelectField({ label, value, onChange, options }: FieldProps) {
  const id = `snapshot-${label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-slate-300">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-navy-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20 outline-none transition-colors"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

const CREATOR_TYPES = ["Musician / Artist", "Streamer / Content Creator", "Influencer", "Small Business / Brand"];
const PLATFORMS = ["Instagram", "TikTok", "YouTube", "Twitch", "Multiple platforms"];
const NICHES = ["Music", "Gaming", "Lifestyle", "Education", "Fitness", "Food", "Tech", "Art & Design", "Business"];
const OBJECTIVES = [
  "Grow a relevant audience",
  "Promote a release or launch",
  "Increase content consistency",
  "Generate leads or sales",
  "Build community engagement",
];
const AUDIENCES = ["Under 1,000", "1,000 – 10,000", "10,000 – 50,000", "50,000+", "Not sure"];
const TIMES = ["Under 2 hours / week", "2–5 hours / week", "5–10 hours / week", "10+ hours / week"];

/* ── Deterministic sample-strategy engine (demo data only) ─────────────────── */

const PILLARS: Record<string, string[]> = {
  "Musician / Artist": ["Behind the music", "Release moments", "Fan connection", "Craft in progress"],
  "Streamer / Content Creator": ["Best-of clips", "Personality & commentary", "Community highlights", "How I do it"],
  Influencer: ["Signature point of view", "Day-in-the-life", "Value & tips", "Trending formats, your twist"],
  "Small Business / Brand": ["Product education", "Customer stories", "Behind the brand", "Offers & launches"],
};

const FORMATS: Record<string, string[]> = {
  Instagram: ["Reels with strong first-frame hooks", "Carousel mini-guides", "Stories polls & Q&A"],
  TikTok: ["15–30s talking-hook videos", "Series episodes (Part 1/2/3)", "Trend sounds with niche twist"],
  YouTube: ["Shorts repurposed from long-form", "Search-driven how-to titles", "Community posts for polls"],
  Twitch: ["Clip channels on TikTok/YT", "Schedule teasers before streams", "Highlight reels weekly"],
  "Multiple platforms": ["One pillar → three native formats", "Vertical video everywhere", "Platform-specific CTAs"],
};

const WEEK_PLAN = [
  ["Mon", "Pillar intro post — state who you serve and why"],
  ["Tue", "Short-form video: hook + one practical tip"],
  ["Wed", "Behind-the-scenes story sequence (3 frames)"],
  ["Thu", "Value carousel or thread: '3 mistakes in your niche'"],
  ["Fri", "Community prompt: question or poll in Stories"],
  ["Sat", "Best-performing format remix (double down)"],
  ["Sun", "Weekly recap + plan next week's single priority"],
];

const KPIS = [
  "Reach per post (7-day median)",
  "Profile visits → follow rate",
  "Average watch time on short video",
  "Saves & shares vs. likes ratio",
  "Consistency: posts shipped per week",
];

function recommendService(time: string, objective: string): { name: string; slug: string; why: string } {
  if (objective === "Promote a release or launch" && time !== "Under 2 hours / week") {
    return {
      name: "Monthly Growth Partner",
      slug: "/monthly-growth-partner",
      why: "A launch needs ongoing planning, publishing-ready copy, and iteration across weeks — that's what the monthly partnership is built for.",
    };
  }
  if (time === "Under 2 hours / week" || time === "2–5 hours / week") {
    return {
      name: "Creator Content Pack",
      slug: "/creator-content-pack",
      why: "With limited time, a ready-made 30-day calendar, captions, and hooks removes the daily 'what do I post?' decision.",
    };
  }
  return {
    name: "Creator Audit",
    slug: "/creator-audit",
    why: "Start with a clear diagnosis of your profile and positioning, then act on a prioritized seven-day plan.",
  };
}

export default function GrowthSnapshot() {
  const reduce = useReducedMotion();
  const [creatorType, setCreatorType] = useState(CREATOR_TYPES[0]);
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [niche, setNiche] = useState(NICHES[0]);
  const [objective, setObjective] = useState(OBJECTIVES[0]);
  const [audience, setAudience] = useState(AUDIENCES[1]);
  const [time, setTime] = useState(TIMES[1]);
  const [generated, setGenerated] = useState(false);

  const result = useMemo(() => {
    const pillars = PILLARS[creatorType] ?? PILLARS.Influencer;
    const formats = FORMATS[platform] ?? FORMATS.Instagram;
    const service = recommendService(time, objective);
    const priorities = [
      `Clarify positioning: one sentence that tells ${niche.toLowerCase()} audiences why you matter`,
      objective === "Grow a relevant audience"
        ? "Publish against 3 repeatable content pillars instead of random ideas"
        : objective === "Promote a release or launch"
          ? "Build a milestone calendar: teaser → pre-save/waitlist → launch day → follow-up"
          : objective === "Increase content consistency"
            ? "Batch one week of content in a single session; keep a running idea bank"
            : objective === "Generate leads or sales"
              ? "Add one clear call to action per post and track profile-visit conversions"
              : "Reply to every comment in the first hour and feature community moments",
      `Review weekly metrics on ${platform} and keep only what compounds`,
    ];
    return { pillars, formats, service, priorities };
  }, [creatorType, platform, niche, objective, time]);

  return (
    <section id="snapshot" className="py-20 lg:py-24 border-t border-white/5 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_70%_0%,rgba(8,145,178,0.08),transparent_55%)]"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-600/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Preview · Demo Mode
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Try the{" "}
            <span className="bg-gradient-to-r from-brand-400 to-cyan-300 bg-clip-text text-transparent">
              AI Growth Snapshot
            </span>
          </h2>
          <p className="text-slate-400 mt-4 leading-relaxed">
            Explore a sample strategy built from your inputs. This demo runs on a deterministic
            rule-based engine — no live AI service is called — so you can see the shape of a real
            roadmap before ordering.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* Inputs */}
          <div className="lg:col-span-2 bg-surface-800/60 border border-white/5 rounded-2xl p-6 lg:p-7 backdrop-blur-sm">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-brand-600/15 border border-brand-500/25 flex items-center justify-center">
                <Compass className="w-4.5 h-4.5 text-brand-400" />
              </div>
              <h3 className="text-white font-semibold">About you</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <SelectField label="Creator type" value={creatorType} onChange={setCreatorType} options={CREATOR_TYPES} />
              <SelectField label="Main platform" value={platform} onChange={setPlatform} options={PLATFORMS} />
              <SelectField label="Niche / industry" value={niche} onChange={setNiche} options={NICHES} />
              <SelectField label="Primary objective" value={objective} onChange={setObjective} options={OBJECTIVES} />
              <SelectField label="Current audience" value={audience} onChange={setAudience} options={AUDIENCES} />
              <SelectField label="Time for content" value={time} onChange={setTime} options={TIMES} />
            </div>
            <button
              onClick={() => setGenerated(true)}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
            >
              Generate sample roadmap
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
              Demo only: nothing is sent anywhere. Your selections stay in this browser tab.
            </p>
          </div>

          {/* Output */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {!generated ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[420px] flex flex-col items-center justify-center text-center bg-surface-800/30 border border-dashed border-white/10 rounded-2xl p-10"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-600/10 border border-brand-500/20 flex items-center justify-center mb-4">
                    <Layers className="w-5 h-5 text-brand-400" />
                  </div>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Fill in a few details and generate a sample strategic snapshot — priorities,
                    pillars, formats, a 7-day plan, and recommended service.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={`${creatorType}-${platform}-${objective}-${time}`}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-surface-800/60 border border-white/5 rounded-2xl p-5">
                      <h4 className="text-brand-300 text-xs font-bold uppercase tracking-wider mb-3">
                        Strategic priorities
                      </h4>
                      <ol className="space-y-2.5">
                        {result.priorities.map((p, i) => (
                          <li key={i} className="flex gap-2.5 text-sm text-slate-300 leading-relaxed">
                            <span className="text-brand-400 font-bold shrink-0">{i + 1}.</span>
                            {p}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-surface-800/60 border border-white/5 rounded-2xl p-5">
                        <h4 className="text-brand-300 text-xs font-bold uppercase tracking-wider mb-3">
                          Content pillars
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {result.pillars.map((p) => (
                            <span
                              key={p}
                              className="px-2.5 py-1 rounded-lg bg-brand-600/10 border border-brand-500/20 text-xs text-brand-200"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-surface-800/60 border border-white/5 rounded-2xl p-5">
                        <h4 className="text-brand-300 text-xs font-bold uppercase tracking-wider mb-3">
                          Suggested formats
                        </h4>
                        <ul className="space-y-1.5">
                          {result.formats.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                              <Clapperboard className="w-3.5 h-3.5 text-brand-400 mt-1 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-800/60 border border-white/5 rounded-2xl p-5">
                    <h4 className="text-brand-300 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" /> Sample 7-day publishing plan
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                      {WEEK_PLAN.map(([day, task]) => (
                        <div key={day} className="bg-navy-950/60 border border-white/5 rounded-xl p-2.5">
                          <p className="text-[10px] font-bold text-brand-400 uppercase mb-1">{day}</p>
                          <p className="text-[11px] text-slate-400 leading-snug">{task}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-b from-brand-600/10 to-surface-800/60 border border-brand-500/25 rounded-2xl p-5">
                      <h4 className="text-brand-300 text-xs font-bold uppercase tracking-wider mb-2">
                        Recommended service
                      </h4>
                      <p className="text-white font-semibold mb-1.5">{result.service.name}</p>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">{result.service.why}</p>
                      <Link
                        to={result.service.slug}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 hover:text-brand-200 transition-colors"
                      >
                        View this service <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <div className="bg-surface-800/60 border border-white/5 rounded-2xl p-5">
                      <h4 className="text-brand-300 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5" /> KPIs to monitor
                      </h4>
                      <ul className="space-y-1.5">
                        {KPIS.map((k) => (
                          <li key={k} className="flex items-start gap-2 text-xs text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                            {k}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center">
                    Sample output generated by a deterministic demo engine · labeled as demo, not a live AI result.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
