import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Supabase before importing orderService
const mockSupabase = {
  from: vi.fn(),
  auth: {
    getUser: vi.fn(),
  },
};

vi.mock('../lib/supabase', () => ({
  supabase: mockSupabase,
}));

// Import after mocking
const { getOrderByReference } = await import('../lib/orderService');

describe('Order Authorization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default: no authenticated user
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } });
  });

  describe('getOrderByReference', () => {
    it('should deny access without verification token', async () => {
      const result = await getOrderByReference('MM-ABC12345');
      expect(result.error).toBe('Verification token required');
      expect(result.order).toBeUndefined();
    });

    it('should deny access with invalid verification token', async () => {
      // Mock: no order found with this token
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

      const result = await getOrderByReference('MM-ABC12345', 'invalid-token');
      expect(result.error).toBe('Invalid order reference or verification token');
      expect(result.order).toBeUndefined();
    });

    it('should deny access with expired verification token', async () => {
      const expiredDate = new Date(Date.now() - 1000 * 60 * 60).toISOString(); // 1 hour ago
      
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: {
                  id: 'order-id',
                  order_reference: 'MM-ABC12345',
                  verification_token: 'valid-token',
                  verification_token_expires_at: expiredDate,
                  verification_token_used: false,
                },
                error: null,
              }),
            }),
          }),
        }),
      });

      const result = await getOrderByReference('MM-ABC12345', 'valid-token');
      expect(result.error).toBe('Verification token has expired. Please contact support.');
      expect(result.order).toBeUndefined();
    });

    it('should deny access with already-used verification token', async () => {
      const futureDate = new Date(Date.now() + 1000 * 60 * 60).toISOString(); // 1 hour from now
      
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: {
                  id: 'order-id',
                  order_reference: 'MM-ABC12345',
                  verification_token: 'valid-token',
                  verification_token_expires_at: futureDate,
                  verification_token_used: true,
                },
                error: null,
              }),
            }),
          }),
        }),
      });

      const result = await getOrderByReference('MM-ABC12345', 'valid-token');
      expect(result.error).toBe('Verification token has already been used. Please contact support.');
      expect(result.order).toBeUndefined();
    });

    it('should allow access with valid verification token', async () => {
      const futureDate = new Date(Date.now() + 1000 * 60 * 60).toISOString();
      
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: {
                  id: 'order-id',
                  order_reference: 'MM-ABC12345',
                  customer_name: 'Test User',
                  customer_email: 'test@example.com',
                  verification_token: 'valid-token',
                  verification_token_expires_at: futureDate,
                  verification_token_used: false,
                },
                error: null,
              }),
            }),
          }),
        }),
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({}),
        }),
      });

      const result = await getOrderByReference('MM-ABC12345', 'valid-token');
      expect(result.error).toBeUndefined();
      expect(result.order).toBeDefined();
      expect(result.order?.order_reference).toBe('MM-ABC12345');
    });

    it('should allow admin access without verification token', async () => {
      // Mock authenticated admin user
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'admin-user-id' } },
      });

      // Mock admin profile check
      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'admin_profiles') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                  single: vi.fn().mockResolvedValue({
                    data: { id: 'admin-user-id' },
                    error: null,
                  }),
                }),
              }),
            }),
          };
        }
        // orders table
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: {
                  id: 'order-id',
                  order_reference: 'MM-ABC12345',
                  customer_name: 'Test User',
                },
                error: null,
              }),
            }),
          }),
        };
      });

      const result = await getOrderByReference('MM-ABC12345');
      expect(result.error).toBeUndefined();
      expect(result.order).toBeDefined();
    });

    it('should deny admin access if not authenticated as admin', async () => {
      // Mock authenticated user but NOT an admin
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'regular-user-id' } },
      });

      // Mock admin profile check - no admin profile found
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

      const result = await getOrderByReference('MM-ABC12345');
      expect(result.error).toBe('Verification token required');
      expect(result.order).toBeUndefined();
    });
  });
});
