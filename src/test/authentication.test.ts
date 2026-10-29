import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Supabase
const mockSupabase = {
  auth: {
    signInWithPassword: vi.fn(),
    signOut: vi.fn(),
    getUser: vi.fn(),
  },
  from: vi.fn(),
};

vi.mock('../lib/supabase', () => ({
  supabase: mockSupabase,
}));

const { signIn, getCurrentAdmin, isAdmin } = await import('../lib/authService');

describe('Authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('signIn', () => {
    it('should return generic error for invalid credentials', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: null },
        error: { message: 'Invalid login credentials' },
      });

      const result = await signIn('wrong@example.com', 'wrongpassword');
      expect(result.success).toBe(false);
      // Should NOT expose the actual Supabase error message
      expect(result.error).toBe('Invalid credentials');
      expect(result.error).not.toContain('Invalid login credentials');
    });

    it('should return generic error when user is not an admin', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: { id: 'user-id' } },
        error: null,
      });

      // Mock: no admin profile found
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: null,
                error: { message: 'No rows' },
              }),
            }),
          }),
        }),
      });

      const result = await signIn('user@example.com', 'password');
      expect(result.success).toBe(false);
      // Should NOT reveal that the account exists but isn't admin
      expect(result.error).toBe('Invalid credentials');
    });

    it('should sign out when user is not an admin', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: { id: 'user-id' } },
        error: null,
      });

      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: null,
                error: { message: 'No rows' },
              }),
            }),
          }),
        }),
      });

      await signIn('user@example.com', 'password');
      expect(mockSupabase.auth.signOut).toHaveBeenCalled();
    });

    it('should succeed for valid admin', async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: { id: 'admin-id' } },
        error: null,
      });

      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { id: 'admin-id', role: 'admin' },
                error: null,
              }),
            }),
          }),
        }),
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({}),
        }),
      });

      const result = await signIn('admin@example.com', 'password');
      expect(result.success).toBe(true);
    });

    it('should return generic error on unexpected failure', async () => {
      mockSupabase.auth.signInWithPassword.mockRejectedValue(new Error('Network error'));

      const result = await signIn('admin@example.com', 'password');
      expect(result.success).toBe(false);
      // Should not expose internal error details
      expect(result.error).toBe('Unable to sign in. Please try again later.');
      expect(result.error).not.toContain('Network error');
    });
  });

  describe('getCurrentAdmin', () => {
    it('should return error when not authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null },
      });

      const result = await getCurrentAdmin();
      expect(result.error).toBe('Not authenticated');
      expect(result.admin).toBeUndefined();
    });

    it('should return error when user is not an admin', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-id' } },
      });

      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: null,
                error: { message: 'No rows' },
              }),
            }),
          }),
        }),
      });

      const result = await getCurrentAdmin();
      expect(result.error).toBe('Admin profile not found');
      expect(result.admin).toBeUndefined();
    });

    it('should return admin profile for authenticated admin', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'admin-id' } },
      });

      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { id: 'admin-id', email: 'admin@example.com', role: 'admin' },
                error: null,
              }),
            }),
          }),
        }),
      });

      const result = await getCurrentAdmin();
      expect(result.error).toBeUndefined();
      expect(result.admin).toBeDefined();
      expect(result.admin?.email).toBe('admin@example.com');
    });
  });

  describe('isAdmin', () => {
    it('should return false when not authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null },
      });

      const result = await isAdmin();
      expect(result).toBe(false);
    });

    it('should return true for authenticated admin', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'admin-id' } },
      });

      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { id: 'admin-id', role: 'admin' },
                error: null,
              }),
            }),
          }),
        }),
      });

      const result = await isAdmin();
      expect(result).toBe(true);
    });
  });
});
