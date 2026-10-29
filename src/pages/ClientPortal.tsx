import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Search, AlertCircle, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { getOrderStatusForClient } from '../lib/orderService';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, OrderStatus } from '../lib/supabase';
import PageHero from '../components/PageHero';

interface ClientOrder {
  order_reference: string;
  product_name: string;
  status: OrderStatus;
  created_at: string;
  payment_confirmed_at: string | null;
  delivered_at: string | null;
  price_eur: number;
  price_mad: number;
  currency: string;
}

export default function ClientPortal() {
  const [orderReference, setOrderReference] = useState('');
  const [order, setOrder] = useState<ClientOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrder(null);
    setSearched(true);

    try {
      // Client portal uses public status lookup (no authentication required)
      // Returns only order status and basic info, no sensitive customer data
      const result = await getOrderStatusForClient(orderReference.toUpperCase());
      
      if (result.error || !result.order) {
        setError('Order not found. Please check your order reference and try again.');
      } else {
        setOrder(result.order);
      }
    } catch (err) {
      setError('Unable to retrieve order. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending_payment':
        return <Clock className="w-5 h-5" />;
      case 'paid':
        return <CheckCircle className="w-5 h-5" />;
      case 'in_progress':
        return <Loader2 className="w-5 h-5 animate-spin" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  return (
    <div>
      <PageHero
        title="Track Your Order"
        subtitle="Enter your order reference to check status and view your order details"
        badge="Order Tracking"
      />

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-800/50 border border-white/5 rounded-xl p-8 mb-8"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-brand-400" />
              Track Your Order
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Enter your order reference (e.g., MM-ABC12345) to view your order status and details.
            </p>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label htmlFor="orderReference" className="block text-sm text-slate-300 mb-1.5">
                  Order Reference
                </label>
                <input
                  type="text"
                  id="orderReference"
                  value={orderReference}
                  onChange={(e) => setOrderReference(e.target.value)}
                  placeholder="MM-ABC12345"
                  required
                  className="w-full px-4 py-3 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all font-mono"
                />
                <p className="text-xs text-slate-500 mt-2">
                  You received this reference when you placed your order. Check your email or order confirmation page.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !orderReference.trim()}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-600 hover:bg-brand-500 disabled:bg-brand-600/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Track Order
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-red-300 font-semibold mb-1">Order Not Found</h3>
                  <p className="text-sm text-red-300/80">{error}</p>
                  <p className="text-xs text-red-300/60 mt-2">
                    Make sure you entered the correct order reference. It should start with "MM-" followed by 8 characters.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Order Details */}
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Order Header */}
              <div className="bg-surface-800/50 border border-white/5 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Order {order.order_reference}</h2>
                    <p className="text-sm text-slate-400">{order.product_name}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border ${ORDER_STATUS_COLORS[order.status]}`}>
                    {getStatusIcon(order.status)}
                    {ORDER_STATUS_LABELS[order.status]}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Order Date</p>
                    <p className="text-sm text-white">
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Amount</p>
                    <p className="text-sm text-white">
                      {order.currency === 'EUR' ? '€' : 'MAD '}
                      {order.currency === 'EUR' ? order.price_eur : order.price_mad.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="bg-surface-800/50 border border-white/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Order Progress</h3>
                <div className="space-y-4">
                  {[
                    { status: 'pending_payment', label: 'Order Placed', date: order.created_at },
                    { status: 'paid', label: 'Payment Confirmed', date: order.payment_confirmed_at },
                    { status: 'in_progress', label: 'In Progress', date: null },
                    { status: 'delivered', label: 'Delivered', date: order.delivered_at },
                  ].map((step, i) => {
                    const isActive = order.status === step.status;
                    const isPast = 
                      (step.status === 'pending_payment' && ['paid', 'in_progress', 'delivered'].includes(order.status)) ||
                      (step.status === 'paid' && ['in_progress', 'delivered'].includes(order.status)) ||
                      (step.status === 'in_progress' && order.status === 'delivered');

                    return (
                      <div key={i} className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-brand-600 text-white' :
                          isPast ? 'bg-green-500/20 text-green-400' :
                          'bg-surface-700 text-slate-500'
                        }`}>
                          {isPast ? <CheckCircle className="w-5 h-5" /> : 
                           isActive ? <Loader2 className="w-5 h-5 animate-spin" /> :
                           <div className="w-2 h-2 rounded-full bg-current" />}
                        </div>
                        <div className="flex-1 pt-1">
                          <p className={`text-sm font-medium ${
                            isActive ? 'text-white' :
                            isPast ? 'text-green-400' :
                            'text-slate-500'
                          }`}>
                            {step.label}
                          </p>
                          {step.date && (
                            <p className="text-xs text-slate-500 mt-0.5">
                              {new Date(step.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-surface-800/50 border border-white/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Order Details</h3>
                <div className="space-y-3">
                  <div className="flex items-start justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-slate-400">Product</span>
                    <span className="text-sm text-white text-right">{order.product_name}</span>
                  </div>
                  <div className="flex items-start justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-slate-400">Order Reference</span>
                    <span className="text-sm text-white text-right font-mono">{order.order_reference}</span>
                  </div>
                  <div className="flex items-start justify-between py-2">
                    <span className="text-sm text-slate-400">Amount</span>
                    <span className="text-sm text-white text-right">
                      {order.currency === 'EUR' ? '€' : 'MAD '}
                      {order.currency === 'EUR' ? order.price_eur : order.price_mad.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-brand-600/5 border border-brand-500/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-slate-400 mb-3">
                  If you have questions about your order or need to make changes, please contact our support team.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg transition-all"
                  >
                    Contact Support
                  </Link>
                  <a
                    href="mailto:hello@mediasmakers.com"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-all"
                  >
                    Email Us
                  </a>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  When contacting support, please include your order reference: <strong className="text-brand-400">{order.order_reference}</strong>
                </p>
              </div>
            </motion.div>
          )}

          {/* Initial State */}
          {!searched && !order && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center py-12"
            >
              <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Track Your Order</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Enter your order reference above to view your order status, details, and delivery progress.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
