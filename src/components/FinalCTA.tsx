/**
 * FinalCTA — high-impact closing section: "Ready to Grow With a Plan?"
 * Shows the three real products and routes into working product/order pages.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products, currencyConfig, Currency } from "../config/site";
import Reveal from "./Reveal";
import ParticleField from "./ParticleField";

export default function FinalCTA() {
  const [currency] = useState<Currency>(currencyConfig.default);

  return (
    <section id="contact" className="py-20 lg:py-24 relative overflow-hidden">
      {/* Atmospheric background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_-10%,rgba(8,145,178,0.14),transparent_60%)]"
      />
      <ParticleField count={14} className="opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400 mb-3">
            Let's build your next chapter
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Ready to Grow{" "}
            <span className="bg-gradient-to-r from-brand-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              With a Plan?
            </span>
          </h2>
          <p className="text-slate-400 mt-5 leading-relaxed">
            Stop guessing what to post next. Start with a strategy built around your goals, your
            audience, and your resources.
          </p>
        </Reveal>

        {/* Three real options → working order flows */}
        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-10">
          {products.map((product, i) => {
            const symbol = currencyConfig.symbols[currency];
            const price = currency === "EUR" ? product.priceEur : product.priceMad;
            return (
              <Reveal key={product.id} delay={i * 0.08}>
                <Link
                  to={`/${product.slug}`}
                  className={`group block h-full rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                    product.highlighted
                      ? "bg-gradient-to-b from-brand-600/15 to-surface-800/70 border border-brand-500/30 shadow-lg shadow-brand-600/10"
                      : "bg-surface-800/60 border border-white/5 hover:border-brand-500/20"
                  }`}
                >
                  <h3 className="text-white font-semibold mb-1">{product.name}</h3>
                  <p className="text-2xl font-bold text-white mt-2 mb-3">
                    {symbol}
                    {currency === "MAD" ? price.toLocaleString() : price}
                    <span className="text-xs text-slate-500 font-medium ml-1">{product.period}</span>
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    {product.shortDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 group-hover:text-brand-200">
                    {product.cta}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="text-center">
          <p className="text-xs text-slate-500">
            Serving creators globally · Transparent pricing · No fake engagement, ever
          </p>
        </Reveal>
      </div>
    </section>
  );
}
