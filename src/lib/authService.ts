/**
 * Authentication Service
 *
 * Handles admin authentication using Supabase Auth.
 */

import { supabase, AdminProfile } from './supabase';

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
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: 'Authentication failed' };
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
      return { success: false, error: 'You do not have admin access' };
    }

    // Update last login
    await supabase
      .from('admin_profiles')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', data.user.id);

    return { success: true };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Sign out admin user
 */
export async function signOut(): Promise<void> {
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
    console.error('Get current admin error:', error);
    return { error: 'Failed to get admin profile' };
  }
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
