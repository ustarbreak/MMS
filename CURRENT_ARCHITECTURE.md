# MediasMakers - Current Architecture Documentation

**Last Updated:** 2025
**Version:** 2.0 (Post-Security Audit)

---

## Executive Summary

MediasMakers is a social media marketing services platform built with React, TypeScript, and Supabase. The application provides three core services (Creator Audit, Content Pack, Growth Partner) with a complete order management system, client portal, and admin dashboard. The system is production-ready with comprehensive security measures, automated tests, and proper authentication/authorization.

---

## Technology Stack

### Frontend
- **Framework:** React 18.2.0 with TypeScript 5.7.0
- **Build Tool:** Vite 6.3.5
- **Styling:** Tailwind CSS 4.1.7
- **Routing:** React Router DOM 6.8.0
- **Animations:** Framer Motion 11.16.1
- **Icons:** Lucide React 0.294.0
- **Charts:** Recharts 2.10.0
- **Date Handling:** date-fns 2.30.0
- **Drag & Drop:** @dnd-kit (core, sortable, utilities)
- **Testing:** Vitest 5.0.5, @testing-library/react 16.3.3

### Backend & Database
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Real-time:** Supabase Realtime (available but not actively used)
- **Storage:** Supabase Storage (configured but not actively used)
- **Edge Functions:** Available but not implemented

### Deployment
- **Hosting:** Configured for Vercel, Netlify, and Cloudflare Pages
- **Security Headers:** Configured for all three platforms
- **SPA Routing:** Configured with rewrites/redirects
- **Environment:** Environment variables via .env files

---

## Database Schema

### Core Tables

#### 1. `products`
Stores the three service offerings with pricing in EUR and MAD.

**Fields:**
- `id` (UUID, PK)
- `slug` (TEXT, UNIQUE) - URL-friendly identifier
- `name` (TEXT) - Display name
- `description` (TEXT) - Service description
- `price_eur` (DECIMAL) - Price in Euros
- `price_mad` (DECIMAL) - Price in Moroccan Dirhams
- `period` (TEXT) - 'one-time' or '/month'
- `features` (JSONB) - Array of feature descriptions
- `deliverables` (JSONB) - Array of deliverable descriptions
- `is_active` (BOOLEAN) - Whether product is available
- `created_at`, `updated_at` (TIMESTAMPTZ)

**RLS Policies:**
- Public read access
- Admin-only write access

#### 2. `orders`
Stores customer orders with complete lifecycle tracking.

**Fields:**
- `id` (UUID, PK)
- `order_reference` (TEXT, UNIQUE) - Format: MM-XXXXXXXX (8 alphanumeric chars)
- `customer_name`, `customer_email`, `customer_country` (TEXT)
- `product_id` (UUID, FK → products)
- `product_name` (TEXT) - Denormalized for performance
- `price_eur`, `price_mad` (DECIMAL) - Snapshot at order time
- `currency` (TEXT) - 'EUR' or 'MAD'
- `requirements` (JSONB) - Flexible product-specific data
- `status` (TEXT) - Enum: pending_payment, paid, in_progress, delivered, cancelled, refunded
- `payment_confirmed_at`, `delivered_at` (TIMESTAMPTZ)
- `payment_notes`, `delivery_notes`, `internal_notes` (TEXT)
- `verification_token` (TEXT) - Cryptographic token for client access
- `verification_token_expires_at` (TIMESTAMPTZ)
- `verification_token_used` (BOOLEAN) - Single-use enforcement
- `created_at`, `updated_at` (TIMESTAMPTZ)

**RLS Policies:**
- Customers can create orders (public insert)
- Customers can view their own orders (email match via JWT)
- Admins can view and update all orders

**Indexes:**
- `idx_orders_status` - Status filtering
- `idx_orders_created_at` - Chronological queries
- `idx_orders_customer_email` - Customer lookup
- `idx_orders_product_id` - Product relationship

#### 3. `order_status_history`
Audit trail for all order status changes.

**Fields:**
- `id` (UUID, PK)
- `order_id` (UUID, FK → orders, CASCADE DELETE)
- `old_status`, `new_status` (TEXT)
- `changed_by` (UUID, FK → auth.users) - Admin who made the change
- `notes` (TEXT)
- `created_at` (TIMESTAMPTZ)

**RLS Policies:**
- Admin-only read access
- System can insert (via trigger)

**Trigger:**
- `trigger_log_status_change` - Automatically logs status changes

#### 4. `admin_profiles`
Links Supabase auth users to admin roles.

