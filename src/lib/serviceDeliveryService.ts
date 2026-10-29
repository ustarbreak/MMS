/**
 * Service Delivery Service
 *
 * Handles CRUD operations for audit reports, content packs, and growth partner management.
 */

import { supabase } from './supabase';
import {
  AuditReport,
  ContentPack,
  GrowthPartnerClient,
  GrowthPartnerDeliverable,
  PromptTemplate,
  ReportStatus,
  ClientStatus,
} from './serviceTypes';

// ─── AUDIT REPORTS ────────────────────────────────────────────────────────────

export async function createAuditReport(data: Partial<AuditReport>): Promise<{
  success: boolean;
  report?: AuditReport;
  error?: string;
}> {
  try {
    const { data: report, error } = await supabase
      .from('audit_reports')
      .insert({
        ...data,
        status: 'draft',
        generated_by: 'manual',
      })
      .select()
      .single();

    if (error) {
      console.error('Create audit report error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, report };
  } catch (error) {
    console.error('Unexpected error creating audit report:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function getAuditReport(id: string): Promise<{
  report?: AuditReport;
  error?: string;
}> {
  const { data, error } = await supabase
    .from('audit_reports')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return { error: 'Audit report not found' };
  }

  return { report: data };
}

export async function getAllAuditReports(filters?: {
  status?: ReportStatus;
  limit?: number;
  offset?: number;
}): Promise<{ reports?: AuditReport[]; count?: number; error?: string }> {
  let query = supabase
    .from('audit_reports')
    .select('*', { count: 'exact' });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  query = query.order('created_at', { ascending: false });

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    return { error: 'Failed to fetch audit reports' };
  }

  return { reports: data, count: count ?? undefined };
}

export async function updateAuditReport(
  id: string,
  updates: Partial<AuditReport>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('audit_reports')
    .update(updates)
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deleteAuditReport(id: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const { error } = await supabase
    .from('audit_reports')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ─── CONTENT PACKS ────────────────────────────────────────────────────────────

export async function createContentPack(data: Partial<ContentPack>): Promise<{
  success: boolean;
  pack?: ContentPack;
  error?: string;
}> {
  try {
    const { data: pack, error } = await supabase
      .from('content_packs')
      .insert({
        ...data,
        status: 'draft',
        generated_by: 'manual',
      })
      .select()
      .single();

    if (error) {
      console.error('Create content pack error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, pack };
  } catch (error) {
    console.error('Unexpected error creating content pack:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function getContentPack(id: string): Promise<{
  pack?: ContentPack;
  error?: string;
}> {
  const { data, error } = await supabase
    .from('content_packs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return { error: 'Content pack not found' };
  }

  return { pack: data };
}

export async function getAllContentPacks(filters?: {
  status?: ReportStatus;
  limit?: number;
  offset?: number;
}): Promise<{ packs?: ContentPack[]; count?: number; error?: string }> {
  let query = supabase
    .from('content_packs')
    .select('*', { count: 'exact' });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  query = query.order('created_at', { ascending: false });

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    return { error: 'Failed to fetch content packs' };
  }

  return { packs: data, count: count ?? undefined };
}

export async function updateContentPack(
  id: string,
  updates: Partial<ContentPack>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('content_packs')
    .update(updates)
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deleteContentPack(id: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const { error } = await supabase
    .from('content_packs')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ─── GROWTH PARTNER CLIENTS ───────────────────────────────────────────────────

export async function createGrowthPartnerClient(
  data: Partial<GrowthPartnerClient>
): Promise<{ success: boolean; client?: GrowthPartnerClient; error?: string }> {
  try {
    const { data: client, error } = await supabase
      .from('growth_partner_clients')
      .insert({
        ...data,
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('Create growth partner client error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, client };
  } catch (error) {
    console.error('Unexpected error creating growth partner client:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function getGrowthPartnerClient(id: string): Promise<{
  client?: GrowthPartnerClient;
  error?: string;
}> {
  const { data, error } = await supabase
    .from('growth_partner_clients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return { error: 'Client not found' };
  }

  return { client: data };
}

export async function getAllGrowthPartnerClients(filters?: {
  status?: ClientStatus;
  limit?: number;
  offset?: number;
}): Promise<{ clients?: GrowthPartnerClient[]; count?: number; error?: string }> {
  let query = supabase
    .from('growth_partner_clients')
    .select('*', { count: 'exact' });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  query = query.order('created_at', { ascending: false });

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    return { error: 'Failed to fetch clients' };
  }

  return { clients: data, count: count ?? undefined };
}

export async function updateGrowthPartnerClient(
  id: string,
  updates: Partial<GrowthPartnerClient>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('growth_partner_clients')
    .update(updates)
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ─── GROWTH PARTNER DELIVERABLES ──────────────────────────────────────────────

export async function createGrowthPartnerDeliverable(
  data: Partial<GrowthPartnerDeliverable>
): Promise<{ success: boolean; deliverable?: GrowthPartnerDeliverable; error?: string }> {
  try {
    const { data: deliverable, error } = await supabase
      .from('growth_partner_deliverables')
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error('Create deliverable error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, deliverable };
  } catch (error) {
    console.error('Unexpected error creating deliverable:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

export async function getDeliverablesForClient(clientId: string): Promise<{
  deliverables?: GrowthPartnerDeliverable[];
  error?: string;
}> {
  const { data, error } = await supabase
    .from('growth_partner_deliverables')
    .select('*')
    .eq('client_id', clientId)
    .order('service_month', { ascending: false });

  if (error) {
    return { error: 'Failed to fetch deliverables' };
  }

  return { deliverables: data };
}

export async function updateGrowthPartnerDeliverable(
  id: string,
  updates: Partial<GrowthPartnerDeliverable>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('growth_partner_deliverables')
    .update(updates)
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ─── PROMPT TEMPLATES ─────────────────────────────────────────────────────────

export async function getAllPromptTemplates(category?: string): Promise<{
  templates?: PromptTemplate[];
  error?: string;
}> {
  let query = supabase
    .from('prompt_templates')
    .select('*')
    .eq('is_active', true);

  if (category) {
    query = query.eq('category', category);
  }

  query = query.order('name', { ascending: true });

  const { data, error } = await query;

  if (error) {
    return { error: 'Failed to fetch templates' };
  }

  return { templates: data };
}

export async function getPromptTemplate(id: string): Promise<{
  template?: PromptTemplate;
  error?: string;
}> {
  const { data, error } = await supabase
    .from('prompt_templates')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return { error: 'Template not found' };
  }

  return { template: data };
}

export async function updatePromptTemplate(
  id: string,
  updates: Partial<PromptTemplate>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('prompt_templates')
    .update(updates)
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ─── STATISTICS ───────────────────────────────────────────────────────────────

export async function getServiceDeliveryStats(): Promise<{
  stats?: {
    total_audits: number;
    audits_delivered: number;
    total_content_packs: number;
    packs_delivered: number;
    active_clients: number;
    total_clients: number;
  };
  error?: string;
}> {
  try {
    const [auditsResult, packsResult, clientsResult] = await Promise.all([
      supabase.from('audit_reports').select('status'),
      supabase.from('content_packs').select('status'),
      supabase.from('growth_partner_clients').select('status'),
    ]);

    if (auditsResult.error || packsResult.error || clientsResult.error) {
      return { error: 'Failed to fetch statistics' };
    }

    const stats = {
      total_audits: auditsResult.data?.length || 0,
      audits_delivered: auditsResult.data?.filter((a) => a.status === 'delivered').length || 0,
      total_content_packs: packsResult.data?.length || 0,
      packs_delivered: packsResult.data?.filter((p) => p.status === 'delivered').length || 0,
      active_clients: clientsResult.data?.filter((c) => c.status === 'active').length || 0,
      total_clients: clientsResult.data?.length || 0,
    };

    return { stats };
  } catch (error) {
    console.error('Error fetching service delivery stats:', error);
    return { error: 'Failed to fetch statistics' };
  }
}
