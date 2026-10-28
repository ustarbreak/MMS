import { useState } from "react";
import { motion } from "framer-motion";
import { products, servicesContent, currencyConfig, Currency } from "../config/site";
import PageHero from "../components/PageHero";
import ProductCard from "../components/ProductCard";
import CurrencyToggle from "../components/CurrencyToggle";
import CTASection from "../components/CTASection";

export default function Services() {
  const [currency, setCurrency] = useState<Currency>(currencyConfig.default);

  return (
    <div>
      <PageHero
        title={servicesContent.hero.title}
        subtitle={servicesContent.hero.subtitle}
        badge="Our Services"
      />

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <CurrencyToggle currency={currency} onChange={setCurrency} />
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                delay={i * 0.15}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-bold text-white mb-3">Which One Is Right for You?</h2>
            <p className="text-slate-400 text-sm">A quick guide to choosing the right package.</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                title: "Start with Creator Audit if...",
                description: "You're not sure where to begin. You want a clear picture of your current position before investing in content or ongoing support.",
                highlight: "Best for: Getting clarity",
              },
              {
                title: "Choose Creator Content Pack if...",
                description: "You know your strategy but need content. You want a full month of ideas, captions, and a calendar ready to go.",
                highlight: "Best for: Consistent content",
              },
              {
                title: "Go with Growth Partner if...",
                description: "You're ready for ongoing support. You want a dedicated partner who plans, creates, and optimizes your social media month after month.",
                highlight: "Best for: Sustained growth",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-800/50 border border-white/5 rounded-xl p-6"
              >
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-2">{item.description}</p>
                <span className="text-xs text-brand-400 font-medium">{item.highlight}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not Sure Where to Start?"
        description="Contact us and we'll help you choose the right package for your goals and budget."
        ctaText="Contact Us"
        ctaLink="/contact"
        secondaryText="How It Works"
        secondaryLink="/how-it-works"
      />
    </div>
  );
}