**Fields:**
- `id` (UUID, PK, FK → auth.users, CASCADE DELETE)
- `email` (TEXT, UNIQUE)
- `full_name` (TEXT)
- `role` (TEXT) - Enum: 'admin', 'super_admin'
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMPTZ)
- `last_login_at` (TIMESTAMPTZ)

**RLS Policies:**
- Admins can view all admin profiles
- Users can view their own profile
- Super admins can manage all admin profiles

### Service Delivery Tables

#### 5. `audit_reports`
Stores Creator Audit deliverables.

**Fields:**
- `id` (UUID, PK)
- `order_id` (UUID, FK → orders, SET NULL)
- Input data: `platform`, `niche`, `target_audience`, `main_objective`, `profile_url`, `profile_data` (JSONB), `customer_notes`
- Generated sections: `executive_summary`, `profile_positioning`, `bio_suggestions`, `content_strategy`, `recommended_formats` (JSONB), `content_ideas` (JSONB), `seven_day_plan` (JSONB), `performance_metrics` (JSONB), `next_steps`
- `status` (TEXT) - Enum: draft, review, approved, delivered
- `generated_by` (TEXT) - 'manual', 'ai_assisted', 'ai_api'
- `admin_notes` (TEXT)
- `created_at`, `updated_at`, `delivered_at` (TIMESTAMPTZ)

#### 6. `content_packs`
Stores Creator Content Pack deliverables.

**Fields:**
- `id` (UUID, PK)
- `order_id` (UUID, FK → orders, SET NULL)
- Input data: `platform`, `niche`, `target_audience`, `brand_voice`, `content_goals`, `customer_notes`
- Generated content: `content_ideas` (JSONB), `caption_drafts` (JSONB), `video_hooks` (JSONB), `calls_to_action` (JSONB), `suggested_formats` (JSONB), `publishing_calendar` (JSONB), `platform_adaptations` (JSONB)
- `status` (TEXT) - Enum: draft, review, approved, delivered
- `generated_by` (TEXT)
- `admin_notes` (TEXT)
- `created_at`, `updated_at`, `delivered_at` (TIMESTAMPTZ)

#### 7. `growth_partner_clients`
Stores Monthly Growth Partner client relationships.

**Fields:**
- `id` (UUID, PK)
- `order_id` (UUID, FK → orders, SET NULL)
- `client_name`, `client_email`, `platform`, `niche` (TEXT)
- `start_date` (DATE)
- `end_date` (DATE, nullable)
- `agreed_deliverables` (JSONB)
- `monthly_fee_eur`, `monthly_fee_mad` (DECIMAL)
- `status` (TEXT) - Enum: active, paused, completed, cancelled
- `client_notes`, `admin_notes` (TEXT)
- `created_at`, `updated_at` (TIMESTAMPTZ)

#### 8. `growth_partner_deliverables`
Stores monthly deliverables for Growth Partner clients.

**Fields:**
- `id` (UUID, PK)
- `client_id` (UUID, FK → growth_partner_clients, CASCADE DELETE)
- `service_month` (DATE) - First day of month
- `content_calendar`, `content_drafts`, `promotional_concepts` (JSONB)
- `calendar_status`, `drafts_status` (TEXT) - Enum: draft, sent, approved
- `monthly_review_notes` (TEXT)
- `review_date` (DATE)
- `delivery_status` (TEXT) - Enum: pending, in_progress, delivered
- `delivered_at` (TIMESTAMPTZ)
- `created_at`, `updated_at` (TIMESTAMPTZ)

#### 9. `prompt_templates`
Stores reusable AI prompt templates.

**Fields:**
- `id` (UUID, PK)
- `name`, `description` (TEXT)
- `category` (TEXT) - Enum: audit, content_pack, growth_partner
- `template_text` (TEXT)
- `variables` (JSONB) - Array of variable names
- `is_active` (BOOLEAN)
- `created_at`, `updated_at` (TIMESTAMPTZ)

---

## Authentication & Authorization

### Authentication Flow
1. User enters email/password on `/admin/login`
2. Supabase Auth validates credentials
3. System checks `admin_profiles` table for matching user ID
4. If admin profile exists and `is_active = true`, login succeeds
5. Session stored in Supabase Auth (HTTP-only cookies)
6. `last_login_at` updated in `admin_profiles`

### Authorization Model
- **Role-based:** admin, super_admin
- **Row Level Security (RLS):** All tables have RLS enabled
- **Client access:** Email-based verification with cryptographic tokens
- **Admin access:** Supabase Auth + admin_profiles table

