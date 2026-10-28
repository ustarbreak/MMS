import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  currency: string;
  period: string;
  features: string[];
  highlighted: boolean;
  delay: number;
}

export default function PricingCard({
  title,
  description,
  price,
  currency,
  period,
  features,
  highlighted,
  delay,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`relative rounded-2xl p-8 ${
        highlighted
          ? "bg-gradient-to-b from-brand-600/20 to-surface-700/80 border-2 border-brand-500/40"
          : "bg-surface-700/50 border border-white/5"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-600 text-white text-xs font-medium rounded-full">
          Most Popular
        </div>
      )}

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 mb-6">{description}</p>

      <div className="mb-6">
        <span className="text-4xl font-bold text-white">{currency}{price}</span>
        <span className="text-zinc-500 text-sm ml-1">{period}</span>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
            <span className="text-sm text-zinc-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
          highlighted
            ? "bg-brand-600 hover:bg-brand-500 text-white"
            : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
        }`}
      >
        Choose Plan
      </button>
    </motion.div>
  );
}
