# MediasMakers 2.0 — Complete Platform

AI-assisted creator growth and social media marketing platform with order management system.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env

# Edit .env with your Supabase credentials (see setup below)

# Run development server
npm run dev

# Build for production
npm run build
```

## 📋 Setup Instructions

### 1. Create Supabase Project (Required for Order Management)

1. Go to [Supabase](https://supabase.com) and sign up (free tier available)
2. Create a new project
3. Wait for the project to be ready (takes ~2 minutes)
4. Go to **Project Settings** → **API**
5. Copy your **Project URL** and **anon/public key**
6. Paste them into your `.env` file:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 2. Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste it into the SQL Editor
5. Click **Run** to execute
6. You should see success messages for all tables, policies, and seed data

### 3. Create Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter your email and a strong password
4. Check "Auto Confirm User"
5. Click **Create user**
6. Note the **UID** (User UUID) from the user list
7. Go to **SQL Editor** and run:
   ```sql
   INSERT INTO admin_profiles (id, email, full_name, role, is_active)
   VALUES (
     'YOUR-USER-UID-HERE',
     'your-email@example.com',
     'Your Name',
     'super_admin',
     true
   );
   ```
   Replace `YOUR-USER-UID-HERE` with the actual UID (with quotes).

### 4. Test the System

1. Start the dev server: `npm run dev`
2. Go to `http://localhost:5173` to see the public website
3. Click on any product and try placing an order
4. Go to `http://localhost:5173/admin/login` to test admin login
5. Use the admin credentials you created in step 3

### 5. Deploy to Production

#### Option A: Cloudflare Pages (Recommended — Free)

1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Connect your GitHub repository
4. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Add environment variables in Cloudflare dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy!

#### Option B: Vercel (Free)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## 📁 Project Structure

```
mediasmakers/
├── public/                    # Static assets
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── OrderForm.tsx      # Order placement form
│   │   ├── ProductCard.tsx    # Product display card
│   │   ├── ProductPage.tsx    # Product detail page
│   │   └── ...
│   ├── pages/                 # Page components
│   │   ├── Home.tsx           # Homepage
│   │   ├── OrderConfirmation.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminOrderDetail.tsx
│   │   └── ...
│   ├── lib/                   # Business logic
│   │   ├── supabase.ts        # Supabase client & types
│   │   ├── orderService.ts    # Order management
│   │   └── authService.ts     # Authentication
│   ├── config/
│   │   └── site.ts            # Site configuration
│   ├── App.tsx                # Routes
│   └── main.tsx               # Entry point
├── supabase/
│   └── schema.sql             # Database schema
├── .env.example               # Environment template
└── README.md                  # This file
```

## 🛠️ Features

### Public Website
- ✅ 12 pages with full content
- ✅ Responsive design (mobile-first)
- ✅ Configurable pricing (EUR/MAD)
- ✅ Product pages with order flow
- ✅ Contact form
- ✅ Legal pages (Privacy, Terms, Refund Policy)
- ✅ SEO optimized

### Order Management
- ✅ Order placement with validation
- ✅ Duplicate order prevention
- ✅ Order confirmation page
- ✅ Order reference tracking
- ✅ Customer self-service (view order status)
- ✅ Manual payment workflow

### Admin Dashboard
- ✅ Secure authentication
- ✅ Order overview with search/filter
- ✅ Order detail pages
- ✅ Status management (with audit trail)
- ✅ Internal notes
- ✅ Basic analytics
- ✅ Product management

### Security
- ✅ Row Level Security (RLS) on all tables
- ✅ Server-side validation
- ✅ Input sanitization
- ✅ No sensitive data in frontend
- ✅ Environment variables for secrets
- ✅ Status transition validation
- ✅ Anti-spam measures (duplicate prevention)

## 🔧 How to Edit Content

### Change Prices
Edit `src/config/site.ts` → `products` array:
```typescript
{
  priceEur: 9,    // Change this
  priceMad: 99,   // Change this
  // ...
}
```