### Security Features
- **Cryptographic verification tokens:** 256-bit random tokens for order access
- **Single-use tokens:** Tokens marked as used after first access
- **Token expiration:** 24-hour expiration on verification tokens
- **Generic error messages:** No information leakage on auth failures
- **Input sanitization:** XSS prevention on all user inputs
- **Server-side validation:** All data validated before database operations

---

## Frontend Architecture

### Routing Structure

#### Public Routes (Eagerly Loaded)
- `/` - Home page
- `/services` - Services overview
- `/creator-audit` - Creator Audit product page
- `/creator-content-pack` - Content Pack product page
- `/monthly-growth-partner` - Growth Partner product page
- `/for-artists` - For Artists page
- `/how-it-works` - How It Works page
- `/about` - About page
- `/contact` - Contact form
- `/privacy-policy` - Privacy Policy
- `/terms-of-service` - Terms of Service
- `/refund-policy` - Refund Policy

#### Order Flow Routes (Lazy Loaded)
- `/order/creator-audit` - Creator Audit order form
- `/order/creator-content-pack` - Content Pack order form
- `/order/monthly-growth-partner` - Growth Partner order form
- `/order-confirmation/:reference` - Order confirmation page
- `/client-portal` - Client order tracking portal

#### Admin Routes (Lazy Loaded)
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard (overview)
- `/admin/orders/:id` - Order detail page
- `/admin/service-delivery` - Service delivery dashboard
- `/admin/audit-generator` - Audit report generator
- `/admin/content-pack-generator` - Content pack generator
- `/admin/growth-partner` - Growth partner workspace

### Component Structure

#### Shared Components
- `Navbar.tsx` - Main navigation with responsive mobile menu
- `Footer.tsx` - Site footer with links
- `PageHero.tsx` - Reusable hero section
- `CTASection.tsx` - Call-to-action sections
- `FAQSection.tsx` - FAQ accordion
- `ProductCard.tsx` - Product display cards
- `ProductPage.tsx` - Reusable product page template
- `OrderForm.tsx` - Reusable order form
- `CurrencyToggle.tsx` - EUR/MAD currency switcher
- `LegalPage.tsx` - Legal page template

#### Admin Components
- `AdminDashboard.tsx` - Main admin dashboard with stats and order list
- `AdminOrderDetail.tsx` - Detailed order view with status management
- `AuditGenerator.tsx` - Audit report creation/editing interface
- `ContentPackGenerator.tsx` - Content pack creation/editing interface
- `GrowthPartnerWorkspace.tsx` - Growth partner client management
- `ServiceDeliveryDashboard.tsx` - Service delivery overview

### State Management
- **Local state:** React useState/useEffect
- **Server state:** Supabase client with real-time capabilities
- **Auth state:** Supabase Auth session management
- **Demo mode:** SessionStorage for demo admin session

### Code Splitting
- Public pages eagerly loaded (critical for first paint)
- Order flow lazy loaded
- Admin pages lazy loaded
- Bundle size: 362 KB (gzipped: 112 KB)

---

## Backend Services

### Order Service (`src/lib/orderService.ts`)
**Functions:**
- `validateOrder()` - Comprehensive input validation
- `createOrder()` - Order creation with duplicate prevention
- `getOrderByReference()` - Secure order retrieval with token verification
- `getAllOrders()` - Admin order listing with filters
- `getOrderById()` - Admin order detail retrieval
- `updateOrderStatus()` - Status updates with transition validation
- `updateOrderNotes()` - Internal notes updates
- `getProducts()` - Product listing
- `getProductBySlug()` - Product lookup by slug
- `updateProduct()` - Product updates (admin)
- `getOrderStats()` - Order statistics

**Security Features:**
- Input sanitization (XSS prevention)
- Email validation
- Duplicate order prevention (same email + product within 1 hour)
- Cryptographic token generation (crypto.getRandomValues)
- Status transition validation
- Server-side authorization checks

### Authentication Service (`src/lib/authService.ts`)
**Functions:**
- `signIn()` - Admin login with Supabase Auth
- `signOut()` - Admin logout
- `getCurrentAdmin()` - Get current admin profile
- `isAdmin()` - Check if user is admin
- `isDemoMode()` - Check if demo mode is enabled
- `demoSignIn()` - Demo mode login (bypasses auth)
- `onAuthStateChange()` - Auth state subscription

**Security Features:**
- Generic error messages (no information leakage)
- Demo mode isolation (sessionStorage-based)
- Admin profile verification
- Last login tracking

