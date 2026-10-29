/**
 * ArtistsSection — "Made for Artists" using public/release.png.
 * Used on Home (teaser) and adapted within the ForArtists page.
 */
import { Link } from "react-router-dom";
import { ArrowRight, Disc3, Megaphone, CalendarHeart } from "lucide-react";
import ImageShowcase from "./ImageShowcase";
import Reveal from "./Reveal";

export default function ArtistsSection() {
  return (
    <section id="artists" className="py-20 lg:py-24 border-t border-white/5 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_80%_60%,rgba(99,102,241,0.06),transparent_50%),radial-gradient(ellipse_at_15%_20%,rgba(8,145,178,0.06),transparent_45%)]"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy — image dominant on desktop right; stacked below on mobile via order */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400 mb-3">
                Made for Artists
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-5">
                Your next release deserves{" "}
                <span className="bg-gradient-to-r from-brand-400 via-violet-300 to-sky-400 bg-clip-text text-transparent">
                  more than a post.
                </span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Independent musicians shouldn't have to choose between making music and marketing
                it. We help you plan campaigns around releases, build consistent content between
                them, create short-form video concepts that feel like you, and run one coherent
                promotional story from first teaser to post-release follow-up.
              </p>
            </Reveal>

            <div className="space-y-3 mb-8">
              {[
                { icon: Megaphone, text: "Release campaign milestones: tease → pre-save → launch day → follow-up" },
                { icon: Disc3, text: "Short-form concepts: studio moments, story behind the track, performance clips" },
                { icon: CalendarHeart, text: "A content calendar that keeps you visible between releases, not just on them" },
              ].map((item, i) => (
                <Reveal key={i} delay={0.1 + i * 0.07}>
                  <div className="flex items-start gap-3 text-sm text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-brand-600/15 border border-brand-500/25 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-brand-400" />
                    </div>
                    <p className="leading-relaxed pt-1">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.25}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/for-artists"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/25"
                >
                  Plan My Next Release
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/creator-content-pack"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl border border-white/10 transition-all"
                >
                  See the Content Pack
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Image dominant */}
          <Reveal className="order-1 lg:order-2">
            <ImageShowcase
              src="/release.png"
              alt="Independent musician planning a release campaign with MediasMakers"
              className="aspect-[4/3]"
              parallax={28}
              caption="TEASER → RELEASE → COMMUNITY"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
