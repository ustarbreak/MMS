import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, FileText, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { ContentPack, REPORT_STATUS_LABELS, REPORT_STATUS_COLORS } from '../../lib/serviceTypes';
import { createContentPack, getContentPack, updateContentPack, getAllContentPacks } from '../../lib/serviceDeliveryService';
import { generateContentPackHTML, openReportInNewWindow } from '../../lib/reportGenerator';
import { isAdmin } from '../../lib/authService';

export default function ContentPackGenerator() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [packs, setPacks] = useState<ContentPack[]>([]);
  const [selectedPack, setSelectedPack] = useState<ContentPack | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    platform: '',
    niche: '',
    target_audience: '',
    brand_voice: '',
    content_goals: '',
    customer_notes: '',
    content_ideas: [] as any[],
    caption_drafts: [] as any[],
    video_hooks: [] as any[],
    calls_to_action: [] as string[],
    suggested_formats: [] as string[],
    publishing_calendar: [] as any[],
    platform_adaptations: {} as Record<string, any>,
    admin_notes: '',
  });

  useEffect(() => {
    async function checkAuth() {
      const isAdminUser = await isAdmin();
      if (!isAdminUser) {
        navigate('/admin/login');
        return;
      }
      await loadPacks();
      setLoading(false);
    }
    checkAuth();
  }, [navigate]);

  const loadPacks = async () => {
    const result = await getAllContentPacks({ limit: 50 });
    if (result.packs) {
      setPacks(result.packs);
    }
  };

  const handleCreateNew = () => {
    setSelectedPack(null);
    setFormData({
      platform: '',
      niche: '',
      target_audience: '',
      brand_voice: '',
      content_goals: '',
      customer_notes: '',
      content_ideas: [],
      caption_drafts: [],
      video_hooks: [],
      calls_to_action: [],
      suggested_formats: [],
      publishing_calendar: [],
      platform_adaptations: {},
      admin_notes: '',
    });
  };

  const handleSelectPack = async (pack: ContentPack) => {
    const result = await getContentPack(pack.id);
    if (result.pack) {
      setSelectedPack(result.pack);
      setFormData({
        platform: result.pack.platform,
        niche: result.pack.niche,
        target_audience: result.pack.target_audience,
        brand_voice: result.pack.brand_voice,
        content_goals: result.pack.content_goals,
        customer_notes: result.pack.customer_notes,
        content_ideas: result.pack.content_ideas,
        caption_drafts: result.pack.caption_drafts,
        video_hooks: result.pack.video_hooks,
        calls_to_action: result.pack.calls_to_action,
        suggested_formats: result.pack.suggested_formats,
        publishing_calendar: result.pack.publishing_calendar,
        platform_adaptations: result.pack.platform_adaptations,
        admin_notes: result.pack.admin_notes,
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      if (selectedPack) {
        const result = await updateContentPack(selectedPack.id, formData);
        if (!result.success) {
          setMessage({ type: 'error', text: result.error || 'Failed to save' });
        } else {
          setMessage({ type: 'success', text: 'Content pack saved successfully' });
          await loadPacks();
        }
      } else {
        const result = await createContentPack(formData);
        if (!result.success || !result.pack) {
          setMessage({ type: 'error', text: result.error || 'Failed to create' });
        } else {
          setSelectedPack(result.pack);
          setMessage({ type: 'success', text: 'Content pack created successfully' });
          await loadPacks();
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (!selectedPack) {
      setMessage({ type: 'error', text: 'Save the content pack first before previewing' });
      return;
    }
    const html = generateContentPackHTML(selectedPack);
    openReportInNewWindow(html);
  };

  const handleStatusChange = async (status: ContentPack['status']) => {
    if (!selectedPack) return;
    setSaving(true);
    const result = await updateContentPack(selectedPack.id, { 
      status,
      delivered_at: status === 'delivered' ? new Date().toISOString() : undefined,
    });
    if (result.success) {
      setMessage({ type: 'success', text: `Status updated to ${REPORT_STATUS_LABELS[status]}` });
      await loadPacks();
      const updated = await getContentPack(selectedPack.id);
      if (updated.pack) setSelectedPack(updated.pack);
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
            <h1 className="text-2xl font-bold text-white">Content Pack Generator</h1>
            <p className="text-sm text-slate-400">Create and manage content packs</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg transition-all"
          >
            New Content Pack
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
          {/* Sidebar: Pack List */}
          <div className="lg:col-span-1">
            <div className="bg-surface-800/50 border border-white/5 rounded-xl p-4 sticky top-24">
              <h3 className="text-sm font-semibold text-white mb-3">Content Packs</h3>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {packs.length === 0 ? (
                  <p className="text-xs text-slate-500">No content packs yet</p>
                ) : (
                  packs.map((pack) => (
                    <button
                      key={pack.id}
                      onClick={() => handleSelectPack(pack)}
                      className={`w-full text-left p-3 rounded-lg text-xs transition-all ${
                        selectedPack?.id === pack.id
                          ? 'bg-brand-600/20 border border-brand-500/30'
                          : 'bg-surface-700/50 border border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="font-medium text-white truncate">{pack.niche}</div>
                      <div className="text-slate-400 truncate">{pack.platform}</div>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium border ${REPORT_STATUS_COLORS[pack.status]}`}>
                        {REPORT_STATUS_LABELS[pack.status]}
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
                Client & Brand Information
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
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Brand Voice</label>
                  <input
                    type="text"
                    value={formData.brand_voice}
                    onChange={(e) => setFormData({ ...formData, brand_voice: e.target.value })}
                    placeholder="e.g., Professional, Casual, Energetic"
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-slate-300 mb-1">Content Goals</label>
                  <textarea
                    value={formData.content_goals}
                    onChange={(e) => setFormData({ ...formData, content_goals: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 resize-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* Content Sections */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-surface-800/50 border border-white/5 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Content</h2>
              <p className="text-xs text-slate-500 mb-4">
                Generate content using your preferred AI tool and paste the results here. Edit as needed.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Content Ideas (JSON array)</label>
                  <textarea
                    value={JSON.stringify(formData.content_ideas, null, 2)}
                    onChange={(e) => {
                      try {
                        setFormData({ ...formData, content_ideas: JSON.parse(e.target.value) });
                      } catch {}
                    }}
                    rows={6}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-brand-500/50 resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1">Caption Drafts (JSON array)</label>
                  <textarea
                    value={JSON.stringify(formData.caption_drafts, null, 2)}
                    onChange={(e) => {
                      try {
                        setFormData({ ...formData, caption_drafts: JSON.parse(e.target.value) });
                      } catch {}
                    }}
                    rows={6}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-brand-500/50 resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1">Video Hooks (JSON array)</label>
                  <textarea
                    value={JSON.stringify(formData.video_hooks, null, 2)}
                    onChange={(e) => {
                      try {
                        setFormData({ ...formData, video_hooks: JSON.parse(e.target.value) });
                      } catch {}
                    }}
                    rows={4}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-brand-500/50 resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1">Calls to Action (one per line)</label>
                  <textarea
                    value={formData.calls_to_action.join('\n')}
                    onChange={(e) => setFormData({ ...formData, calls_to_action: e.target.value.split('\n').filter(Boolean) })}
                    rows={3}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1">Suggested Formats (one per line)</label>
                  <textarea
                    value={formData.suggested_formats.join('\n')}
                    onChange={(e) => setFormData({ ...formData, suggested_formats: e.target.value.split('\n').filter(Boolean) })}
                    rows={3}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1">Publishing Calendar (JSON array)</label>
                  <textarea
                    value={JSON.stringify(formData.publishing_calendar, null, 2)}
                    onChange={(e) => {
                      try {
                        setFormData({ ...formData, publishing_calendar: JSON.parse(e.target.value) });
                      } catch {}
                    }}
                    rows={6}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-brand-500/50 resize-y"
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
                {selectedPack ? 'Save Changes' : 'Create Content Pack'}
              </button>

              {selectedPack && (
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
                        disabled={saving || selectedPack.status === status}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all disabled:opacity-50 ${
                          selectedPack.status === status
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
