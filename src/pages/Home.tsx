import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  TrendingUp,
  BarChart3,
  Users,
  Check,
  ArrowRight,
  Sparkles,
  Target,
  Globe,
} from "lucide-react";
import PricingCard from "../components/PricingCard";

const services = [
  {
    icon: BarChart3,
    title: "Creator Audit",
    description:
      "Comprehensive analysis of your social media presence — content strategy, engagement patterns, audience insights, and actionable recommendations.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Sparkles,
    title: "Content Pack",
    description:
      "AI-assisted content creation package including post templates, caption frameworks, hashtag strategies, and a 30-day content calendar.",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: TrendingUp,
    title: "Growth Partner",
    description:
      "Ongoing monthly partnership with dedicated strategy, content planning, performance tracking, and continuous optimization for your growth.",
    color: "from-amber-500 to-orange-400",
  },
];

const features = [
  { icon: Target, text: "Data-driven content strategy" },
  { icon: Users, text: "Audience growth frameworks" },
  { icon: Sparkles, text: "AI-assisted content creation" },
  { icon: Globe, text: "Morocco & international markets" },
  { icon: BarChart3, text: "Performance analytics" },
  { icon: Zap, text: "Fast turnaround times" },
];

export default function Home() {
  const [currency, setCurrency] = useState<"EUR" | "MAD">("EUR");

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600/10 border border-brand-500/20 text-brand-300 text-sm mb-6">
                <Zap className="w-3.5 h-3.5" />
                AI-Assisted Marketing Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Grow Your Audience.{" "}
                <span className="bg-gradient-to-r from-brand-400 to-cyan-400 bg-clip-text text-transparent">
                  Build Your Brand.
                </span>
              </h1>

              <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl">
                MediasMakers helps creators, independent musicians, streamers, and
                small businesses grow their social media presence with AI-assisted
                strategies and expert guidance.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-medium rounded-xl transition-all hover:scale-105"
                >
                  View Pricing
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-all"
                >
                  Our Services
                </a>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  Based in Morocco
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  Serving globally
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  Transparent pricing
                </span>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
                <div className="relative bg-surface-700/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-surface-600/50 border border-white/5"
                      >
                        <f.icon className="w-5 h-5 text-brand-400 shrink-0" />
                        <span className="text-sm text-zinc-300">{f.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What We Offer
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Three focused products designed to deliver real value at every stage
              of your creator journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative bg-surface-700/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-brand-500/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-6">
              Choose the package that fits your needs. All prices are configurable
              and available in EUR or MAD.
            </p>

            {/* Currency Toggle */}
            <div className="inline-flex items-center gap-2 bg-surface-700 rounded-xl p-1 border border-white/5">
              <button
                onClick={() => setCurrency("EUR")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currency === "EUR"
                    ? "bg-brand-600 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                € EUR
              </button>
              <button
                onClick={() => setCurrency("MAD")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currency === "MAD"
                    ? "bg-brand-600 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                MAD
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <PricingCard
              title="Creator Audit"
              description="One-time analysis of your social media presence"
              price={currency === "EUR" ? "9" : "100"}
              currency={currency === "EUR" ? "€" : "MAD"}
              period="one-time"
              features={[
                "Social media profile review",
                "Content strategy assessment",
                "Engagement pattern analysis",
                "Audience insights report",
                "Actionable recommendations",
              ]}
              highlighted={false}
              delay={0}
            />
            <PricingCard
              title="Content Pack"
              description="AI-assisted content creation package"
              price={currency === "EUR" ? "19" : "210"}
              currency={currency === "EUR" ? "€" : "MAD"}
              period="one-time"
              features={[
                "Post templates & frameworks",
                "Caption writing guides",
                "Hashtag strategy document",
                "30-day content calendar",
                "Visual style recommendations",
                "Platform-specific tips",
              ]}
              highlighted={true}
              delay={0.15}
            />
            <PricingCard
              title="Growth Partner"
              description="Ongoing monthly marketing partnership"
              price={currency === "EUR" ? "149" : "1,640"}
              currency={currency === "EUR" ? "€" : "MAD"}
              period="/month"
              features={[
                "Dedicated growth strategy",
                "Weekly content planning",
                "Performance tracking & reports",
                "Continuous optimization",
                "Direct communication channel",
                "Priority support",
                "Monthly strategy calls",
              ]}
              highlighted={false}
              delay={0.3}
            />
          </div>

          <p className="text-center text-xs text-zinc-600 mt-8">
            Prices are test/launch prices and may be adjusted. All services are
            delivered with transparency — no hidden fees.
          </p>
        </div>
      </section>

      {/* About / Mission Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Built for Creators,{" "}
                <span className="text-brand-400">by Creators</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                MediasMakers was built to solve a real problem: creators and small
                businesses need professional social media marketing but can't
                always afford expensive agencies.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-4">
                We combine AI-assisted workflows with human expertise to deliver
                strategies that actually work — at prices that make sense for
                independent creators.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Starting from Morocco, we serve creators and businesses worldwide
                who want to grow their online presence without breaking the bank.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Target Market", value: "Morocco + Global" },
                { label: "Focus", value: "Creators & SMBs" },
                { label: "Approach", value: "AI + Human Expert" },
                { label: "Philosophy", value: "Lean & Transparent" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-surface-700/50 border border-white/5 rounded-xl p-5"
                >
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="text-white font-semibold">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Grow?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Start with a Creator Audit to understand where you stand, then
              scale up with our Content Pack or Growth Partner program.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-medium rounded-xl transition-all hover:scale-105 shadow-lg shadow-brand-600/25"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
