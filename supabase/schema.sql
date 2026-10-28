-- MediasMakers Order Management System
-- Supabase Database Schema
-- 
-- SETUP INSTRUCTIONS:
-- 1. Create a Supabase project at https://supabase.com (free tier)
-- 2. Go to SQL Editor in your Supabase dashboard
-- 3. Copy and paste this entire file
-- 4. Run the SQL to create all tables and policies
--
-- This schema includes:
-- - Orders table with status tracking
-- - Order status history for audit trail
-- - Products table for price management
-- - Admin profiles
-- - Row Level Security (RLS) policies for data protection

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── PRODUCTS TABLE ───────────────────────────────────────────────────────────
-- Stores product information and pricing
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price_eur DECIMAL(10,2) NOT NULL,
  price_mad DECIMAL(10,2) NOT NULL,
  period TEXT NOT NULL DEFAULT 'one-time',
  features JSONB DEFAULT '[]'::jsonb,
  deliverables JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ORDERS TABLE ─────────────────────────────────────────────────────────────
-- Stores customer orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_reference TEXT UNIQUE NOT NULL,
  
  -- Customer information
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_country TEXT NOT NULL,
  
  -- Order details
  product_id UUID NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  price_eur DECIMAL(10,2) NOT NULL,
  price_mad DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  
  -- Order requirements (flexible JSON field for product-specific data)
  requirements JSONB DEFAULT '{}'::jsonb,
  
  -- Status and tracking
  status TEXT NOT NULL DEFAULT 'pending_payment' CHECK (status IN (
    'pending_payment',
    'paid',
    'in_progress',
    'delivered',
    'cancelled',
    'refunded'
  )),
  
  -- Payment tracking (manual confirmation)
  payment_confirmed_at TIMESTAMPTZ,
  payment_notes TEXT,
  
  -- Delivery tracking
  delivered_at TIMESTAMPTZ,
  delivery_notes TEXT,
  
  -- Internal notes (admin only)
  internal_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ORDER STATUS HISTORY ─────────────────────────────────────────────────────
-- Tracks all status changes for audit trail
CREATE TABLE IF NOT EXISTS order_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ADMIN PROFILES ───────────────────────────────────────────────────────────
-- Links Supabase auth users to admin roles
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

-- ─── INDEXES ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON orders(product_id);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON order_status_history(order_id);
CREATE INDEX IF NOT EXISTS idx_order_status_history_created_at ON order_status_history(created_at DESC);

-- ─── FUNCTIONS ────────────────────────────────────────────────────────────────

-- Function to generate unique order reference
CREATE OR REPLACE FUNCTION generate_order_reference()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result TEXT := 'MM-';
  i INTEGER;
BEGIN
  -- Generate 8 random characters
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to log status changes
CREATE OR REPLACE FUNCTION log_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO order_status_history (order_id, old_status, new_status, notes)
    VALUES (NEW.id, OLD.status, NEW.status, NEW.internal_notes);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_status_change
  AFTER UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION log_order_status_change();

-- ─── ROW LEVEL SECURITY (RLS) ─────────────────────────────────────────────────

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Products: Public read, admin write
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Products can be managed by admins"
  ON products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.is_active = true
    )
  );

-- Orders: Customers can create and view their own, admins can manage all
CREATE POLICY "Customers can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Customers can view their own orders"
  ON orders FOR SELECT
  USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.is_active = true
    )
  );

CREATE POLICY "Admins can update all orders"
  ON orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.is_active = true
    )
  );

-- Order status history: Admins only
CREATE POLICY "Admins can view status history"
  ON order_status_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
      AND admin_profiles.is_active = true
    )
  );

CREATE POLICY "System can insert status history"
  ON order_status_history FOR INSERT
  WITH CHECK (true);

-- Admin profiles: Admins can view all, users can view their own
CREATE POLICY "Admins can view all admin profiles"
  ON admin_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles ap
      WHERE ap.id = auth.uid()
      AND ap.is_active = true
    )
    OR id = auth.uid()
  );

CREATE POLICY "Super admins can manage admin profiles"
  ON admin_profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
      AND role = 'super_admin'
      AND is_active = true
    )
  );

-- ─── SEED DATA ────────────────────────────────────────────────────────────────
-- Insert initial products (matching your website config)

INSERT INTO products (slug, name, description, price_eur, price_mad, period, features, deliverables) VALUES
(
  'creator-audit',
  'Creator Audit',
  'A personalized report with profile improvement recommendations, content ideas, and a seven-day action plan.',
  9.00,
  99.00,
  'one-time',
  '["Complete profile analysis across your platforms","Content strategy assessment and gap identification","Audience positioning review","Engagement pattern analysis","Competitor landscape overview","Personalized improvement recommendations","Seven-day action plan with daily tasks","Content ideas tailored to your niche"]'::jsonb,
  '["PDF audit report (10–15 pages)","Seven-day action plan checklist","Content ideas list (10+ ideas)","Profile optimization checklist"]'::jsonb
),
(
  'creator-content-pack',
  'Creator Content Pack',
  'Thirty content ideas, caption drafts, short-video hooks, calls to action, and a content calendar tailored to your niche.',
  19.00,
  209.00,
  'one-time',
  '["30 unique content ideas for your niche","Caption drafts ready to adapt and publish","Short-video hooks (Reels, TikTok, Shorts)","Strategic calls to action for each post","Full 30-day content calendar","Hashtag strategy document","Visual style recommendations","Platform-specific optimization tips","Posting time recommendations"]'::jsonb,
  '["Content calendar (30 days, visual format)","30 caption drafts (editable document)","Video hooks collection (15+ hooks)","Hashtag strategy document","Platform-specific posting guide"]'::jsonb
),
(
  'monthly-growth-partner',
  'Monthly Growth Partner',
  'A clearly defined monthly package of content planning, ready-to-publish copy, promotional concepts, and reporting.',
  149.00,
  1639.00,
  '/month',
  '["Dedicated content strategy and planning","Ready-to-publish copy and captions","Promotional concepts and campaign ideas","Monthly performance reports","Content calendar management","Direct communication channel","Monthly strategy review call","Priority support and fast turnaround","Ongoing optimization based on data","Competitor monitoring and insights"]'::jsonb,
  '["Monthly content calendar","Ready-to-publish captions and copy","Promotional campaign concepts","Monthly performance report","Strategy review session (recorded)","Ongoing recommendations and adjustments"]'::jsonb
);

-- ─── COMPLETION ───────────────────────────────────────────────────────────────
-- Schema created successfully!
-- 
-- NEXT STEPS:
-- 1. Create an admin user in Supabase Authentication
-- 2. Add that user to admin_profiles table with role='super_admin'
-- 3. Configure environment variables in your app
-- 4. Deploy the updated frontend and Edge Functions
