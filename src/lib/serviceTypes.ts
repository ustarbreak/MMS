/**
 * Service Delivery Types
 *
 * Type definitions for audit reports, content packs, and growth partner management.
 */

// ─── AUDIT REPORTS ────────────────────────────────────────────────────────────

export interface AuditReport {
  id: string;
  order_id: string | null;
  
  // Input data
  platform: string;
  niche: string;
  target_audience: string;
  main_objective: string;
  profile_url: string;
  profile_data: Record<string, any>;
  customer_notes: string;
  
  // Generated report sections
  executive_summary: string;
  profile_positioning: string;
  bio_suggestions: string;
  content_strategy: string;
  recommended_formats: string[];
  content_ideas: ContentIdea[];
  seven_day_plan: DayPlan[];
  performance_metrics: Metric[];
  next_steps: string;
  
  // Metadata
  status: 'draft' | 'review' | 'approved' | 'delivered';
  generated_by: 'manual' | 'ai_assisted' | 'ai_api' | null;
  admin_notes: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  delivered_at: string | null;
}

export interface ContentIdea {
  title: string;
  type: string;
  description: string;
  engagement_level: 'low' | 'medium' | 'high';
}

export interface DayPlan {
  day: number;
  task: string;
  description: string;
}

export interface Metric {
  name: string;
  description: string;
  target: string;
}

// ─── CONTENT PACKS ────────────────────────────────────────────────────────────

export interface ContentPack {
  id: string;
  order_id: string | null;
  
  // Input data
  platform: string;
  niche: string;
  target_audience: string;
  brand_voice: string;
  content_goals: string;
  customer_notes: string;
  
  // Generated content
  content_ideas: ContentIdea[];
  caption_drafts: CaptionDraft[];
  video_hooks: VideoHook[];
  calls_to_action: string[];
  suggested_formats: string[];
  publishing_calendar: CalendarDay[];
  platform_adaptations: Record<string, any>;
  
  // Metadata
  status: 'draft' | 'review' | 'approved' | 'delivered';
  generated_by: 'manual' | 'ai_assisted' | 'ai_api' | null;
  admin_notes: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  delivered_at: string | null;
}

export interface CaptionDraft {
  id: number;
  content_idea_id?: number;
  caption: string;
  hashtags: string[];
}

export interface VideoHook {
  id: number;
  hook: string;
  description: string;
  duration: string;
}

export interface CalendarDay {
  day: number;
  date?: string;
  content_idea_id?: number;
  content_type: string;
  topic: string;
  posting_time?: string;
  notes?: string;
}

// ─── GROWTH PARTNER ───────────────────────────────────────────────────────────

export interface GrowthPartnerClient {
  id: string;
  order_id: string | null;
  
  // Client info
  client_name: string;
  client_email: string;
  platform: string;
  niche: string;
  
  // Service details
  start_date: string;
  end_date: string | null;
  agreed_deliverables: Record<string, any>;
  monthly_fee_eur: number;
  monthly_fee_mad: number;
  
  // Status
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  
  // Notes
  client_notes: string;
  admin_notes: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface GrowthPartnerDeliverable {
  id: string;
  client_id: string;
  
  // Service period
  service_month: string;
  
  // Deliverables
  content_calendar: CalendarDay[];
  content_drafts: CaptionDraft[];
  promotional_concepts: PromotionalConcept[];
  
  // Status tracking
  calendar_status: 'draft' | 'sent' | 'approved';
  drafts_status: 'draft' | 'sent' | 'approved';
  
  // Reviews
  monthly_review_notes: string;
  review_date: string | null;
  
  // Delivery
  delivery_status: 'pending' | 'in_progress' | 'delivered';
  delivered_at: string | null;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface PromotionalConcept {
  id: number;
  title: string;
  description: string;
  platform: string;
  expected_impact: 'low' | 'medium' | 'high';
}

// ─── PROMPT TEMPLATES ─────────────────────────────────────────────────────────

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: 'audit' | 'content_pack' | 'growth_partner';
  template_text: string;
  variables: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ─── HELPER TYPES ─────────────────────────────────────────────────────────────

export type ReportStatus = 'draft' | 'review' | 'approved' | 'delivered';
export type ClientStatus = 'active' | 'paused' | 'completed' | 'cancelled';
export type DeliveryStatus = 'pending' | 'in_progress' | 'delivered';

export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  draft: 'Draft',
  review: 'In Review',
  approved: 'Approved',
  delivered: 'Delivered',
};

export const REPORT_STATUS_COLORS: Record<ReportStatus, string> = {
  draft: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
  review: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  approved: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  delivered: 'bg-green-500/10 text-green-300 border-green-500/20',
};

export const CLIENT_STATUS_LABELS: Record<ClientStatus, string> = {
  active: 'Active',
  paused: 'Paused',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const CLIENT_STATUS_COLORS: Record<ClientStatus, string> = {
  active: 'bg-green-500/10 text-green-300 border-green-500/20',
  paused: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  completed: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  cancelled: 'bg-red-500/10 text-red-300 border-red-500/20',
};
