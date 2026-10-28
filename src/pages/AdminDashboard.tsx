import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LogOut,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Search,
  Filter,
  TrendingUp,
  Loader2,
} from 'lucide-react';
import { AdminProfile, Order, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../lib/supabase';
import { getCurrentAdmin, signOut } from '../lib/authService';
import { getAllOrders, getOrderStats } from '../lib/orderService';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      const { admin } = await getCurrentAdmin();
      if (!admin) {
        navigate('/admin/login');
        return;
      }
      setAdmin(admin);

      await fetchOrders();
      await fetchStats();
      setLoading(false);
    }

    loadData();
  }, [navigate]);

  const fetchOrders = async () => {
    const result = await getAllOrders({
      status: statusFilter as any || undefined,
      search: search || undefined,
      limit: 50,
    });
    if (result.orders) {
      setOrders(result.orders);
    }
  };

  const fetchStats = async () => {
    const result = await getOrderStats();
    if (result.stats) {
      setStats(result.stats);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    setTimeout(() => fetchOrders(), 0);
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Admin Dashboard</h1>
            <p className="text-sm text-slate-400">Welcome back, {admin.full_name || admin.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm rounded-lg border border-white/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={Package}
              label="Total Orders"
              value={stats.total_orders}
              color="text-blue-400"
            />
            <StatCard
              icon={Clock}
              label="Pending Payment"
              value={stats.pending_payment}
              color="text-amber-400"
            />
            <StatCard
              icon={CheckCircle}
              label="Delivered"
              value={stats.delivered}
              color="text-green-400"
            />
            <StatCard
              icon={DollarSign}
              label="Revenue (EUR)"
              value={`€${stats.total_revenue_eur.toFixed(2)}`}
              color="text-brand-400"
            />
          </div>
        )}

        {/* Filters */}
        <div className="bg-surface-800/50 border border-white/5 rounded-xl p-4 mb-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or order reference..."
                className="w-full pl-10 pr-4 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="px-4 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50"
            >
              <option value="">All Statuses</option>
              <option value="pending_payment">Pending Payment</option>
              <option value="paid">Paid</option>
              <option value="in_progress">In Progress</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
            <button
              type="submit"
              className="px-6 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg transition-all"
            >
              Search
            </button>
          </form>
        </div>

        {/* Orders Table */}
        <div className="bg-surface-800/50 border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-700/50 border-b border-white/5">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-sm font-mono text-brand-400">{order.order_reference}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <div className="text-sm text-white">{order.customer_name}</div>
                          <div className="text-xs text-slate-500">{order.customer_email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-slate-300">{order.product_name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-white">
                          {order.currency === 'EUR' ? '€' : 'MAD'}
                          {order.currency === 'EUR' ? order.price_eur : order.price_mad.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium border ${ORDER_STATUS_COLORS[order.status]}`}>
                          {ORDER_STATUS_LABELS[order.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-slate-400">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="text-sm text-brand-400 hover:text-brand-300 transition-colors"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/service-delivery"
            className="flex items-center gap-3 p-4 bg-surface-800/50 border border-white/5 rounded-xl hover:border-brand-500/20 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-600/10 border border-brand-500/20 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Service Delivery</div>
              <div className="text-xs text-slate-500">Audit reports, content packs, growth partners</div>
            </div>
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center gap-3 p-4 bg-surface-800/50 border border-white/5 rounded-xl hover:border-brand-500/20 transition-all"
          >
            <Package className="w-5 h-5 text-brand-400" />
            <div>
              <div className="text-sm font-medium text-white">Manage Products</div>
              <div className="text-xs text-slate-500">Edit prices and descriptions</div>
            </div>
          </Link>
          <Link
            to="/admin/analytics"
            className="flex items-center gap-3 p-4 bg-surface-800/50 border border-white/5 rounded-xl hover:border-brand-500/20 transition-all"
          >
            <TrendingUp className="w-5 h-5 text-brand-400" />
            <div>
              <div className="text-sm font-medium text-white">Analytics</div>
              <div className="text-xs text-slate-500">View detailed reports</div>
            </div>
          </Link>
          <button
            onClick={() => {
              fetchOrders();
              fetchStats();
            }}
            className="flex items-center gap-3 p-4 bg-surface-800/50 border border-white/5 rounded-xl hover:border-brand-500/20 transition-all text-left"
          >
            <RefreshCw className="w-5 h-5 text-brand-400" />
            <div>
              <div className="text-sm font-medium text-white">Refresh Data</div>
              <div className="text-xs text-slate-500">Update orders and stats</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="bg-surface-800/50 border border-white/5 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${color}`} />
        <div>
          <div className="text-xs text-slate-500 mb-0.5">{label}</div>
          <div className="text-xl font-bold text-white">{value}</div>
        </div>
      </div>
    </div>
  );
}
