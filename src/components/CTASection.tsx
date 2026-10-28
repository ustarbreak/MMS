import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
}

export default function CTASection({
  title = "Ready to Grow?",
  description = "Start with a Creator Audit to understand where you stand, then scale up with our Content Pack or Growth Partner program.",
  ctaText = "See Our Services",
  ctaLink = "/services",
  secondaryText = "How It Works",
  secondaryLink = "/how-it-works",
}: CTASectionProps) {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={ctaLink}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/20 hover:scale-[1.02]"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {secondaryText && (
              <Link
                to={secondaryLink}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-all"
              >
                {secondaryText}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
