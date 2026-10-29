import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Product, Currency, currencyConfig } from "../config/site";

interface ProductCardProps {
  product: Product;
  currency: Currency;
  delay?: number;
}

export default function ProductCard({ product, currency, delay = 0 }: ProductCardProps) {
  const symbol = currencyConfig.symbols[currency];
  const price = currency === "EUR" ? product.priceEur : product.priceMad;
  const formattedPrice = currency === "MAD" ? price.toLocaleString() : price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`relative rounded-2xl p-7 lg:p-8 flex flex-col h-full ${
        product.highlighted
          ? "bg-gradient-to-b from-brand-600/10 to-surface-800/80 border-2 border-brand-500/30 shadow-xl shadow-brand-600/5"
          : "bg-surface-800/60 border border-white/5 hover:border-white/10"
      } transition-all duration-300`}
    >
      {product.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-600 text-white text-xs font-semibold rounded-full shadow-lg shadow-brand-600/30">
          Most Popular
        </div>
      )}

      <div className="mb-5">
        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          {product.shortDescription}
        </p>
      </div>

      <div className="mb-6">
        <span className="text-3xl lg:text-4xl font-bold text-white">
          {symbol}{formattedPrice}
        </span>
        <span className="text-slate-500 text-sm ml-1.5">{product.period}</span>
      </div>

      <ul className="space-y-2.5 mb-8 flex-1">
        {product.features.slice(0, 6).map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
            <span className="text-sm text-slate-300">{feature}</span>
          </li>
        ))}
        {product.features.length > 6 && (
          <li className="text-xs text-slate-500 pl-6.5">
            +{product.features.length - 6} more features
          </li>
        )}
      </ul>

      <Link
        to={`/${product.slug}`}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all group"
        style={{
          background: product.highlighted
            ? "linear-gradient(135deg, #0891b2, #06b6d4)"
            : "rgba(255,255,255,0.05)",
          border: product.highlighted ? "none" : "1px solid rgba(255,255,255,0.1)",
          color: "white",
        }}
      >
        {product.cta}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </motion.div>
  );
}
