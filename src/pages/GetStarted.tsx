/**
 * GetStarted — multi-step order experience.
 * Steps: 1) choose product → 2) your details → 3) goals & context → 4) review → create order.
 * Uses the real Supabase order pipeline (orderService.createOrder) when configured;
 * surfaces clear errors otherwise. Never collects payment card data — payment is handled
 * off-platform via bank transfer/PayPal as configured by the business.
 */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  AlertCircle,
  ShoppingCart,
  ShieldCheck,
} from "lucide-react";
import { products, currencyConfig, Currency, Product } from "../config/site";
import { createOrder } from "../lib/orderService";

const STEPS = ["Product", "Your details", "Goals & context", "Review"];

export default function GetStarted() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [currency, setCurrency] = useState<Currency>(currencyConfig.default);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_country: "",
    platform: "Instagram",
    goal: "Grow a relevant audience",
    requirements: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const symbol = currencyConfig.symbols[currency];
  const price = product ? (currency === "EUR" ? product.priceEur : product.priceMad) : 0;

  const validateDetails = () => {
    const errs: Record<string, string> = {};
    if (form.customer_name.trim().length < 2) errs.customer_name = "Please enter your name (min. 2 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customer_email)) errs.customer_email = "Please enter a valid email address.";
    if (form.customer_country.trim().length < 2) errs.customer_country = "Please enter your country.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    setError(null);
    if (step === 0 && !product) {
      setError("Select a service to continue.");
      return;
    }
    if (step === 1 && !validateDetails()) return;
    setFieldErrors({});
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  };

  const submit = async () => {
    if (!product) return;
    setLoading(true);
    setError(null);
    try {
      const result = await createOrder({
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_country: form.customer_country,
        product_id: product.id,
        currency,
        requirements: {
          notes: form.requirements,
          primary_platform: form.platform,
          primary_goal: form.goal,
          source: "get-started-wizard",
        },
      });
      if (!result.success || !result.order) {
        setError(result.error || "We couldn't create your order. Please try again or contact us.");
        return;
      }
      if (result.order.verification_token) {
        sessionStorage.setItem(
          `order_token_${result.order.order_reference}`,
          result.order.verification_token
        );
      }
      navigate(`/order-confirmation/${result.order.order_reference}`);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (name: string) =>
    `w-full bg-navy-950 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20 ${
      fieldErrors[name] ? "border-red-500/50" : "border-white/10"
    }`;

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400 mb-3">
            Get started
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Build My{" "}
            <span className="bg-gradient-to-r from-brand-400 to-cyan-300 bg-clip-text text-transparent">
              Growth Plan
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-3 max-w-lg mx-auto">
            Four quick steps. No payment details on this page — you'll receive payment instructions
            with your order confirmation.
          </p>
        </div>

        {/* Progress */}
        <ol className="flex items-center justify-center gap-2 sm:gap-3 mb-10" aria-label="Order progress">
          {STEPS.map((label, i) => (
            <li key={label} className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                aria-current={i === step ? "step" : undefined}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  i === step
                    ? "bg-brand-600 text-white"
                    : i < step
                      ? "bg-brand-600/15 text-brand-300 hover:bg-brand-600/25"
                      : "bg-white/5 text-slate-500"
                }`}
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" className="w-4 sm:w-8 h-px bg-white/10" />
              )}
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
          >
            {/* STEP 1 — product */}
            {step === 0 && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-white font-semibold">Choose your service</h2>
                  <div className="inline-flex items-center bg-surface-700/80 rounded-lg p-1 border border-white/5">
                    {(Object.keys(currencyConfig.symbols) as Currency[]).map((cur) => (
                      <button
                        key={cur}
                        type="button"
                        onClick={() => setCurrency(cur)}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                          currency === cur ? "bg-brand-600 text-white" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {currencyConfig.symbols[cur]} {cur}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {products.map((p) => {
                    const selected = product?.id === p.id;
                    const pPrice = currency === "EUR" ? p.priceEur : p.priceMad;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setProduct(p)}
                        aria-pressed={selected}
                        className={`text-left rounded-2xl p-5 border transition-all ${
                          selected
                            ? "bg-brand-600/10 border-brand-500/40 shadow-lg shadow-brand-600/10"
                            : "bg-surface-800/60 border-white/5 hover:border-white/15"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-white font-semibold text-sm">{p.name}</h3>
                          {selected && (
                            <span className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-white" />
                            </span>
                          )}
                        </div>
                        <p className="text-lg font-bold text-white mb-1">
                          {symbol}
                          {currency === "MAD" ? pPrice.toLocaleString() : pPrice}
                          <span className="text-xs text-slate-500 font-medium ml-1">{p.period}</span>
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed">{p.shortDescription}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2 — details */}
            {step === 1 && (
              <div className="bg-surface-800/60 border border-white/5 rounded-2xl p-6 lg:p-8 max-w-xl mx-auto">
                <h2 className="text-white font-semibold mb-6">Who are we growing?</h2>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="gs-name" className="block text-xs text-slate-300 mb-1.5">Creator / brand name *</label>
                    <input id="gs-name" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} className={inputClass("customer_name")} placeholder="Your name or brand" />
                    {fieldErrors.customer_name && <p className="text-xs text-red-400 mt-1.5">{fieldErrors.customer_name}</p>}
                  </div>
                  <div>
                    <label htmlFor="gs-email" className="block text-xs text-slate-300 mb-1.5">Email *</label>
                    <input id="gs-email" type="email" value={form.customer_email} onChange={(e) => setForm({ ...form, customer_email: e.target.value })} className={inputClass("customer_email")} placeholder="you@example.com" />
                    {fieldErrors.customer_email && <p className="text-xs text-red-400 mt-1.5">{fieldErrors.customer_email}</p>}
                  </div>
                  <div>
                    <label htmlFor="gs-country" className="block text-xs text-slate-300 mb-1.5">Country *</label>
                    <input id="gs-country" value={form.customer_country} onChange={(e) => setForm({ ...form, customer_country: e.target.value })} className={inputClass("customer_country")} placeholder="e.g., France" />
                    {fieldErrors.customer_country && <p className="text-xs text-red-400 mt-1.5">{fieldErrors.customer_country}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 — goals */}
            {step === 2 && (
              <div className="bg-surface-800/60 border border-white/5 rounded-2xl p-6 lg:p-8 max-w-xl mx-auto">
                <h2 className="text-white font-semibold mb-1">Your goals & context</h2>
                <p className="text-xs text-slate-500 mb-6">The more context you give, the sharper your deliverables.</p>
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="gs-platform" className="block text-xs text-slate-300 mb-1.5">Main platform</label>
                      <select id="gs-platform" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} className={inputClass("platform")}>
                        {["Instagram", "TikTok", "YouTube", "Twitch", "X / Twitter", "LinkedIn", "Multiple platforms"].map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="gs-goal" className="block text-xs text-slate-300 mb-1.5">Primary objective</label>
                      <select id="gs-goal" value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} className={inputClass("goal")}>
                        {["Grow a relevant audience", "Promote a release or launch", "Increase content consistency", "Generate leads or sales", "Build community engagement"].map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="gs-req" className="block text-xs text-slate-300 mb-1.5">Profile links, niche, challenges, anything else we should know</label>
                    <textarea id="gs-req" rows={5} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} className={`${inputClass("requirements")} resize-y`} placeholder="e.g., Instagram @handle · independent hip-hop artist · releasing in 6 weeks · struggle to post consistently…" />
                    <p className="text-[11px] text-slate-500 mt-1.5">Optional but strongly recommended.</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 — review */}
            {step === 3 && product && (
              <div className="bg-surface-800/60 border border-white/5 rounded-2xl p-6 lg:p-8 max-w-xl mx-auto">
                <h2 className="text-white font-semibold mb-6">Review your order</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-navy-950/60 border border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-brand-600/15 border border-brand-500/25 flex items-center justify-center shrink-0">
                      <ShoppingCart className="w-5 h-5 text-brand-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{product.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{product.shortDescription}</p>
                    </div>
                    <p className="text-lg font-bold text-white whitespace-nowrap">
                      {symbol}{currency === "MAD" ? price.toLocaleString() : price}
                      <span className="block text-[10px] text-slate-500 font-medium text-right">{product.period}</span>
                    </p>
                  </div>
                  <dl className="text-sm divide-y divide-white/5">
                    {[
                      ["Name", form.customer_name],
                      ["Email", form.customer_email],
                      ["Country", form.customer_country],
                      ["Platform", form.platform],
                      ["Objective", form.goal],
                      ["Context", form.requirements || "—"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-6 py-2.5">
                        <dt className="text-slate-500 text-xs shrink-0">{k}</dt>
                        <dd className="text-slate-300 text-xs text-right break-words">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="flex items-start gap-2.5 text-xs text-slate-400 bg-brand-600/5 border border-brand-500/15 rounded-xl p-3.5">
                    <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                    We never ask for card details here. After placing the order you'll receive your
                    reference and payment instructions; work begins once payment is confirmed.
                  </div>
                </div>
                <button
                  onClick={submit}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-all"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {loading ? "Placing your order…" : `Place order — ${symbol}${currency === "MAD" ? price.toLocaleString() : price}${product.period}`}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {error && (
          <div role="alert" className="mt-6 max-w-xl mx-auto flex items-start gap-2.5 bg-red-500/10 border border-red-500/25 text-red-300 text-sm rounded-xl p-4">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Nav buttons */}
        <div className="flex items-center justify-between max-w-xl mx-auto mt-8">
          <button
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          {step < 3 && (
            <button
              onClick={next}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-xl transition-all"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <p className="text-center text-xs text-slate-600 mt-10">
          Prefer a single service?{" "}
          <Link to="/services" className="text-brand-400 hover:text-brand-300">Browse all services</Link>
        </p>
      </div>
    </div>
  );
}