### Change Product Descriptions
Edit `src/config/site.ts` → `products` array:
```typescript
{
  shortDescription: "...",  // Card display
  longDescription: "...",   // Detail page
  features: [...],          // Bullet points
  deliverables: [...],      // What client receives
}
```

### Change Homepage Copy
Edit `src/config/site.ts` → `homeContent` object

### Change Legal Text
Edit `src/config/site.ts` → `legalContent` object

## 📊 Order Statuses

- **Pending Payment** — Order created, awaiting payment
- **Paid** — Payment confirmed, ready to start
- **In Progress** — Work is being done
- **Delivered** — Deliverables sent to customer
- **Cancelled** — Order cancelled
- **Refunded** — Payment refunded

Status changes are logged in `order_status_history` table for audit trail.

## 🔐 Security Notes

### What's Safe in Frontend
- ✅ Supabase anon key (designed to be public)
- ✅ Product data (public anyway)
- ✅ Order references (need email to view)

### What's Protected by RLS
- ✅ Customer orders (only own orders visible)
- ✅ Admin functions (only admins can access)
- ✅ Status updates (admin only)
- ✅ All database operations

### What You Must Do
- ✅ Never commit `.env` file
- ✅ Never use service_role key in frontend
- ✅ Enable HTTPS in production (automatic on Cloudflare/Vercel)
- ✅ Regularly review admin access
- ✅ Monitor order activity

## 🧪 Testing Checklist

### Order Flow
- [ ] Place valid order
- [ ] Test invalid email
- [ ] Test duplicate order (same email + product within 1 hour)
- [ ] Check order confirmation page
- [ ] Verify order reference format (MM-XXXXXXXX)

### Admin Access
- [ ] Login with valid credentials
- [ ] Try login with wrong password
- [ ] Try accessing /admin/dashboard without login
- [ ] View order list
- [ ] Search orders
- [ ] Filter by status
- [ ] View order detail
- [ ] Update order status
- [ ] Test invalid status transition
- [ ] Add internal notes

### Security
- [ ] Try accessing another user's order by guessing reference
- [ ] Try updating order without admin login
- [ ] Check browser console for exposed secrets (should be none)
- [ ] Verify RLS policies are active

## 🚧 Known Limitations

1. **No email notifications** — Order confirmations are shown on screen but not emailed
2. **No payment processing** — Payment is arranged manually after order
3. **No file uploads** — Deliverables are shared via email/link manually
4. **No automated delivery** — Admin marks orders as delivered manually
5. **Basic analytics** — Only order counts and revenue totals

## 📈 Next Steps (Future Enhancements)

- [ ] Email notifications (Resend, SendGrid, or Supabase Edge Functions)
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] File upload for deliverables
- [ ] Customer portal (view order history, download files)
- [ ] Advanced analytics dashboard
- [ ] Automated reporting
- [ ] Multi-language support (French, Arabic)
- [ ] SMS notifications
- [ ] Automated content generation workflow

## 🆘 Troubleshooting

### "Supabase credentials not configured"
- Check that `.env` file exists and has correct values
- Restart dev server after editing `.env`

### "Order creation failed"
- Check Supabase dashboard for errors
- Verify RLS policies are set up correctly
- Check browser console for detailed error

### "Admin login failed"
- Verify user exists in Supabase Authentication
- Check that user is in `admin_profiles` table
- Ensure `is_active` is true

### "Cannot access admin dashboard"
- Check browser console for authentication errors
- Verify RLS policies allow admin access
- Try logging out and back in

## 📞 Support

For technical issues:
- Check Supabase dashboard logs
- Review browser console errors
- Verify environment variables
- Check database schema is correct

For business questions:
- Edit content in `src/config/site.ts`
- Update prices and descriptions there
- Rebuild and redeploy

## 📄 License

Proprietary — MediasMakers © 2025

---

**Built with:** React, TypeScript, Vite, Tailwind CSS, Supabase, Framer Motion
