/**
 * Supabase Client Configuration
 *
 * IMPORTANT: You need to create a Supabase project and add your credentials
 * to the environment variables. See README.md for setup instructions.
 *
 * Environment variables needed:
 * - VITE_SUPABASE_URL: Your Supabase project URL
 * - VITE_SUPABASE_ANON_KEY: Your Supabase anonymous/public key
 *
 * These are SAFE to expose in frontend code because:
 * - The anon key is designed to be public
 * - Security is enforced via Row Level Security (RLS) policies
 * - The service_role key (which has full access) is NEVER exposed
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials not configured. Order management features will not work. ' +
    'See README.md for setup instructions.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Type definitions for our database tables
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price_eur: number;
  price_mad: number;
  period: string;
  features: string[];
  deliverables: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_reference: string;
  customer_name: string;
  customer_email: string;
  customer_country: string;
  product_id: string;
  product_name: string;
  price_eur: number;
  price_mad: number;
  currency: string;
  requirements: Record<string, any>;
  status: OrderStatus;
  payment_confirmed_at: string | null;
  payment_notes: string | null;
  delivered_at: string | null;
  delivery_notes: string | null;
  internal_notes: string | null;
  verification_token: string | null;
  verification_token_expires_at: string | null;
  verification_token_used: boolean;
  created_at: string;
  updated_at: string;
}

export type OrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'in_progress'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  old_status: OrderStatus | null;
  new_status: OrderStatus;
  changed_by: string | null;
  notes: string | null;
  created_at: string;
}

export interface AdminProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'super_admin';
  is_active: boolean;
  created_at: string;
  last_login_at: string | null;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending_payment: 'Pending Payment',
  paid: 'Paid',
  in_progress: 'In Progress',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending_payment: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  paid: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  in_progress: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  delivered: 'bg-green-500/10 text-green-300 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-300 border-red-500/20',
  refunded: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
};