### Contact Service (`src/lib/contactService.ts`)
**Functions:**
- `validateContactForm()` - Contact form validation
- `submitContactForm()` - Submit to Web3Forms

**Security Features:**
- Honeypot field for bot detection
- Timestamp validation (prevent rapid submissions)
- Input sanitization
- Server-side validation

### Service Delivery Service (`src/lib/serviceDeliveryService.ts`)
**Functions:**
- `createAuditReport()`, `getAuditReport()`, `getAllAuditReports()`, `updateAuditReport()`, `deleteAuditReport()`
- `createContentPack()`, `getContentPack()`, `getAllContentPacks()`, `updateContentPack()`, `deleteContentPack()`
- `createGrowthPartnerClient()`, `getGrowthPartnerClient()`, `getAllGrowthPartnerClients()`, `updateGrowthPartnerClient()`
- `createGrowthPartnerDeliverable()`, `getDeliverablesForClient()`, `updateGrowthPartnerDeliverable()`
- `getAllPromptTemplates()`, `getPromptTemplate()`, `updatePromptTemplate()`
- `getServiceDeliveryStats()`

### Report Generator (`src/lib/reportGenerator.ts`)
**Functions:**
- `generateAuditReportHTML()` - Generate HTML report for audit
- `generateContentPackHTML()` - Generate HTML report for content pack
- `openReportInNewWindow()` - Open report in new window for printing
- `downloadReportAsHTML()` - Download report as HTML file

---

## Integrations

### Supabase
- **Database:** PostgreSQL with RLS
- **Authentication:** Email/password with session management
- **Real-time:** Available but not actively used
- **Storage:** Configured but not actively used

### Web3Forms
- **Purpose:** Contact form submission
- **Free tier:** 250 submissions/month
- **Configuration:** Via `VITE_WEB3FORMS_ACCESS_KEY`
- **Status:** Implemented and functional

### AI Integration
- **Current state:** Manual workflow (admin uses external AI tools)
- **Prompt templates:** Stored in database
- **Generation tracking:** `generated_by` field (manual/ai_assisted/ai_api)
- **Status:** No direct API integration yet

### Email/SMS
- **Current state:** Not implemented
- **Contact form:** Uses Web3Forms (external service)
- **Order notifications:** Not implemented
- **Status:** Gap identified

### Payment Processing
- **Current state:** Manual payment confirmation
- **Payment methods:** Bank transfer, PayPal (manual)
- **Status tracking:** Admin manually updates order status
- **Status:** Gap identified - no automated payment processing

### File Storage
- **Current state:** Not implemented
- **Deliverables:** Sent via email (manual)
- **Supabase Storage:** Configured but not used
- **Status:** Gap identified

---

## Testing

### Test Coverage
**Test Files:**
1. `authentication.test.ts` - Auth service tests
2. `contactValidation.test.ts` - Contact form validation tests
3. `orderAuthorization.test.ts` - Order access control tests
4. `orderValidation.test.ts` - Order creation validation tests

**Test Framework:** Vitest with @testing-library/react

**Coverage Areas:**
- ✅ Order validation (name, email, country, product, currency)
- ✅ Order authorization (token verification, admin access)
- ✅ Authentication (login, logout, admin verification)
- ✅ Contact form validation

**Missing Coverage:**
- ❌ Service delivery operations
- ❌ Admin dashboard functionality
- ❌ Report generation
- ❌ Integration tests
- ❌ End-to-end tests

---

## Security Measures

### Implemented
- ✅ Row Level Security (RLS) on all tables
- ✅ Cryptographic verification tokens (256-bit)
- ✅ Single-use, time-limited tokens
- ✅ Input sanitization (XSS prevention)
- ✅ Server-side validation
- ✅ Generic error messages
- ✅ Security headers (X-Frame-Options, CSP, etc.)
- ✅ HTTPS enforcement
- ✅ No secrets in frontend code
- ✅ Environment variable protection
- ✅ Admin role verification
- ✅ Status transition validation
- ✅ Duplicate order prevention

### Security Audit
- **Last audit:** 2025 (post-remediation)
- **Status:** All critical and high-severity issues resolved
- **Report:** `SECURITY_AUDIT_REPORT.md`

---

## Deployment Configuration

### Vercel (`vercel.json`)
- Security headers configured
- SPA routing with rewrites
- HTTPS enforced

### Netlify (`netlify.toml`)
- Security headers configured
- SPA routing with redirects
- HTTPS enforced

### Cloudflare Pages (`public/_headers`, `public/_redirects`)
- Security headers configured
- SPA routing with redirects
- HTTPS enforced

### Environment Variables
**Required:**
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anon key (public)

