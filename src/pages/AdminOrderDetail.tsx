import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MapPin, Calendar, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { Order, OrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../lib/supabase';
import { getOrderById, updateOrderStatus, updateOrderNotes } from '../lib/orderService';
import { isAdmin } from '../lib/authService';

export default function AdminOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>('pending_payment');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    async function checkAuthAndLoad() {
      const isAdminUser = await isAdmin();
      if (!isAdminUser) {
        navigate('/admin/login');
        return;
      }

      if (!id) {
        setError('Order ID not provided');
        setLoading(false);
        return;
      }

      const result = await getOrderById(id);
      if (result.error || !result.order) {
        setError(result.error || 'Order not found');
      } else {
        setOrder(result.order);
        setNewStatus(result.order.status);
        setNotes(result.order.internal_notes || '');
      }
      setLoading(false);
    }

    checkAuthAndLoad();
  }, [id, navigate]);

  const handleStatusUpdate = async () => {
    if (!order || !id) return;

    setUpdating(true);
    setError(null);

    const result = await updateOrderStatus(id, newStatus, notes);
    if (!result.success) {
      setError(result.error || 'Failed to update status');
    } else {
      // Reload order
      const result = await getOrderById(id);
      if (result.order) {
        setOrder(result.order);
      }
    }

    setUpdating(false);
  };

  const handleNotesUpdate = async () => {
    if (!id) return;

    setUpdating(true);
    setError(null);

    const result = await updateOrderNotes(id, notes);
    if (!result.success) {
      setError(result.error || 'Failed to update notes');
    }

    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-3">Error</h1>
          <p className="text-slate-400 mb-6">{error}</p>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!order) return null;

  const price = order.currency === 'EUR' ? order.price_eur : order.price_mad;
  const symbol = order.currency === 'EUR' ? '€' : 'MAD';
  const formattedPrice = order.currency === 'MAD' ? price.toLocaleString() : price;

  const validTransitions: Record<OrderStatus, OrderStatus[]> = {
    pending_payment: ['paid', 'cancelled'],
    paid: ['in_progress', 'refunded', 'cancelled'],
    in_progress: ['delivered', 'cancelled'],
    delivered: ['refunded'],
    cancelled: [],
    refunded: [],
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-800/50 border border-white/5 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-xl font-bold text-white mb-1">Order {order.order_reference}</h1>
                  <p className="text-sm text-slate-400">{order.product_name}</p>
                </div>
                <span className={`inline-flex px-3 py-1.5 rounded-lg text-sm font-medium border ${ORDER_STATUS_COLORS[order.status]}`}>
                  {ORDER_STATUS_LABELS[order.status]}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-slate-500 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Email</div>
                    <div className="text-sm text-white">{order.customer_email}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Country</div>
                    <div className="text-sm text-white">{order.customer_country}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-slate-500 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Created</div>
                    <div className="text-sm text-white">{new Date(order.created_at).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-slate-500 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Price</div>
                    <div className="text-sm text-white">{symbol}{formattedPrice}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Requirements */}
            {order.requirements && Object.keys(order.requirements).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface-800/50 border border-white/5 rounded-xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">Customer Requirements</h2>
                <div className="space-y-3">
                  {Object.entries(order.requirements).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-xs text-slate-500 mb-1 capitalize">{key.replace(/_/g, ' ')}</div>
                      <div className="text-sm text-slate-300 bg-surface-700/50 rounded-lg p-3">
                        {String(value) || '—'}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Payment & Delivery Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-surface-800/50 border border-white/5 rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Payment & Delivery</h2>
              <div className="space-y-3">
                {order.payment_confirmed_at && (
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Payment Confirmed</div>
                    <div className="text-sm text-green-400">{new Date(order.payment_confirmed_at).toLocaleString()}</div>
                  </div>
                )}
                {order.payment_notes && (
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Payment Notes</div>
                    <div className="text-sm text-slate-300">{order.payment_notes}</div>
                  </div>
                )}
                {order.delivered_at && (
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Delivered</div>
                    <div className="text-sm text-green-400">{new Date(order.delivered_at).toLocaleString()}</div>
                  </div>
                )}
                {order.delivery_notes && (
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Delivery Notes</div>
                    <div className="text-sm text-slate-300">{order.delivery_notes}</div>
                  </div>
                )}
                {!order.payment_confirmed_at && !order.delivered_at && (
                  <p className="text-sm text-slate-500">No payment or delivery information yet.</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar: Status Management */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-surface-800/50 border border-white/5 rounded-xl p-6 sticky top-24"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Update Status</h2>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-xs text-red-300">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1.5">New Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                    disabled={validTransitions[order.status].length === 0}
                    className="w-full px-4 py-2.5 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50 disabled:opacity-50"
                  >
                    <option value={order.status}>{ORDER_STATUS_LABELS[order.status]} (current)</option>
                    {validTransitions[order.status].map((status) => (
                      <option key={status} value={status}>
                        {ORDER_STATUS_LABELS[status]}
                      </option>
                    ))}
                  </select>
                  {validTransitions[order.status].length === 0 && (
                    <p className="text-xs text-slate-500 mt-1">No further status changes available.</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1.5">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 resize-none"
                    placeholder="Add notes about this status change..."
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleStatusUpdate}
                    disabled={updating || newStatus === order.status}
                    className="flex-1 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 disabled:bg-brand-600/50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all"
                  >
                    {updating ? 'Updating...' : 'Update Status'}
                  </button>
                  <button
                    onClick={handleNotesUpdate}
                    disabled={updating}
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 disabled:opacity-50 text-white text-sm font-medium rounded-lg border border-white/10 transition-all"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
