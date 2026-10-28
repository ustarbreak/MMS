import { describe, it, expect } from 'vitest';
import { validateContactForm } from '../lib/contactService';

describe('Contact Form Validation', () => {
  describe('validateContactForm', () => {
    it('should reject empty name', () => {
      const errors = validateContactForm({
        name: '',
        email: 'test@example.com',
        subject: 'Test',
        message: 'This is a test message with enough characters.',
      });
      expect(errors).toContain('Name must be at least 2 characters');
    });

    it('should reject name too short', () => {
      const errors = validateContactForm({
        name: 'A',
        email: 'test@example.com',
        subject: 'Test',
        message: 'This is a test message with enough characters.',
      });
      expect(errors).toContain('Name must be at least 2 characters');
    });

    it('should reject name too long', () => {
      const errors = validateContactForm({
        name: 'A'.repeat(101),
        email: 'test@example.com',
        subject: 'Test',
        message: 'This is a test message with enough characters.',
      });
      expect(errors).toContain('Name must be less than 100 characters');
    });

    it('should reject invalid email', () => {
      const errors = validateContactForm({
        name: 'Test User',
        email: 'not-an-email',
        subject: 'Test',
        message: 'This is a test message with enough characters.',
      });
      expect(errors).toContain('Please enter a valid email address');
    });

    it('should reject empty email', () => {
      const errors = validateContactForm({
        name: 'Test User',
        email: '',
        subject: 'Test',
        message: 'This is a test message with enough characters.',
      });
      expect(errors).toContain('Email is required');
    });

    it('should reject empty subject', () => {
      const errors = validateContactForm({
        name: 'Test User',
        email: 'test@example.com',
        subject: '',
        message: 'This is a test message with enough characters.',
      });
      expect(errors).toContain('Subject is required');
    });

    it('should reject message too short', () => {
      const errors = validateContactForm({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test',
        message: 'Short',
      });
      expect(errors).toContain('Message must be at least 10 characters');
    });

    it('should reject message too long', () => {
      const errors = validateContactForm({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test',
        message: 'A'.repeat(5001),
      });
      expect(errors).toContain('Message must be less than 5000 characters');
    });

    it('should accept valid form', () => {
      const errors = validateContactForm({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test',
        message: 'This is a test message with enough characters.',
      });
      expect(errors).toHaveLength(0);
    });

    it('should collect multiple errors', () => {
      const errors = validateContactForm({
        name: '',
        email: 'invalid',
        subject: '',
        message: '',
      });
      expect(errors.length).toBeGreaterThan(1);
    });
  });
});
