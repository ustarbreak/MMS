import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { howItWorksContent } from "../config/site";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";

export default function HowItWorks() {
  const content = howItWorksContent;

  return (
    <div>
      <PageHero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        badge="Our Process"
      />

      {/* Steps */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {content.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-brand-600/10 border border-brand-500/20 flex items-center justify-center">
                    <span className="text-brand-400 font-bold text-sm">{step.number}</span>
                  </div>
                </div>
                <div className="flex-1 pb-8 border-b border-white/5 last:border-0">
                  <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expectations */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-bold text-white mb-3">{content.expectations.title}</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {content.expectations.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
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

      <CTASection
        title="Ready to Start?"
        description="Choose a package that fits your needs and get started today."
        ctaText="See Our Services"
        ctaLink="/services"
        secondaryText="Contact Us"
        secondaryLink="/contact"
      />
    </div>
  );
}
