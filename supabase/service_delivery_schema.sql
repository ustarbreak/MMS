-- MediasMakers Service Delivery System
-- Extension to existing schema
--
-- This adds tables for:
-- - Creator Audit reports
-- - Creator Content Packs
-- - Monthly Growth Partner clients and deliverables
-- - Prompt templates for AI-assisted generation

-- ─── AUDIT REPORTS ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  
  -- Input data
  platform TEXT NOT NULL,
  niche TEXT NOT NULL,
  target_audience TEXT,
  main_objective TEXT,
  profile_url TEXT,
  profile_data JSONB DEFAULT '{}'::jsonb,
  customer_notes TEXT,
  
  -- Generated report sections
  executive_summary TEXT,
  profile_positioning TEXT,
  bio_suggestions TEXT,
  content_strategy TEXT,
  recommended_formats JSONB DEFAULT '[]'::jsonb,
  content_ideas JSONB DEFAULT '[]'::jsonb,
  seven_day_plan JSONB DEFAULT '[]'::jsonb,
  performance_metrics JSONB DEFAULT '[]'::jsonb,
  next_steps TEXT,
  
  -- Metadata
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'delivered')),
  generated_by TEXT, -- 'manual', 'ai_assisted', 'ai_api'
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  delivered_at TIMESTAMPTZ
);

-- ─── CONTENT PACKS ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS content_packs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  
  -- Input data
  platform TEXT NOT NULL,
  niche TEXT NOT NULL,
  target_audience TEXT,
  brand_voice TEXT,
  content_goals TEXT,
  customer_notes TEXT,
  
  -- Generated content
  content_ideas JSONB DEFAULT '[]'::jsonb, -- Array of 30 ideas
  caption_drafts JSONB DEFAULT '[]'::jsonb,
  video_hooks JSONB DEFAULT '[]'::jsonb,
  calls_to_action JSONB DEFAULT '[]'::jsonb,
  suggested_formats JSONB DEFAULT '[]'::jsonb,
  publishing_calendar JSONB DEFAULT '[]'::jsonb, -- 30-day calendar
  platform_adaptations JSONB DEFAULT '{}'::jsonb,
  
  -- Metadata
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'delivered')),
  generated_by TEXT,
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  delivered_at TIMESTAMPTZ
);

-- ─── GROWTH PARTNER CLIENTS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS growth_partner_clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  
  -- Client info
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  platform TEXT NOT NULL,
  niche TEXT NOT NULL,
  
  -- Service details
  start_date DATE NOT NULL,
  end_date DATE,
  agreed_deliverables JSONB DEFAULT '{}'::jsonb,
  monthly_fee_eur DECIMAL(10,2),
  monthly_fee_mad DECIMAL(10,2),
  
  -- Status
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'cancelled')),
  
  -- Notes
  client_notes TEXT,
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── GROWTH PARTNER DELIVERABLES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS growth_partner_deliverables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES growth_partner_clients(id) ON DELETE CASCADE,
  
  -- Service period
  service_month DATE NOT NULL, -- First day of the month
  
  -- Deliverables
  content_calendar JSONB DEFAULT '[]'::jsonb,
  content_drafts JSONB DEFAULT '[]'::jsonb,
  promotional_concepts JSONB DEFAULT '[]'::jsonb,
  
  -- Status tracking
  calendar_status TEXT DEFAULT 'draft' CHECK (calendar_status IN ('draft', 'sent', 'approved')),
  drafts_status TEXT DEFAULT 'draft' CHECK (drafts_status IN ('draft', 'sent', 'approved')),
  
  -- Reviews
  monthly_review_notes TEXT,
  review_date DATE,
  
  -- Delivery
  delivery_status TEXT DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'in_progress', 'delivered')),
  delivered_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── PROMPT TEMPLATES ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS prompt_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Template info
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('audit', 'content_pack', 'growth_partner')),
  
  -- Template content
  template_text TEXT NOT NULL,
  variables JSONB DEFAULT '[]'::jsonb, -- List of variable names used in template
  
  -- Metadata
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── INDEXES ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_audit_reports_order_id ON audit_reports(order_id);
CREATE INDEX IF NOT EXISTS idx_audit_reports_status ON audit_reports(status);
CREATE INDEX IF NOT EXISTS idx_content_packs_order_id ON content_packs(order_id);
CREATE INDEX IF NOT EXISTS idx_content_packs_status ON content_packs(status);
CREATE INDEX IF NOT EXISTS idx_growth_partner_clients_order_id ON growth_partner_clients(order_id);
CREATE INDEX IF NOT EXISTS idx_growth_partner_clients_status ON growth_partner_clients(status);
CREATE INDEX IF NOT EXISTS idx_growth_partner_deliverables_client_id ON growth_partner_deliverables(client_id);
CREATE INDEX IF NOT EXISTS idx_growth_partner_deliverables_service_month ON growth_partner_deliverables(service_month);
CREATE INDEX IF NOT EXISTS idx_prompt_templates_category ON prompt_templates(category);

