import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Clock, AlertCircle } from 'lucide-react';
import { Order, ORDER_STATUS_LABELS } from '../lib/supabase';
import { getOrderByReference } from '../lib/orderService';

export default function OrderConfirmation() {
  const { reference } = useParams<{ reference: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      if (!reference) {
        setError('No order reference provided');
        setLoading(false);
        return;
      }

      // Retrieve stored email from sessionStorage for verification
      const storedEmail = sessionStorage.getItem(`order_email_${reference}`);
      
      // Pass email for verification - prevents unauthorized access
      const result = await getOrderByReference(reference, storedEmail || undefined);
      
      if (result.error || !result.order) {
        // If verification fails, show a secure error message
        setError('Unable to display order details. Please check your email for order confirmation or contact support with your order reference.');
      } else {
        setOrder(result.order);
        // Clear the stored email after successful verification
        sessionStorage.removeItem(`order_email_${reference}`);
      }
      setLoading(false);
    }

    fetchOrder();
  }, [reference]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-3">Order Not Found</h1>
          <p className="text-slate-400 mb-6">{error || 'The order you are looking for does not exist.'}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const price = order.currency === 'EUR' ? order.price_eur : order.price_mad;
  const symbol = order.currency === 'EUR' ? '€' : 'MAD';
  const formattedPrice = order.currency === 'MAD' ? price.toLocaleString() : price;

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Order Placed Successfully!</h1>
          <p className="text-slate-400">
            Thank you for your order. We've received your request and will be in touch soon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-800/50 border border-white/5 rounded-xl p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Order Details</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-sm text-slate-400">Order Reference</span>
              <span className="text-sm font-mono font-semibold text-brand-400">{order.order_reference}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-sm text-slate-400">Product</span>
              <span className="text-sm text-white">{order.product_name}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-sm text-slate-400">Price</span>
              <span className="text-sm font-semibold text-white">{symbol}{formattedPrice}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-sm text-slate-400">Status</span>
              <span className="text-sm text-amber-400">{ORDER_STATUS_LABELS[order.status]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-400">Date</span>
              <span className="text-sm text-white">{new Date(order.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-800/50 border border-white/5 rounded-xl p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-600/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                <span className="text-brand-400 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-1">Check Your Email</h3>
                <p className="text-slate-400 text-xs">
                  We've sent a confirmation to <strong className="text-slate-300">{order.customer_email}</strong> with your order details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-600/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                <span className="text-brand-400 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-1">Arrange Payment</h3>
                <p className="text-slate-400 text-xs">
                  We'll contact you shortly with payment instructions. Payment can be made via bank transfer, PayPal, or other methods we'll discuss.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-600/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                <span className="text-brand-400 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-1">We Start Working</h3>
                <p className="text-slate-400 text-xs">
                  Once payment is confirmed, we'll begin working on your deliverables. You'll receive updates throughout the process.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-brand-600/5 border border-brand-500/10 rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold text-sm mb-1">Need Help?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                If you have any questions about your order, contact us at{' '}
                <a href="mailto:hello@mediasmakers.com" className="text-brand-400 hover:text-brand-300">
                  hello@mediasmakers.com
                </a>{' '}
                and include your order reference: <strong className="text-brand-400">{order.order_reference}</strong>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-all"
          >
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
