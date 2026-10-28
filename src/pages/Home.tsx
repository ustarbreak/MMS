import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles, Target, Users, BarChart3, Zap, Globe } from "lucide-react";
import { products, homeContent, currencyConfig, Currency } from "../config/site";
import ProductCard from "../components/ProductCard";
import CurrencyToggle from "../components/CurrencyToggle";
import FAQSection from "../components/FAQSection";
import CTASection from "../components/CTASection";

const features = [
  { icon: Target, text: "Data-driven content strategy" },
  { icon: Users, text: "Audience growth frameworks" },
  { icon: Sparkles, text: "AI-assisted content creation" },
  { icon: Globe, text: "Morocco & international markets" },
  { icon: BarChart3, text: "Performance analytics" },
  { icon: Zap, text: "Fast turnaround times" },
];

export default function Home() {
  const [currency, setCurrency] = useState<Currency>(currencyConfig.default);
  const content = homeContent;

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "4s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-600/10 border border-brand-500/20 text-brand-300 text-xs font-medium mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                AI-Assisted Creator Growth
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 whitespace-pre-line">
                {content.hero.headline.split("\n")[0]}
                <br />
                <span className="bg-gradient-to-r from-brand-400 to-cyan-400 bg-clip-text text-transparent">
                  {content.hero.headline.split("\n")[1]}
                </span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
                {content.hero.subheadline}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-brand-600/20"
                >
                  {content.hero.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-all"
                >
                  {content.hero.secondaryCta}
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-5 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-brand-400" />
                  Based in Morocco
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-brand-400" />
                  Serving globally
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-brand-400" />
                  Transparent pricing
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-cyan-500/5 rounded-3xl blur-2xl" />
                <div className="relative bg-surface-800/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-3">
                    {features.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-700/50 border border-white/5"
                      >
                        <f.icon className="w-4 h-4 text-brand-400 shrink-0" />
                        <span className="text-xs text-slate-300">{f.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {content.problems.title}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {content.problems.subtitle}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {content.problems.items.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-800/50 border border-white/5 rounded-xl p-6 hover:border-brand-500/20 transition-colors"
              >
                <h3 className="text-white font-semibold text-sm mb-2">
                  {problem.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="pricing" className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Our Products
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-6">
              Three focused products designed to deliver real value at every stage.
            </p>
            <CurrencyToggle currency={currency} onChange={setCurrency} />
          </motion.div>

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

          <p className="text-center text-xs text-slate-600 mt-8">
            Prices are launch prices and may be adjusted. All services delivered with transparency.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {content.howItWorks.title}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {content.howItWorks.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {content.howItWorks.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="text-5xl font-black text-brand-600/20 mb-3">{step.number}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors"
            >
              Learn more about our process
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Example Deliverables */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Sample Deliverables
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
              These are examples of what you'll receive. Actual deliverables are customized to your brand and goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-800/50 border border-white/5 rounded-xl p-6"
              >
                <h3 className="text-white font-semibold text-sm mb-4">{product.name}</h3>
                <ul className="space-y-2">
                  {product.deliverables.map((d, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-400 mt-0.5 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {content.benefits.title}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {content.benefits.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {content.benefits.groups.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-800/50 border border-white/5 rounded-xl p-6"
              >
                <h3 className="text-white font-semibold mb-4">{group.title}</h3>
                <ul className="space-y-2.5">
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                      <CheckCircle className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection title={content.faq.title} items={content.faq.items} />

      {/* Final CTA */}
      <CTASection />
    </div>
  );
}