-- ─── TRIGGERS ─────────────────────────────────────────────────────────────────
CREATE TRIGGER update_audit_reports_updated_at
  BEFORE UPDATE ON audit_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_packs_updated_at
  BEFORE UPDATE ON content_packs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_growth_partner_clients_updated_at
  BEFORE UPDATE ON growth_partner_clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_growth_partner_deliverables_updated_at
  BEFORE UPDATE ON growth_partner_deliverables
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prompt_templates_updated_at
  BEFORE UPDATE ON prompt_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────
ALTER TABLE audit_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_partner_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_partner_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_templates ENABLE ROW LEVEL SECURITY;

-- Admin-only access for all service delivery tables
CREATE POLICY "Admins can manage audit reports"
  ON audit_reports FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.is_active = true
    )
  );

CREATE POLICY "Admins can manage content packs"
  ON content_packs FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.is_active = true
    )
  );

CREATE POLICY "Admins can manage growth partner clients"
  ON growth_partner_clients FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.is_active = true
    )
  );

CREATE POLICY "Admins can manage growth partner deliverables"
  ON growth_partner_deliverables FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.is_active = true
    )
  );

CREATE POLICY "Admins can manage prompt templates"
  ON prompt_templates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.is_active = true
    )
  );

-- ─── SEED DATA: PROMPT TEMPLATES ──────────────────────────────────────────────
INSERT INTO prompt_templates (name, description, category, template_text, variables) VALUES
(
  'Creator Audit - Executive Summary',
  'Generate executive summary for creator audit',
  'audit',
  'Create a professional executive summary for a social media audit of a {{niche}} creator on {{platform}}. Their main objective is {{main_objective}} and they target {{target_audience}}. Based on the profile data provided, summarize their current position, key strengths, main opportunities, and priority areas for improvement. Keep it concise (150-200 words) and actionable. Do not claim to have accessed private analytics unless explicitly provided.',
  '["niche", "platform", "main_objective", "target_audience"]'::jsonb
),
(
  'Creator Audit - Content Strategy',
  'Generate content strategy recommendations',
  'audit',
  'Develop a content strategy for a {{niche}} creator on {{platform}} targeting {{target_audience}}. Their main goal is {{main_objective}}. Recommend: 1) Content pillars (3-5 main themes), 2) Content mix (percentages for different types), 3) Posting frequency, 4) Best times to post, 5) Engagement tactics. Base recommendations on platform best practices and the creator''s niche. Clearly label these as recommendations, not guarantees.',
  '["niche", "platform", "target_audience", "main_objective"]'::jsonb
),
(
  'Content Pack - 30 Ideas',
  'Generate 30 content ideas',
  'content_pack',
  'Generate 30 unique content ideas for a {{niche}} creator on {{platform}} targeting {{target_audience}}. For each idea, provide: 1) Title/hook, 2) Content type (carousel, video, story, etc.), 3) Brief description (1-2 sentences), 4) Expected engagement level (low/medium/high). Ensure variety across content pillars and formats. Make ideas specific and actionable, not generic.',
  '["niche", "platform", "target_audience"]'::jsonb
),
(
  'Content Pack - Caption Drafts',
  'Generate caption drafts for content',
  'content_pack',
  'Write 10 caption drafts for a {{niche}} creator on {{platform}}. Brand voice: {{brand_voice}}. Each caption should: 1) Start with a hook, 2) Provide value or entertainment, 3) Include a call-to-action, 4) Use appropriate emojis, 5) Include 3-5 relevant hashtags. Vary the length and style. Make them ready to adapt and publish.',
  '["niche", "platform", "brand_voice"]'::jsonb
),
(
  'Growth Partner - Monthly Content Calendar',
  'Generate monthly content calendar',
  'growth_partner',
  'Create a 30-day content calendar for a {{niche}} creator on {{platform}} for {{month}}. Target audience: {{target_audience}}. Include for each day: 1) Content type, 2) Topic/theme, 3) Brief description, 4) Posting time. Balance educational, entertaining, and promotional content. Consider platform-specific best practices and current trends in the {{niche}} space.',
  '["niche", "platform", "month", "target_audience"]'::jsonb
);

-- ─── COMPLETION ───────────────────────────────────────────────────────────────
-- Service delivery schema created successfully!
-- 
-- NEXT STEPS:
-- 1. Run this SQL in your Supabase SQL Editor
-- 2. The admin workspace pages will use these tables
-- 3. Prompt templates are pre-loaded for common use cases
-- 4. You can add/edit templates through the admin interface
