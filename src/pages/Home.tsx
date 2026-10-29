/**
 * Home — full cinematic landing page.
 * Composition order follows the conversion story:
 * Hero (studio.png) → Trust positioning → Pricing → How It Works → Our Promise (ai.png)
 * → Made for Artists (release.png) → AI Growth Snapshot (demo) → What you'll receive → Final CTA.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products, currencyConfig, Currency, homeContent } from "../config/site";
import HeroSection from "../components/HeroSection";
import TrustSection from "../components/TrustSection";
import ProductCard from "../components/ProductCard";
import CurrencyToggle from "../components/CurrencyToggle";
import HowItWorksJourney from "../components/HowItWorksJourney";
import PromiseSection from "../components/PromiseSection";
import ArtistsSection from "../components/ArtistsSection";
import GrowthSnapshot from "../components/GrowthSnapshot";
import WhatYouReceive from "../components/WhatYouReceive";
import FinalCTA from "../components/FinalCTA";
import FAQSection from "../components/FAQSection";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

export default function Home() {
  const [currency, setCurrency] = useState<Currency>(currencyConfig.default);

  return (
    <div>
      <HeroSection />

      {/* Problems we solve — kept from the existing content model */}
      <section className="py-20 lg:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="The creator's dilemma"
            title="The problems we"
            accent="actually solve."
            subtitle={homeContent.problems.subtitle}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {homeContent.problems.items.map((problem, i) => (
              <Reveal key={problem.title} delay={i * 0.07}>
                <div className="h-full bg-surface-800/50 border border-white/5 rounded-xl p-6 hover:border-brand-500/20 transition-colors">
                  <span className="text-[10px] font-bold text-brand-500/60 tracking-widest uppercase">
                    0{i + 1}
                  </span>
                  <h3 className="text-white font-semibold text-sm mt-2 mb-2">{problem.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{problem.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TrustSection />

      {/* Services & pricing — the three real products */}
      <section id="pricing" className="py-20 lg:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Services & pricing"
            title="Three plans. Honest prices."
            accent="Real deliverables."
            subtitle="No hidden retainers, no upsell mazes. Pick the scope that matches where you are today."
          />
          <div className="flex justify-center mb-10 -mt-4">
            <CurrencyToggle currency={currency} onChange={setCurrency} />
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} currency={currency} delay={i * 0.12} />
            ))}
          </div>
          <p className="text-center text-xs text-slate-600 mt-8">
            Prices are launch prices and may be adjusted. MAD display uses a configured reference rate —
            the exact charged amount is confirmed at checkout.
          </p>
          <div className="text-center mt-6">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors group"
            >
              Compare all deliverables in detail
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <HowItWorksJourney />
      <PromiseSection />
      <ArtistsSection />
      <GrowthSnapshot />
      <WhatYouReceive />

      {/* FAQ — existing content preserved */}
      <FAQSection title={homeContent.faq.title} items={homeContent.faq.items} />

      <FinalCTA />
    </div>
  );
}