**Optional:**
- `VITE_WEB3FORMS_ACCESS_KEY` - Web3Forms access key
- `VITE_CONTACT_EMAIL` - Contact email address
- `VITE_DEFAULT_CURRENCY` - Default currency (EUR/MAD)
- `VITE_DEMO_MODE` - Enable demo mode (true/false)

---

## Current Features

### Customer-Facing
- ✅ Service product pages with pricing
- ✅ Order placement with validation
- ✅ Order confirmation with verification token
- ✅ Client portal for order tracking
- ✅ Contact form with spam protection
- ✅ Currency toggle (EUR/MAD)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Legal pages (Privacy, Terms, Refund Policy)

### Admin-Facing
- ✅ Admin login with authentication
- ✅ Dashboard with order overview and statistics
- ✅ Order detail view with status management
- ✅ Service delivery dashboard
- ✅ Audit report generator
- ✅ Content pack generator
- ✅ Growth partner workspace
- ✅ Demo mode for testing

### Service Delivery
- ✅ Audit report creation and editing
- ✅ Content pack creation and editing
- ✅ Growth partner client management
- ✅ Monthly deliverable tracking
- ✅ Prompt template management
- ✅ Report generation (HTML/PDF)

---

## Known Limitations

### Functional Gaps
1. **No automated payment processing** - Manual confirmation only
2. **No email notifications** - Order confirmations not sent automatically
3. **No file upload/download** - Deliverables sent manually via email
4. **No AI API integration** - Admin uses external AI tools manually
5. **No calendar/task management** - No project timeline tracking
6. **No client communication history** - No centralized messaging
7. **No automation rules** - All workflows are manual
8. **No advanced reporting** - Basic stats only

### Technical Debt
1. **Limited test coverage** - Only core validation tested
2. **No E2E tests** - No end-to-end testing
3. **No error tracking** - No Sentry or similar
4. **No analytics** - No Plausible/Umami configured
5. **No backup strategy** - Relies on Supabase automatic backups
6. **No monitoring** - No uptime or performance monitoring

---

## Performance Metrics

### Bundle Size
- **Total:** 362 KB (gzipped: 112 KB)
- **CSS:** 48 KB (gzipped: 8 KB)
- **JavaScript:** 362 KB (gzipped: 112 KB)
- **Code splitting:** Admin and order flow lazy loaded

### Build Performance
- **Build time:** ~6 seconds
- **Modules:** 1803 transformed
- **Optimization:** Tree shaking, minification, code splitting

---

## Database Performance

### Indexes
- Order status, creation date, customer email, product ID
- Order status history order ID, creation date

### Query Optimization
- Denormalized product_name in orders table
- JSONB for flexible data structures
- Proper foreign key relationships
- CASCADE/SET NULL for referential integrity

---

## Scalability Considerations

### Current Limits
- **Supabase free tier:** 500MB database, 2GB transfer, 50k monthly active users
- **Web3Forms free tier:** 250 submissions/month
- **Vercel/Netlify free tier:** 100GB bandwidth, 100GB function invocations

### Scaling Path
1. **Database:** Upgrade Supabase to Pro plan ($25/month)
2. **Email:** Upgrade Web3Forms or switch to Resend/SendGrid
3. **AI:** Integrate OpenAI/Anthropic API (pay-per-use)
4. **Storage:** Use Supabase Storage for deliverables
5. **Monitoring:** Add Plausible/Umami for analytics
6. **Error tracking:** Add Sentry for error monitoring

---

## Maintenance Requirements

### Regular Tasks
- Monitor Supabase usage and upgrade if needed
- Review and rotate any exposed credentials
- Update dependencies (npm audit)
- Monitor Web3Forms submission count
- Review security audit findings quarterly

### Backup & Recovery
- **Database:** Supabase automatic daily backups (7-day retention)
- **Code:** Git repository (GitHub)
- **Environment:** Document in `.env.example`
- **Recovery:** Restore from Supabase backup + redeploy from Git

---

## Conclusion

The current MediasMakers application is a solid foundation with:
- ✅ Complete customer-facing storefront
- ✅ Functional order management system
- ✅ Secure authentication and authorization
- ✅ Service delivery workflows
- ✅ Production-ready security
- ✅ Comprehensive documentation

**Next Steps:**
The application is ready for the Admin Command Center enhancement (Phase 2) to add:
- Advanced client management
- Project/task tracking
- AI integration
- Automation rules
- Email/SMS notifications
- File management
- Advanced reporting

All existing functionality should be preserved and extended, not replaced.
