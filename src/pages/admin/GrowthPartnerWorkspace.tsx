import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2, AlertCircle, CheckCircle, Users, Calendar } from 'lucide-react';
import { GrowthPartnerClient, GrowthPartnerDeliverable, CLIENT_STATUS_LABELS, CLIENT_STATUS_COLORS } from '../../lib/serviceTypes';
import {
  createGrowthPartnerClient,
  getGrowthPartnerClient,
  updateGrowthPartnerClient,
  getAllGrowthPartnerClients,
  getDeliverablesForClient,
  createGrowthPartnerDeliverable,
  updateGrowthPartnerDeliverable,
} from '../../lib/serviceDeliveryService';
import { isAdmin } from '../../lib/authService';

export default function GrowthPartnerWorkspace() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [clients, setClients] = useState<GrowthPartnerClient[]>([]);
  const [selectedClient, setSelectedClient] = useState<GrowthPartnerClient | null>(null);
  const [deliverables, setDeliverables] = useState<GrowthPartnerDeliverable[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [clientForm, setClientForm] = useState({
    client_name: '',
    client_email: '',
    platform: '',
    niche: '',
    start_date: '',
    end_date: '',
    monthly_fee_eur: 0,
    monthly_fee_mad: 0,
    agreed_deliverables: {} as Record<string, any>,
    client_notes: '',
    admin_notes: '',
  });

  const [deliverableForm, setDeliverableForm] = useState({
    service_month: '',
    content_calendar: [] as any[],
    content_drafts: [] as any[],
    promotional_concepts: [] as any[],
    monthly_review_notes: '',
  });

  useEffect(() => {
    async function checkAuth() {
      const isAdminUser = await isAdmin();
      if (!isAdminUser) {
        navigate('/admin/login');
        return;
      }
      await loadClients();
      setLoading(false);
    }
    checkAuth();
  }, [navigate]);

  const loadClients = async () => {
    const result = await getAllGrowthPartnerClients({ limit: 50 });
    if (result.clients) {
      setClients(result.clients);
    }
  };

  const handleCreateNewClient = () => {
    setSelectedClient(null);
    setDeliverables([]);
    setClientForm({
      client_name: '',
      client_email: '',
      platform: '',
      niche: '',
      start_date: '',
      end_date: '',
      monthly_fee_eur: 149,
      monthly_fee_mad: 1639,
      agreed_deliverables: {},
      client_notes: '',
      admin_notes: '',
    });
  };

  const handleSelectClient = async (client: GrowthPartnerClient) => {
    const result = await getGrowthPartnerClient(client.id);
    if (result.client) {
      setSelectedClient(result.client);
      setClientForm({
        client_name: result.client.client_name,
        client_email: result.client.client_email,
        platform: result.client.platform,
        niche: result.client.niche,
        start_date: result.client.start_date,
        end_date: result.client.end_date || '',
        monthly_fee_eur: result.client.monthly_fee_eur,
        monthly_fee_mad: result.client.monthly_fee_mad,
        agreed_deliverables: result.client.agreed_deliverables,
        client_notes: result.client.client_notes,
        admin_notes: result.client.admin_notes,
      });

      // Load deliverables for this client
      const delResult = await getDeliverablesForClient(result.client.id);
      if (delResult.deliverables) {
        setDeliverables(delResult.deliverables);
      }
    }
  };

  const handleSaveClient = async () => {
    setSaving(true);
    setMessage(null);

    try {
      if (selectedClient) {
        const result = await updateGrowthPartnerClient(selectedClient.id, clientForm);
        if (!result.success) {
          setMessage({ type: 'error', text: result.error || 'Failed to save' });
        } else {
          setMessage({ type: 'success', text: 'Client updated successfully' });
          await loadClients();
        }
      } else {
        const result = await createGrowthPartnerClient(clientForm);
        if (!result.success || !result.client) {
          setMessage({ type: 'error', text: result.error || 'Failed to create' });
        } else {
          setSelectedClient(result.client);
          setMessage({ type: 'success', text: 'Client created successfully' });
          await loadClients();
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setSaving(false);
    }
  };

  const handleClientStatusChange = async (status: GrowthPartnerClient['status']) => {
    if (!selectedClient) return;
    setSaving(true);
    const result = await updateGrowthPartnerClient(selectedClient.id, { status });
    if (result.success) {
      setMessage({ type: 'success', text: `Status updated to ${CLIENT_STATUS_LABELS[status]}` });
      await loadClients();
      const updated = await getGrowthPartnerClient(selectedClient.id);
      if (updated.client) setSelectedClient(updated.client);
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update status' });
    }
    setSaving(false);
  };

  const handleCreateDeliverable = async () => {
    if (!selectedClient) return;
    setSaving(true);
    setMessage(null);

    const result = await createGrowthPartnerDeliverable({
      client_id: selectedClient.id,
      ...deliverableForm,
    });

    if (!result.success || !result.deliverable) {
      setMessage({ type: 'error', text: result.error || 'Failed to create deliverable' });
    } else {
      setMessage({ type: 'success', text: 'Monthly deliverable created' });
      const delResult = await getDeliverablesForClient(selectedClient.id);
      if (delResult.deliverables) setDeliverables(delResult.deliverables);
      setDeliverableForm({
        service_month: '',
        content_calendar: [],
        content_drafts: [],
        promotional_concepts: [],
        monthly_review_notes: '',
      });
    }
    setSaving(false);
  };

  const handleUpdateDeliverable = async (id: string, updates: Partial<GrowthPartnerDeliverable>) => {
    const result = await updateGrowthPartnerDeliverable(id, updates);
    if (!result.success) {
      setMessage({ type: 'error', text: result.error || 'Failed to update' });
    } else {
      setMessage({ type: 'success', text: 'Deliverable updated' });
      if (selectedClient) {
        const delResult = await getDeliverablesForClient(selectedClient.id);
        if (delResult.deliverables) setDeliverables(delResult.deliverables);
      }
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-2 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-white">Growth Partner Workspace</h1>
            <p className="text-sm text-slate-400">Manage monthly growth partner clients and deliverables</p>
          </div>
          <button
            onClick={handleCreateNewClient}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg transition-all"
          >
            New Client
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
          {/* Sidebar: Client List */}
          <div className="lg:col-span-1">
            <div className="bg-surface-800/50 border border-white/5 rounded-xl p-4 sticky top-24">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-400" />
                Clients
              </h3>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {clients.length === 0 ? (
                  <p className="text-xs text-slate-500">No clients yet</p>
                ) : (
                  clients.map((client) => (
                    <button
                      key={client.id}
                      onClick={() => handleSelectClient(client)}
                      className={`w-full text-left p-3 rounded-lg text-xs transition-all ${
                        selectedClient?.id === client.id
                          ? 'bg-brand-600/20 border border-brand-500/30'
                          : 'bg-surface-700/50 border border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="font-medium text-white truncate">{client.client_name}</div>
                      <div className="text-slate-400 truncate">{client.platform} • {client.niche}</div>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium border ${CLIENT_STATUS_COLORS[client.status]}`}>
                        {CLIENT_STATUS_LABELS[client.status]}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main: Client Details & Deliverables */}
          <div className="lg:col-span-3 space-y-6">
            {/* Client Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-surface-800/50 border border-white/5 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Client Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Client Name *</label>
                  <input
                    type="text"
                    value={clientForm.client_name}
                    onChange={(e) => setClientForm({ ...clientForm, client_name: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Email *</label>
                  <input
                    type="email"
                    value={clientForm.client_email}
                    onChange={(e) => setClientForm({ ...clientForm, client_email: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Platform *</label>
                  <select
                    value={clientForm.platform}
                    onChange={(e) => setClientForm({ ...clientForm, platform: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50"
                  >
                    <option value="">Select</option>
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
                    value={clientForm.niche}
                    onChange={(e) => setClientForm({ ...clientForm, niche: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Start Date *</label>
                  <input
                    type="date"
                    value={clientForm.start_date}
                    onChange={(e) => setClientForm({ ...clientForm, start_date: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={clientForm.end_date}
                    onChange={(e) => setClientForm({ ...clientForm, end_date: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Monthly Fee (EUR)</label>
                  <input
                    type="number"
                    value={clientForm.monthly_fee_eur}
                    onChange={(e) => setClientForm({ ...clientForm, monthly_fee_eur: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Monthly Fee (MAD)</label>
                  <input
                    type="number"
                    value={clientForm.monthly_fee_mad}
                    onChange={(e) => setClientForm({ ...clientForm, monthly_fee_mad: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-slate-300 mb-1">Client Notes</label>
                  <textarea
                    value={clientForm.client_notes}
                    onChange={(e) => setClientForm({ ...clientForm, client_notes: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50 resize-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-slate-300 mb-1">Admin Notes</label>
                  <textarea
                    value={clientForm.admin_notes}
                    onChange={(e) => setClientForm({ ...clientForm, admin_notes: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50 resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={handleSaveClient}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 disabled:bg-brand-600/50 text-white text-sm font-medium rounded-lg transition-all"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {selectedClient ? 'Save Client' : 'Create Client'}
                </button>

                {selectedClient && (
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs text-slate-500">Status:</span>
                    {(['active', 'paused', 'completed', 'cancelled'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleClientStatusChange(status)}
                        disabled={saving || selectedClient.status === status}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all disabled:opacity-50 ${
                          selectedClient.status === status
                            ? CLIENT_STATUS_COLORS[status]
                            : 'bg-surface-700/50 text-slate-400 border-white/5 hover:border-white/10'
                        }`}
                      >
                        {CLIENT_STATUS_LABELS[status]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Monthly Deliverables */}
            {selectedClient && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-surface-800/50 border border-white/5 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-400" />
                  Monthly Deliverables
                </h2>

                {/* Existing deliverables */}
                {deliverables.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {deliverables.map((del) => (
                      <div key={del.id} className="bg-surface-700/50 border border-white/5 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">
                            {new Date(del.service_month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </span>
                          <div className="flex gap-2">
                            <select
                              value={del.delivery_status}
                              onChange={(e) => handleUpdateDeliverable(del.id, { delivery_status: e.target.value as any })}
                              className="px-2 py-1 bg-surface-600 border border-white/10 rounded text-xs text-white"
                            >
                              <option value="pending">Pending</option>
                              <option value="in_progress">In Progress</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-slate-500">Calendar:</span>
                            <span className={`ml-1 ${del.calendar_status === 'approved' ? 'text-green-400' : del.calendar_status === 'sent' ? 'text-amber-400' : 'text-slate-400'}`}>
                              {del.calendar_status}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">Drafts:</span>
                            <span className={`ml-1 ${del.drafts_status === 'approved' ? 'text-green-400' : del.drafts_status === 'sent' ? 'text-amber-400' : 'text-slate-400'}`}>
                              {del.drafts_status}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">Items:</span>
                            <span className="ml-1 text-white">
                              {del.content_calendar.length} cal, {del.content_drafts.length} drafts
                            </span>
                          </div>
                        </div>
                        {del.monthly_review_notes && (
                          <p className="text-xs text-slate-400 mt-2">{del.monthly_review_notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* New deliverable form */}
                <div className="border-t border-white/5 pt-4">
                  <h3 className="text-sm font-medium text-white mb-3">Add Monthly Deliverable</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Service Month *</label>
                      <input
                        type="month"
                        value={deliverableForm.service_month}
                        onChange={(e) => setDeliverableForm({ ...deliverableForm, service_month: e.target.value })}
                        className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Monthly Review Notes</label>
                      <input
                        type="text"
                        value={deliverableForm.monthly_review_notes}
                        onChange={(e) => setDeliverableForm({ ...deliverableForm, monthly_review_notes: e.target.value })}
                        className="w-full px-3 py-2 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleCreateDeliverable}
                    disabled={saving || !deliverableForm.service_month}
                    className="mt-3 px-4 py-2 bg-brand-600 hover:bg-brand-500 disabled:bg-brand-600/50 text-white text-sm font-medium rounded-lg transition-all"
                  >
                    Add Deliverable
                  </button>
                </div>

                <div className="mt-4 p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                  <p className="text-xs text-amber-300">
                    <strong>Note:</strong> Content is prepared and shared with the client manually. 
                    This workspace tracks what has been delivered — it does not auto-publish to social media platforms.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
