import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, FileText, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { AuditReport, REPORT_STATUS_LABELS, REPORT_STATUS_COLORS } from '../../lib/serviceTypes';
import { createAuditReport, getAuditReport, updateAuditReport, getAllAuditReports } from '../../lib/serviceDeliveryService';
import { generateAuditReportHTML, openReportInNewWindow } from '../../lib/reportGenerator';
import { isAdmin } from '../../lib/authService';

export default function AuditGenerator() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reports, setReports] = useState<AuditReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<AuditReport | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    platform: '',
    niche: '',
    target_audience: '',
    main_objective: '',
    profile_url: '',
    profile_data: {} as Record<string, any>,
    customer_notes: '',
    executive_summary: '',
    profile_positioning: '',
    bio_suggestions: '',
    content_strategy: '',
    recommended_formats: [] as string[],
    content_ideas: [] as any[],
    seven_day_plan: [] as any[],
    performance_metrics: [] as any[],
    next_steps: '',
    admin_notes: '',
  });

  useEffect(() => {
    async function checkAuth() {
      const isAdminUser = await isAdmin();
      if (!isAdminUser) {
        navigate('/admin/login');
        return;
      }
      await loadReports();
      setLoading(false);
    }
    checkAuth();
  }, [navigate]);

  const loadReports = async () => {
    const result = await getAllAuditReports({ limit: 50 });
    if (result.reports) {
      setReports(result.reports);
    }
  };

  const handleCreateNew = () => {
    setSelectedReport(null);
    setFormData({
      platform: '',
      niche: '',
      target_audience: '',
      main_objective: '',
      profile_url: '',
      profile_data: {},
      customer_notes: '',
      executive_summary: '',
      profile_positioning: '',
      bio_suggestions: '',
      content_strategy: '',
      recommended_formats: [],
      content_ideas: [],
      seven_day_plan: [],
      performance_metrics: [],
      next_steps: '',
      admin_notes: '',
    });
  };

  const handleSelectReport = async (report: AuditReport) => {
    const result = await getAuditReport(report.id);
    if (result.report) {
      setSelectedReport(result.report);
      setFormData({
        platform: result.report.platform,
        niche: result.report.niche,
        target_audience: result.report.target_audience,
        main_objective: result.report.main_objective,
        profile_url: result.report.profile_url,
        profile_data: result.report.profile_data,
        customer_notes: result.report.customer_notes,
        executive_summary: result.report.executive_summary,
        profile_positioning: result.report.profile_positioning,
        bio_suggestions: result.report.bio_suggestions,
        content_strategy: result.report.content_strategy,
        recommended_formats: result.report.recommended_formats,
        content_ideas: result.report.content_ideas,
        seven_day_plan: result.report.seven_day_plan,
        performance_metrics: result.report.performance_metrics,
        next_steps: result.report.next_steps,
        admin_notes: result.report.admin_notes,
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      if (selectedReport) {
        const result = await updateAuditReport(selectedReport.id, formData);
        if (!result.success) {
          setMessage({ type: 'error', text: result.error || 'Failed to save' });
        } else {
          setMessage({ type: 'success', text: 'Report saved successfully' });
          await loadReports();
        }
      } else {
        const result = await createAuditReport(formData);
        if (!result.success || !result.report) {
          setMessage({ type: 'error', text: result.error || 'Failed to create' });
        } else {
          setSelectedReport(result.report);
          setMessage({ type: 'success', text: 'Report created successfully' });
          await loadReports();
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (!selectedReport) {
      setMessage({ type: 'error', text: 'Save the report first before previewing' });
      return;
    }
    const html = generateAuditReportHTML(selectedReport);
    openReportInNewWindow(html);
  };

  const handleStatusChange = async (status: AuditReport['status']) => {
    if (!selectedReport) return;
    setSaving(true);
    const result = await updateAuditReport(selectedReport.id, { 
      status,
      delivered_at: status === 'delivered' ? new Date().toISOString() : undefined,
    });
    if (result.success) {
      setMessage({ type: 'success', text: `Status updated to ${REPORT_STATUS_LABELS[status]}` });
      await loadReports();
      const updated = await getAuditReport(selectedReport.id);
      if (updated.report) setSelectedReport(updated.report);
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update status' });
    }
    setSaving(false);
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-2 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-white">Creator Audit Generator</h1>
            <p className="text-sm text-slate-400">Create and manage audit reports</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg transition-all"
          >
            New Audit
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
            message.type === 'success' ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'
          }`}>
            {message.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
            <p className={`text-sm ${message.type === 'success' ? 'text-green-300' : 'text-red-300'}`}>{message.text}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar: Report List */}
          <div className="lg:col-span-1">
            <div className="bg-surface-800/50 border border-white/5 rounded-xl p-4 sticky top-24">
              <h3 className="text-sm font-semibold text-white mb-3">Reports</h3>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {reports.length === 0 ? (
                  <p className="text-xs text-slate-500">No reports yet</p>
                ) : (
                  reports.map((report) => (
                    <button
                      key={report.id}
                      onClick={() => handleSelectReport(report)}
                      className={`w-full text-left p-3 rounded-lg text-xs transition-all ${
                        selectedReport?.id === report.id
                          ? 'bg-brand-600/20 border border-brand-500/30'
                          : 'bg-surface-700/50 border border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="font-medium text-white truncate">{report.niche}</div>
                      <div className="text-slate-400 truncate">{report.platform}</div>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium border ${REPORT_STATUS_COLORS[report.status]}`}>
                        {REPORT_STATUS_LABELS[report.status]}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main: Editor */}
          <div className="lg:col-span-3 space-y-6">
            {/* Input Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-surface-800/50 border border-white/5 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-400" />
                Client & Profile Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Platform *</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50"
                  >
                    <option value="">Select platform</option>
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Twitter/X">Twitter/X</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Facebook">Facebook</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Niche *</label>
                  <input
                    type="text"
                    value={formData.niche}
                    onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                    placeholder="e.g., Fitness, Music, Tech"
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Target Audience</label>
                  <input
                    type="text"
                    value={formData.target_audience}
                    onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                    placeholder="e.g., Women 25-35 interested in wellness"
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Main Objective</label>
                  <input
                    type="text"
                    value={formData.main_objective}
                    onChange={(e) => setFormData({ ...formData, main_objective: e.target.value })}
                    placeholder="e.g., Grow followers, drive sales"
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-slate-300 mb-1">Profile URL</label>
                  <input
                    type="url"
                    value={formData.profile_url}
                    onChange={(e) => setFormData({ ...formData, profile_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-slate-300 mb-1">Customer Notes</label>
                  <textarea
                    value={formData.customer_notes}
                    onChange={(e) => setFormData({ ...formData, customer_notes: e.target.value })}
                    rows={2}
                    placeholder="Any additional notes from the customer..."
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 resize-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* Report Sections */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-surface-800/50 border border-white/5 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Report Content</h2>
              <p className="text-xs text-slate-500 mb-4">
                Generate content using your preferred AI tool and paste the results here. Edit as needed before approving.
              </p>
              <div className="space-y-4">
                {[
                  { key: 'executive_summary', label: 'Executive Summary', rows: 4 },
                  { key: 'profile_positioning', label: 'Profile Positioning', rows: 3 },
                  { key: 'bio_suggestions', label: 'Bio & Profile Improvement Suggestions', rows: 3 },
                  { key: 'content_strategy', label: 'Content Strategy', rows: 5 },
                  { key: 'next_steps', label: 'Next Steps', rows: 3 },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm text-slate-300 mb-1">{field.label}</label>
                    <textarea
                      value={(formData as any)[field.key]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      rows={field.rows}
                      className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 resize-y"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm text-slate-300 mb-1">Recommended Content Formats (one per line)</label>
                  <textarea
                    value={formData.recommended_formats.join('\n')}
                    onChange={(e) => setFormData({ ...formData, recommended_formats: e.target.value.split('\n').filter(Boolean) })}
                    rows={3}
                    placeholder="Short-form video&#10;Carousel posts&#10;Stories"
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 resize-y"
                  />
                </div>
              </div>
            </motion.div>

            {/* Admin Notes */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-surface-800/50 border border-white/5 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Admin Notes</h2>
              <textarea
                value={formData.admin_notes}
                onChange={(e) => setFormData({ ...formData, admin_notes: e.target.value })}
                rows={3}
                placeholder="Internal notes about this report..."
                className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 resize-y"
              />
            </motion.div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 disabled:bg-brand-600/50 text-white text-sm font-medium rounded-lg transition-all"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {selectedReport ? 'Save Changes' : 'Create Report'}
              </button>

              {selectedReport && (
                <>
                  <button
                    onClick={handlePreview}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    Preview Report
                  </button>

                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs text-slate-500">Status:</span>
                    {(['draft', 'review', 'approved', 'delivered'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        disabled={saving || selectedReport.status === status}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all disabled:opacity-50 ${
                          selectedReport.status === status
                            ? REPORT_STATUS_COLORS[status]
                            : 'bg-surface-700/50 text-slate-400 border-white/5 hover:border-white/10'
                        }`}
                      >
                        {REPORT_STATUS_LABELS[status]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
