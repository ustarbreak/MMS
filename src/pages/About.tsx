import { motion } from "framer-motion";
import { aboutContent } from "../config/site";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";

export default function About() {
  const content = aboutContent;

  return (
    <div>
      <PageHero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        badge="About Us"
      />

      {/* Story */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">{content.story.title}</h2>
            <div className="space-y-4">
              {content.story.paragraphs.map((p, i) => (
                <p key={i} className="text-slate-400 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-3">Our Values</h2>
            <p className="text-slate-400 text-sm">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {content.values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-800/50 border border-white/5 rounded-xl p-6"
              >
                <h3 className="text-white font-semibold mb-2">{value.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Honest Statement */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-800/50 border border-brand-500/10 rounded-xl p-8 text-center"
          >
            <h3 className="text-white font-semibold text-lg mb-3">Our Promise</h3>
            <p className="text-slate-400 leading-relaxed">
              We will never fabricate testimonials, inflate statistics, or make promises
              we can't keep. What you see on this website is real. Our services are designed
              to provide genuine value — the results depend on your effort, your niche, and
              many factors we can't control. We're honest about what we can and cannot do.
            </p>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Want to Work Together?"
        description="Get in touch to discuss how we can help you grow your social media presence."
        ctaText="Contact Us"
        ctaLink="/contact"
        secondaryText="See Services"
        secondaryLink="/services"
      />
    </div>
  );
}
