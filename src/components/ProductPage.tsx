import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Product, currencyConfig, Currency } from "../config/site";
import PageHero from "../components/PageHero";
import CurrencyToggle from "../components/CurrencyToggle";
import CTASection from "../components/CTASection";

interface ProductPageProps {
  product: Product;
  otherProducts: Product[];
}

export default function ProductPage({ product, otherProducts }: ProductPageProps) {
  const [currency, setCurrency] = useState<Currency>(currencyConfig.default);
  const symbol = currencyConfig.symbols[currency];
  const price = currency === "EUR" ? product.priceEur : product.priceMad;
  const formattedPrice = currency === "MAD" ? price.toLocaleString() : price;

  return (
    <div>
      <PageHero
        title={product.name}
        subtitle={product.shortDescription}
        badge={product.period === "/month" ? "Monthly Subscription" : "One-Time Purchase"}
      />

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-bold text-white mb-4">About This Package</h2>
                <p className="text-slate-400 leading-relaxed">{product.longDescription}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-white mb-4">What's Included</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-bold text-white mb-4">What You'll Receive</h2>
                <div className="bg-surface-800/50 border border-white/5 rounded-xl p-6">
                  <ul className="space-y-3">
                    {product.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-300">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  * These are sample deliverable types. Actual content is customized to your brand and goals.
                </p>
              </motion.div>
            </div>

            {/* Right: Pricing Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24 bg-surface-800/80 border border-white/10 rounded-2xl p-7"
              >
                <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                <div className="mb-5">
                  <span className="text-3xl font-bold text-white">
                    {symbol}{formattedPrice}
                  </span>
                  <span className="text-slate-500 text-sm ml-1">{product.period}</span>
                </div>

                <div className="mb-5">
                  <CurrencyToggle currency={currency} onChange={setCurrency} />
                </div>

                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/20 mb-4"
                >
                  {product.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-xs text-slate-500 text-center">
                  No payment processing yet — contact us to get started.
                </p>

                <div className="mt-6 pt-5 border-t border-white/5">
                  <p className="text-xs text-slate-500 mb-3 font-medium">Key features:</p>
                  <ul className="space-y-2">
                    {product.features.slice(0, 5).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                        <Check className="w-3 h-3 text-brand-400 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Products */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Other Packages</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {otherProducts.map((p) => (
              <Link
                key={p.id}
                to={`/${p.slug}`}
                className="flex items-center gap-4 bg-surface-800/50 border border-white/5 rounded-xl p-5 hover:border-brand-500/20 transition-all group"
              >
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm mb-1">{p.name}</h3>
                  <p className="text-slate-400 text-xs">{p.shortDescription.slice(0, 80)}...</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Services */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all services
        </Link>
      </div>

      {/* Order Section */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">Ready to Get Started?</h2>
            <p className="text-slate-400 mb-6">
              Place your order now and we'll be in touch within 24 hours to confirm details and arrange payment.
            </p>
            <Link
              to={`/order/${product.slug}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-brand-600/20"
            >
              {product.cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-xs text-slate-500 mt-4">
              No payment required now — we'll arrange payment after you place your order.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
