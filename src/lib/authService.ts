/**
 * Authentication Service
 *
 * Handles admin authentication using Supabase Auth.
 */

import { supabase, AdminProfile } from './supabase';

/**
 * Check if demo mode is enabled
 */
export function isDemoMode(): boolean {
  return import.meta.env.VITE_DEMO_MODE === 'true';
}

/**
 * Sign in admin user
 */
export async function signIn(email: string, password: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Return generic error to prevent username enumeration
      // Do not expose the actual Supabase error message
      return { success: false, error: 'Invalid credentials' };
    }

    if (!data.user) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Check if user is an admin
    const { data: profile, error: profileError } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('id', data.user.id)
      .eq('is_active', true)
      .single();

    if (profileError || !profile) {
      // Sign out if not an admin
      await supabase.auth.signOut();
      // Generic error - don't reveal that the account exists but isn't admin
      return { success: false, error: 'Invalid credentials' };
    }

    // Update last login
    await supabase
      .from('admin_profiles')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', data.user.id);

    return { success: true };
  } catch (error) {
    // Do not log error details - could contain sensitive information
    return { success: false, error: 'Unable to sign in. Please try again later.' };
  }
}

/**
 * Sign out admin user
 */
export async function signOut(): Promise<void> {
  // Clear demo session if in demo mode
  if (isDemoMode()) {
    sessionStorage.removeItem('demo_admin');
  }
  
  await supabase.auth.signOut();
}

/**
 * Get current admin user
 */
export async function getCurrentAdmin(): Promise<{
  admin?: AdminProfile;
  error?: string;
}> {
  try {
    // Demo mode: return demo admin without checking Supabase
    if (isDemoMode()) {
      const demoSession = sessionStorage.getItem('demo_admin');
      if (demoSession === 'true') {
        return {
          admin: {
            id: 'demo-admin-id',
            email: 'demo@mediasmakers.com',
            full_name: 'Demo Admin',
            role: 'super_admin',
            is_active: true,
            created_at: new Date().toISOString(),
            last_login_at: new Date().toISOString(),
          },
        };
      }
      return { error: 'Not authenticated' };
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Not authenticated' };
    }

    const { data: profile, error } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('id', user.id)
      .eq('is_active', true)
      .single();

    if (error || !profile) {
      return { error: 'Admin profile not found' };
    }

    return { admin: profile };
  } catch (error) {
    // Do not log error details
    return { error: 'Failed to get admin profile' };
  }
}

/**
 * Demo sign-in (bypasses authentication)
 */
export async function demoSignIn(): Promise<{
  success: boolean;
  error?: string;
}> {
  if (!isDemoMode()) {
    return { success: false, error: 'Demo mode is not enabled' };
  }

  // Store demo session
  sessionStorage.setItem('demo_admin', 'true');
  return { success: true };
}

/**
 * Check if user is authenticated as admin
 */
export async function isAdmin(): Promise<boolean> {
  const { admin } = await getCurrentAdmin();
  return !!admin;
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(callback: (isAdmin: boolean) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
      const { admin } = await getCurrentAdmin();
      callback(!!admin);
    } else if (event === 'SIGNED_OUT') {
      callback(false);
    }
  });
}
