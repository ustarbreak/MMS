import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validateOrder } from '../lib/orderService';

// Mock Supabase
vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({
            data: { id: 'test-product-id', is_active: true },
            error: null,
          })),
        })),
      })),
    })),
    auth: {
      getUser: vi.fn(() => Promise.resolve({ data: { user: null } })),
    },
  },
}));

describe('Order Validation', () => {
  describe('validateOrder', () => {
    it('should reject empty name', async () => {
      const result = await validateOrder({
        customer_name: '',
        customer_email: 'test@example.com',
        customer_country: 'France',
        product_id: 'test-product-id',
        currency: 'EUR',
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Name must be at least 2 characters');
    });

    it('should reject name too short', async () => {
      const result = await validateOrder({
        customer_name: 'A',
        customer_email: 'test@example.com',
        customer_country: 'France',
        product_id: 'test-product-id',
        currency: 'EUR',
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Name must be at least 2 characters');
    });

    it('should reject name too long', async () => {
      const result = await validateOrder({
        customer_name: 'A'.repeat(101),
        customer_email: 'test@example.com',
        customer_country: 'France',
        product_id: 'test-product-id',
        currency: 'EUR',
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Name must be less than 100 characters');
    });

    it('should reject invalid email', async () => {
      const result = await validateOrder({
        customer_name: 'Test User',
        customer_email: 'not-an-email',
        customer_country: 'France',
        product_id: 'test-product-id',
        currency: 'EUR',
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Please enter a valid email address');
    });

    it('should reject empty email', async () => {
      const result = await validateOrder({
        customer_name: 'Test User',
        customer_email: '',
        customer_country: 'France',
        product_id: 'test-product-id',
        currency: 'EUR',
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Email is required');
    });

    it('should reject empty country', async () => {
      const result = await validateOrder({
        customer_name: 'Test User',
        customer_email: 'test@example.com',
        customer_country: '',
        product_id: 'test-product-id',
        currency: 'EUR',
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Country is required');
    });

    it('should reject empty product_id', async () => {
      const result = await validateOrder({
        customer_name: 'Test User',
        customer_email: 'test@example.com',
        customer_country: 'France',
        product_id: '',
        currency: 'EUR',
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Product selection is required');
    });

    it('should reject invalid currency', async () => {
      const result = await validateOrder({
        customer_name: 'Test User',
        customer_email: 'test@example.com',
        customer_country: 'France',
        product_id: 'test-product-id',
        currency: 'USD' as any,
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid currency');
    });

    it('should accept valid order', async () => {
      const result = await validateOrder({
        customer_name: 'Test User',
        customer_email: 'test@example.com',
        customer_country: 'France',
        product_id: 'test-product-id',
        currency: 'EUR',
      });
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should accept MAD currency', async () => {
      const result = await validateOrder({
        customer_name: 'Test User',
        customer_email: 'test@example.com',
        customer_country: 'France',
        product_id: 'test-product-id',
        currency: 'MAD',
      });
      expect(result.valid).toBe(true);
    });
  });
});
