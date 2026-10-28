import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, AlertCircle, CheckCircle } from 'lucide-react';
import { Product, currencyConfig, Currency } from '../config/site';
import { createOrder } from '../lib/orderService';

interface OrderFormProps {
  product: Product;
}

export default function OrderForm({ product }: OrderFormProps) {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<Currency>(currencyConfig.default);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_country: '',
    requirements: '',
  });

  const symbol = currencyConfig.symbols[currency];
  const price = currency === 'EUR' ? product.priceEur : product.priceMad;
  const formattedPrice = currency === 'MAD' ? price.toLocaleString() : price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await createOrder({
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_country: formData.customer_country,
        product_id: product.id,
        currency,
        requirements: {
          notes: formData.requirements,
        },
      });

      if (!result.success || !result.order) {
        setError(result.error || 'Failed to create order');
        return;
      }

      // Store verification token in sessionStorage for order confirmation
      // The token is cryptographically random and single-use
      // This is cleared after viewing the confirmation page
      if (result.order.verification_token) {
        sessionStorage.setItem(
          `order_token_${result.order.order_reference}`,
          result.order.verification_token
        );
      }

      // Navigate to confirmation page
      navigate(`/order-confirmation/${result.order.order_reference}`);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Order submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          to={`/${product.slug}`}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {product.name}
        </Link>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-2xl font-bold text-white mb-6">Complete Your Order</h1>

            <div className="bg-surface-800/50 border border-white/5 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-brand-600/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                  <ShoppingCart className="w-6 h-6 text-brand-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white mb-1">{product.name}</h2>
                  <p className="text-sm text-slate-400">{product.shortDescription}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-400">Price</span>
                  <span className="text-xl font-bold text-white">
                    {symbol}{formattedPrice}
                    <span className="text-sm text-slate-500 ml-1">{product.period}</span>
                  </span>
                </div>

                {/* Currency toggle */}
                <div className="inline-flex items-center bg-surface-700/80 rounded-lg p-1 border border-white/5">
                  {(Object.keys(currencyConfig.symbols) as Currency[]).map((cur) => (
                    <button
                      key={cur}
                      type="button"
                      onClick={() => setCurrency(cur)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        currency === cur
                          ? 'bg-brand-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {currencyConfig.symbols[cur]} {cur}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div className="bg-surface-800/50 border border-white/5 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-3">What You'll Receive</h3>
              <ul className="space-y-2">
                {product.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Order Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit} className="bg-surface-800/50 border border-white/5 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Your Information</h2>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label htmlFor="customer_name" className="block text-sm text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    required
                    value={formData.customer_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="customer_email" className="block text-sm text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="customer_email"
                    name="customer_email"
                    required
                    value={formData.customer_email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                    placeholder="your@email.com"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    We'll send your order confirmation and updates to this email.
                  </p>
                </div>

                <div>
                  <label htmlFor="customer_country" className="block text-sm text-slate-300 mb-1.5">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="customer_country"
                    name="customer_country"
                    required
                    value={formData.customer_country}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                    placeholder="Your country"
                  />
                </div>

                <div>
                  <label htmlFor="requirements" className="block text-sm text-slate-300 mb-1.5">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={4}
                    value={formData.requirements}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all resize-none"
                    placeholder="Tell us about your brand, target audience, platforms, goals, or any specific requirements..."
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    The more detail you provide, the more tailored your deliverables will be.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-600 hover:bg-brand-500 disabled:bg-brand-600/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/20"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Place Order
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  By placing this order, you agree to our{' '}
                  <Link to="/terms-of-service" className="text-brand-400 hover:text-brand-300">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" className="text-brand-400 hover:text-brand-300">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
