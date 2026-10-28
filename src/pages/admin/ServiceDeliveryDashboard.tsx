import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Package, Users, TrendingUp, Loader2 } from 'lucide-react';
import { getServiceDeliveryStats } from '../../lib/serviceDeliveryService';
import { isAdmin } from '../../lib/authService';

export default function ServiceDeliveryDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function checkAuth() {
      const isAdminUser = await isAdmin();
      if (!isAdminUser) {
        navigate('/admin/login');
        return;
      }
      await loadStats();
      setLoading(false);
    }
    checkAuth();
  }, [navigate]);

  const loadStats = async () => {
    const result = await getServiceDeliveryStats();
    if (result.stats) {
      setStats(result.stats);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Main Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1">Service Delivery Workspace</h1>
          <p className="text-sm text-slate-400">Manage audit reports, content packs, and growth partner clients</p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <StatCard
              icon={FileText}
              label="Total Audits"
              value={stats.total_audits}
              color="text-blue-400"
            />
            <StatCard
              icon={FileText}
              label="Audits Delivered"
              value={stats.audits_delivered}
              color="text-green-400"
            />
            <StatCard
              icon={Package}
              label="Total Packs"
              value={stats.total_content_packs}
              color="text-purple-400"
            />
            <StatCard
              icon={Package}
              label="Packs Delivered"
              value={stats.packs_delivered}
              color="text-green-400"
            />
            <StatCard
              icon={Users}
              label="Active Clients"
              value={stats.active_clients}
              color="text-brand-400"
            />
            <StatCard
              icon={Users}
              label="Total Clients"
              value={stats.total_clients}
              color="text-slate-400"
            />
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/admin/audit-generator"
              className="block bg-surface-800/50 border border-white/5 rounded-xl p-6 hover:border-brand-500/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Creator Audit Generator</h2>
              <p className="text-sm text-slate-400 mb-4">
                Create structured audit reports with profile analysis, content strategy, and action plans.
              </p>
              <div className="flex items-center gap-2 text-sm text-brand-400 font-medium">
                Open Workspace
                <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/admin/content-pack-generator"
              className="block bg-surface-800/50 border border-white/5 rounded-xl p-6 hover:border-brand-500/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Content Pack Generator</h2>
              <p className="text-sm text-slate-400 mb-4">
                Generate 30 content ideas, captions, video hooks, and a 30-day publishing calendar.
              </p>
              <div className="flex items-center gap-2 text-sm text-brand-400 font-medium">
                Open Workspace
                <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/admin/growth-partner"
              className="block bg-surface-800/50 border border-white/5 rounded-xl p-6 hover:border-brand-500/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-brand-400" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Growth Partner Workspace</h2>
              <p className="text-sm text-slate-400 mb-4">
                Manage monthly growth partner clients, track deliverables, and record reviews.
              </p>
              <div className="flex items-center gap-2 text-sm text-brand-400 font-medium">
                Open Workspace
                <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-surface-800/50 border border-white/5 rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">How the Service Delivery Workflow Works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-brand-400 mb-2">For Audit Reports & Content Packs:</h3>
              <ol className="space-y-2 text-sm text-slate-400">
                <li className="flex gap-2">
                  <span className="text-brand-400 font-bold">1.</span>
                  Create a new report/pack and fill in client information
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-400 font-bold">2.</span>
                  Use your preferred AI tool (ChatGPT, Claude, etc.) with the prompt templates
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-400 font-bold">3.</span>
                  Paste the AI-generated content into the report fields
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-400 font-bold">4.</span>
                  Review and edit the content as needed
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-400 font-bold">5.</span>
                  Preview the report and generate PDF (print to PDF from browser)
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-400 font-bold">6.</span>
                  Update status to "Approved" then "Delivered" when sent to client
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-brand-400 mb-2">For Growth Partner Clients:</h3>
              <ol className="space-y-2 text-sm text-slate-400">
                <li className="flex gap-2">
                  <span className="text-brand-400 font-bold">1.</span>
                  Add a new client with their details and agreed deliverables
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-400 font-bold">2.</span>
                  For each month, create a deliverable record
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-400 font-bold">3.</span>
                  Prepare content calendar and drafts (use AI tools as needed)
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-400 font-bold">4.</span>
                  Share deliverables with client manually (email, drive link, etc.)
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-400 font-bold">5.</span>
                  Track approval status and update delivery status
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-400 font-bold">6.</span>
                  Record monthly review notes and adjust strategy
                </li>
              </ol>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-500/5 border border-amber-500/10 rounded-lg">
            <p className="text-sm text-amber-300">
              <strong>Important:</strong> This system does not auto-publish content to social media platforms. 
              All content is prepared here and shared with clients manually. Scheduling and publishing 
              require separate platform integrations and permissions.
            </p>
          </div>
        </motion.div>
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
