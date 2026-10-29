-- Migration: Add verification tokens to orders table
-- Run this if you already have the orders table created
-- This adds secure verification tokens for customer order access

-- Add verification token columns
ALTER TABLE orders ADD COLUMN IF NOT EXISTS verification_token TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS verification_token_expires_at TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS verification_token_used BOOLEAN DEFAULT false;

-- Add index for token lookups
CREATE INDEX IF NOT EXISTS idx_orders_verification_token ON orders(verification_token);

-- Note: Existing orders will have NULL verification tokens.
-- Customers who placed orders before this migration will need to contact
-- support to access their order details, or you can generate tokens for them:
--
-- UPDATE orders 
-- SET verification_token = encode(gen_random_bytes(32), 'hex'),
--     verification_token_expires_at = NOW() + INTERVAL '24 hours'
-- WHERE verification_token IS NULL;
