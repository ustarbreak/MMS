/**
 * Order Service
 *
 * Handles order creation, validation, and management.
 * All validation happens here before data reaches the database.
 */

import { supabase, Order, OrderStatus, Product } from './supabase';

// ─── VALIDATION ───────────────────────────────────────────────────────────────

export interface OrderInput {
  customer_name: string;
  customer_email: string;
  customer_country: string;
  product_id: string;
  currency: 'EUR' | 'MAD';
  requirements?: Record<string, any>;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize string input to prevent XSS
 */
function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML brackets
    .slice(0, 1000); // Limit length
}

/**
 * Validate order input
 */
export async function validateOrder(input: OrderInput): Promise<ValidationResult> {
  const errors: string[] = [];

  // Validate name
  if (!input.customer_name || input.customer_name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (input.customer_name && input.customer_name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  // Validate email
  if (!input.customer_email) {
    errors.push('Email is required');
  } else if (!isValidEmail(input.customer_email)) {
    errors.push('Please enter a valid email address');
  }
  if (input.customer_email && input.customer_email.length > 255) {
    errors.push('Email must be less than 255 characters');
  }

  // Validate country
  if (!input.customer_country || input.customer_country.trim().length < 2) {
    errors.push('Country is required');
  }
  if (input.customer_country && input.customer_country.length > 100) {
    errors.push('Country must be less than 100 characters');
  }

  // Validate product exists
  if (!input.product_id) {
    errors.push('Product selection is required');
  } else {
    const { data: product, error } = await supabase
      .from('products')
      .select('id, is_active')
      .eq('id', input.product_id)
      .single();

    if (error || !product) {
      errors.push('Selected product not found');
    } else if (!product.is_active) {
      errors.push('This product is no longer available');
    }
  }

  // Validate currency
  if (!['EUR', 'MAD'].includes(input.currency)) {
    errors.push('Invalid currency');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ─── ORDER CREATION ───────────────────────────────────────────────────────────

/**
 * Generate cryptographically secure random token
 * Uses Web Crypto API for true randomness (not Math.random)
 */
function generateSecureToken(): string {
  const array = new Uint8Array(32); // 256 bits of randomness
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate unique order reference
 * Uses cryptographically secure random for better security
 */
function generateOrderReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const array = new Uint8Array(8);
  crypto.getRandomValues(array);
  let result = 'MM-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(array[i] % chars.length);
  }
  return result;
}

/**
 * Check if order reference already exists
 */
async function isReferenceUnique(reference: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('orders')
    .select('id')
    .eq('order_reference', reference)
    .single();

  return !!(error && error.code === 'PGRST116'); // PGRST116 = no rows returned
}

/**
 * Create a new order
 */
export async function createOrder(input: OrderInput): Promise<{
  success: boolean;
  order?: Order;
  error?: string;
}> {
  try {
    // Validate input
    const validation = await validateOrder(input);
    if (!validation.valid) {
      return { success: false, error: validation.errors.join(', ') };
    }

    // Get product details
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', input.product_id)
      .single();

    if (productError || !product) {
      return { success: false, error: 'Product not found' };
    }

    // Generate unique order reference
    let orderReference = generateOrderReference();
    let attempts = 0;
    while (!(await isReferenceUnique(orderReference)) && attempts < 10) {
      orderReference = generateOrderReference();
      attempts++;
    }

    if (attempts >= 10) {
      return { success: false, error: 'Could not generate unique order reference. Please try again.' };
    }

    // Sanitize inputs
    const sanitizedInput = {
      customer_name: sanitizeString(input.customer_name),
      customer_email: sanitizeString(input.customer_email).toLowerCase(),
      customer_country: sanitizeString(input.customer_country),
      requirements: input.requirements || {},
    };

    // Check for duplicate orders (same email + product within last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('id')
      .eq('customer_email', sanitizedInput.customer_email)
      .eq('product_id', input.product_id)
      .gte('created_at', oneHourAgo)
      .limit(1);

    if (existingOrder && existingOrder.length > 0) {
      return {
        success: false,
        error: 'A recent order for this product already exists. Please check your email for confirmation or contact support.',
      };
    }

    // Generate verification token for secure customer access
    const verificationToken = generateSecureToken();
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_reference: orderReference,
        customer_name: sanitizedInput.customer_name,
        customer_email: sanitizedInput.customer_email,
        customer_country: sanitizedInput.customer_country,
        product_id: product.id,
        product_name: product.name,
        price_eur: product.price_eur,
        price_mad: product.price_mad,
        currency: input.currency,
        requirements: sanitizedInput.requirements,
        status: 'pending_payment',
        verification_token: verificationToken,
        verification_token_expires_at: tokenExpiresAt,
        verification_token_used: false,
      })
      .select()
      .single();

    if (orderError) {
      return { success: false, error: 'Failed to create order. Please try again.' };
    }

    // Log initial status
    await supabase.from('order_status_history').insert({
      order_id: order.id,
      old_status: null,
      new_status: 'pending_payment',
      notes: 'Order created',
    });

    // Return order with verification token for customer
    return { 
      success: true, 
      order: {
        ...order,
        verification_token: verificationToken, // Include token for customer
      }
    };
  } catch (error) {
    console.error('Unexpected error creating order:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}

// ─── ORDER QUERIES ────────────────────────────────────────────────────────────

/**
 * Get order by reference with verification token (for customer viewing)
 * SECURITY: Requires cryptographic verification token to prevent unauthorized access
 */
export async function getOrderByReference(
  reference: string, 
  verificationToken?: string
): Promise<{
  order?: Order;
  error?: string;
}> {
  // First, check if user is authenticated as admin
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data: adminProfile } = await supabase
      .from('admin_profiles')
      .select('id')
      .eq('id', user.id)
      .eq('is_active', true)
      .single();

    if (adminProfile) {
      // Admin can view any order without token
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_reference', reference)
        .single();

      if (error) {
        return { error: 'Order not found' };
      }

      return { order: data };
    }
  }

  // Customer access requires verification token
  if (!verificationToken) {
    return { error: 'Verification token required' };
  }

  // Query for order matching both reference AND token
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('order_reference', reference)
    .eq('verification_token', verificationToken)
    .single();

  if (error || !order) {
    return { error: 'Invalid order reference or verification token' };
  }

  // Check if token has expired
  if (order.verification_token_expires_at) {
    const expiresAt = new Date(order.verification_token_expires_at);
    if (expiresAt < new Date()) {
      return { error: 'Verification token has expired. Please contact support.' };
    }
  }

  // Check if token has already been used (single-use)
  if (order.verification_token_used) {
    return { error: 'Verification token has already been used. Please contact support.' };
  }

  // Mark token as used (single-use enforcement)
  await supabase
    .from('orders')
    .update({ verification_token_used: true })
    .eq('id', order.id);

  return { order };
}

/**
 * Get order status for client portal (public access, limited info)
 * Returns only status and basic order info, no sensitive customer data
 */
export async function getOrderStatusForClient(reference: string): Promise<{
  order?: {
    order_reference: string;
    product_name: string;
    status: OrderStatus;
    created_at: string;
    payment_confirmed_at: string | null;
    delivered_at: string | null;
    price_eur: number;
    price_mad: number;
    currency: string;
  };
  error?: string;
}> {
  // Query for order with limited fields (no customer PII)
  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      order_reference,
      product_name,
      status,
      created_at,
      payment_confirmed_at,
      delivered_at,
      price_eur,
      price_mad,
      currency
    `)
    .eq('order_reference', reference)
    .single();

  if (error || !order) {
    return { error: 'Order not found' };
  }

  return { order };
}

/**
 * Get all orders (admin only)
 */
export async function getAllOrders(filters?: {
  status?: OrderStatus;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<{ orders?: Order[]; count?: number; error?: string }> {
  let query = supabase
    .from('orders')
    .select('*', { count: 'exact' });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  if (filters?.search) {
    const searchTerm = `%${filters.search}%`;
    query = query.or(
      `customer_name.ilike.${searchTerm},customer_email.ilike.${searchTerm},order_reference.ilike.${searchTerm}`
    );
  }

  query = query.order('created_at', { ascending: false });

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    return { error: 'Failed to fetch orders' };
  }

  return { orders: data, count: count ?? undefined };
}

/**
 * Get order by ID (admin only)
 */
export async function getOrderById(id: string): Promise<{
  order?: Order;
  error?: string;
}> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return { error: 'Order not found' };
  }

  return { order: data };
}

// ─── ORDER UPDATES (ADMIN) ────────────────────────────────────────────────────

/**
 * Update order status (admin only)
 */
export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get current order
    const { data: currentOrder, error: fetchError } = await supabase
      .from('orders')
      .select('status')
      .eq('id', orderId)
      .single();

    if (fetchError || !currentOrder) {
      return { success: false, error: 'Order not found' };
    }

    // Validate status transition
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      pending_payment: ['paid', 'cancelled'],
      paid: ['in_progress', 'refunded', 'cancelled'],
      in_progress: ['delivered', 'cancelled'],
      delivered: ['refunded'],
      cancelled: [],
      refunded: [],
    };

    const currentStatus = currentOrder.status as OrderStatus;
    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      return {
        success: false,
        error: `Cannot change status from ${currentStatus} to ${newStatus}`,
      };
    }

    // Prepare update data
    const updateData: any = { status: newStatus };

    if (newStatus === 'paid') {
      updateData.payment_confirmed_at = new Date().toISOString();
      if (notes) updateData.payment_notes = notes;
    }

    if (newStatus === 'delivered') {
      updateData.delivered_at = new Date().toISOString();
      if (notes) updateData.delivery_notes = notes;
    }

    if (notes && !['paid', 'delivered'].includes(newStatus)) {
      updateData.internal_notes = notes;
    }

    // Update order
    const { error: updateError } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', orderId);

    if (updateError) {
      console.error('Status update error:', updateError);
      return { success: false, error: 'Failed to update order status' };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error updating status:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Update order internal notes (admin only)
 */
export async function updateOrderNotes(
  orderId: string,
  notes: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('orders')
    .update({ internal_notes: sanitizeString(notes) })
    .eq('id', orderId);

  if (error) {
    return { success: false, error: 'Failed to update notes' };
  }

  return { success: true };
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

/**
 * Get all active products
 */
export async function getProducts(): Promise<{
  products?: Product[];
  error?: string;
}> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  if (error) {
    return { error: 'Failed to fetch products' };
  }

  return { products: data };
}

/**
 * Get product by slug
 */
export async function getProductBySlug(slug: string): Promise<{
  product?: Product;
  error?: string;
}> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    return { error: 'Product not found' };
  }

  return { product: data };
}

/**
 * Update product (admin only)
 */
export async function updateProduct(
  productId: string,
  updates: Partial<Pick<Product, 'price_eur' | 'price_mad' | 'is_active'>>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', productId);

  if (error) {
    return { success: false, error: 'Failed to update product' };
  }

  return { success: true };
}

// ─── ANALYTICS ────────────────────────────────────────────────────────────────

/**
 * Get order statistics (admin only)
 */
export async function getOrderStats(): Promise<{
  stats?: {
    total_orders: number;
    pending_payment: number;
    paid: number;
    in_progress: number;
    delivered: number;
    cancelled: number;
    refunded: number;
    total_revenue_eur: number;
    total_revenue_mad: number;
  };
  error?: string;
}> {
  const { data, error } = await supabase
    .from('orders')
    .select('status, price_eur, price_mad, currency');

  if (error) {
    return { error: 'Failed to fetch statistics' };
  }

  const stats = {
    total_orders: data.length,
    pending_payment: data.filter(o => o.status === 'pending_payment').length,
    paid: data.filter(o => o.status === 'paid').length,
    in_progress: data.filter(o => o.status === 'in_progress').length,
    delivered: data.filter(o => o.status === 'delivered').length,
    cancelled: data.filter(o => o.status === 'cancelled').length,
    refunded: data.filter(o => o.status === 'refunded').length,
    total_revenue_eur: data
      .filter(o => o.status === 'paid' || o.status === 'in_progress' || o.status === 'delivered')
      .reduce((sum, o) => sum + (o.currency === 'EUR' ? o.price_eur : o.price_eur), 0),
    total_revenue_mad: data
      .filter(o => o.status === 'paid' || o.status === 'in_progress' || o.status === 'delivered')
      .reduce((sum, o) => sum + (o.currency === 'MAD' ? o.price_mad : o.price_mad), 0),
  };

  return { stats };
}
