import { motion } from "framer-motion";
import { Music, Mic2, Headphones, Radio, CheckCircle, AlertTriangle } from "lucide-react";
import { forArtistsContent } from "../config/site";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";
import ImageShowcase from "../components/ImageShowcase";

export default function ForArtists() {
  const content = forArtistsContent;

  return (
    <div>
      <PageHero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        badge="For Artists & Musicians"
      />

      {/* Made for Artists — supplied brand imagery (release.png) */}
      <section className="py-12 lg:py-16 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImageShowcase
            src="/release.png"
            alt="Independent musician release campaign visual for MediasMakers artist growth strategy"
            className="w-full"
            parallax={16}
            caption="Your next release deserves more than a post."
          />
        </div>
      </section>

      {/* Challenges */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-3">Sound Familiar?</h2>
            <p className="text-slate-400 text-sm">
              These are real challenges that artists face every day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {content.challenges.map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-800/50 border border-white/5 rounded-xl p-6"
              >
                <AlertTriangle className="w-5 h-5 text-amber-400 mb-3" />
                <h3 className="text-white font-semibold text-sm mb-2">{challenge.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{challenge.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-3">How We Help Artists</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              We understand the unique challenges of promoting music and art on social media.
              Here's what we bring to the table.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {content.whatWeOffer.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 bg-surface-800/50 border border-white/5 rounded-xl p-4"
              >
                <CheckCircle className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Icons Section */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Music, label: "Release Strategy" },
              { icon: Mic2, label: "Content Creation" },
              { icon: Headphones, label: "Fan Engagement" },
              { icon: Radio, label: "Platform Growth" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-600/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-brand-400" />
                </div>
                <p className="text-sm text-slate-300 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Honest Note */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-800/50 border border-amber-500/10 rounded-xl p-6"
          >
            <h3 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              An Honest Note
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We don't guarantee streams, followers, or sales. What we do is give you the strategy,
              content, and tools to maximize your chances of connecting with the right audience.
              Your music is great — we help people find it.
            </p>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Let's Get Your Music Heard"
        description="Start with a Creator Audit to understand your current social media position, or jump straight into a Content Pack built for musicians."
        ctaText="Plan My Next Release"
        ctaLink="/get-started"
        secondaryText="Contact Us"
        secondaryLink="/contact"
      />
    </div>
  );
}
