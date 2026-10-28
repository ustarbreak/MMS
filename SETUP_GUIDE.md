# 🚀 MediasMakers — Complete Setup Guide

## Quick Answer: How to Login

The admin login page is now accessible from the **footer** of the website:
- Scroll to the bottom of any page
- Look for "Admin Login" in the Legal section
- Click it to go to `/admin/login`

**OR** go directly to: `https://yourdomain.com/admin/login`

---

## 📋 Complete Setup Process

### Step 1: Create Supabase Project (10 minutes)

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email
4. Click "New Project"
5. Fill in:
   - **Name**: `mediasmakers`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you (e.g., West Europe for Morocco)
6. Click "Create new project"
7. Wait ~2 minutes for it to initialize

### Step 2: Set Up Database (5 minutes)

1. In your Supabase dashboard, click "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste it into the SQL Editor
5. Click "Run" (or press Ctrl+Enter)
6. Wait for it to complete (you'll see success messages)

**Then run the service delivery schema:**
7. Click "New Query" again
8. Copy the entire contents of `supabase/service_delivery_schema.sql`
9. Paste and click "Run"

**Then run the verification tokens migration:**
10. Click "New Query" again
11. Copy the entire contents of `supabase/migrations/001_add_verification_tokens.sql`
12. Paste and click "Run"

### Step 3: Create Your Admin Account (5 minutes)

1. In Supabase dashboard, click "Authentication" in the left sidebar
2. Click the "Users" tab
3. Click "Add user" → "Create new user"
4. Fill in:
   - **Email**: Your email address (the one you'll use to login)
   - **Password**: Create a strong password
   - **Check**: "Auto Confirm User"
5. Click "Create user"
6. **IMPORTANT**: Copy the "UID" (looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

**Now add yourself as an admin:**
7. Click "SQL Editor" in the left sidebar
8. Click "New Query"
9. Paste this SQL (replace the values):

```sql
INSERT INTO admin_profiles (id, email, full_name, role, is_active)
VALUES (
  'YOUR-UID-HERE',
  'your-email@example.com',
  'Your Name',
  'super_admin',
  true
);
```

10. Replace:
    - `YOUR-UID-HERE` with the UID you copied (keep the quotes)
    - `your-email@example.com` with your actual email
    - `Your Name` with your actual name
11. Click "Run"

**You should see "Success. No rows returned"**

### Step 4: Get Your Supabase Credentials (2 minutes)

1. In Supabase dashboard, click "Project Settings" (gear icon) in the left sidebar
2. Click "API"
3. Copy these two values:
   - **Project URL**: Looks like `https://abcdefghijk.supabase.co`
   - **anon public key**: A long string starting with `eyJhbGc...`

**Keep these safe — you'll need them next!**

### Step 5: Configure Environment Variables (3 minutes)

**If running locally:**
1. In your project folder, create a file named `.env` (copy from `.env.example`)
2. Paste your Supabase credentials:

```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your-full-key-here
VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-key
```

**If deploying to Cloudflare Pages/Vercel/Netlify:**
1. Go to your hosting provider's dashboard
2. Find "Environment Variables" or "Settings"
3. Add these three variables:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
   - `VITE_WEB3FORMS_ACCESS_KEY` = your Web3Forms key (see Step 6)

### Step 6: Set Up Contact Form (Optional, 5 minutes)

**Get Web3Forms access key:**
1. Go to https://web3forms.com
2. Enter your email address
3. Check your email for the access key
4. Copy the key
5. Add it to your environment variables as `VITE_WEB3FORMS_ACCESS_KEY`

**If you skip this step:**
- The contact form will show an error message
- Visitors will be directed to email you directly
- You can add this later anytime

### Step 7: Deploy to Production (10 minutes)

**Option A: Cloudflare Pages (Recommended — Free)**
1. Push your code to GitHub
2. Go to https://pages.cloudflare.com
3. Click "Create a project"
4. Connect your GitHub account
5. Select your repository
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
7. Add environment variables (from Step 5)
8. Click "Save and Deploy"
9. Wait ~2 minutes

**Option B: Vercel (Also Free)**
1. Push to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables
5. Click "Deploy"

### Step 8: Configure Domain (15 minutes)

1. In your hosting provider dashboard, find "Custom Domains"
2. Add `mediasmakers.com`
3. They'll give you DNS records to add (usually):
   - **A record** or **CNAME record**
4. Go to your domain registrar (where you bought mediasmakers.com)
5. Find "DNS Settings" or "DNS Management"
6. Add the records provided by your hosting provider
7. Wait for DNS propagation (up to 24 hours, usually much faster)
8. Enable HTTPS (usually automatic)

### Step 9: Test Everything (5 minutes)

1. Go to `https://mediasmakers.com`
2. Test the public pages (Home, Services, About, etc.)
3. Try placing a test order
4. Scroll to the footer and click "Admin Login"
5. Login with your admin credentials
6. Verify you can see the admin dashboard

---

## 🔐 How to Login (After Setup)

### Method 1: Footer Link (Recommended)
1. Go to your website
2. Scroll to the bottom
3. Click "Admin Login" in the Legal section
4. Enter your admin email and password
5. Click "Sign In"

### Method 2: Direct URL
1. Go to `https://mediasmakers.com/admin/login`
2. Enter your admin email and password
3. Click "Sign In"

### What Happens After Login
- You'll be redirected to `/admin/dashboard`
- You'll see:
  - Order overview
  - Service delivery workspace
  - Statistics and analytics
  - Quick links to manage orders, reports, and clients

---

## 🛠️ Troubleshooting

### "Invalid credentials" when logging in
**Possible causes:**
- You haven't created an admin account in Supabase yet
- Your email/password is wrong
- You haven't added yourself to the `admin_profiles` table

**Solution:**
1. Go to Supabase → Authentication → Users
2. Verify your email is in the list
3. Go to Supabase → SQL Editor and run:
   ```sql
   SELECT * FROM admin_profiles WHERE email = 'your-email@example.com';
   ```
4. If no results, run the INSERT statement from Step 3

### "Supabase credentials not configured" error
**Solution:**
1. Check your `.env` file (local) or environment variables (hosting)
2. Make sure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
3. Restart your dev server or redeploy

### "Contact form is not configured" message
**Solution:**
1. Get a Web3Forms access key from https://web3forms.com
2. Add it to your environment variables as `VITE_WEB3FORMS_ACCESS_KEY`
3. Redeploy or restart your dev server

### Can't see orders in admin dashboard
**Solution:**
1. Make sure you're logged in as an admin
2. Check that orders were created (place a test order)
3. Check browser console for errors (F12)
4. Verify Supabase RLS policies are active

### "Order not found" when viewing confirmation
**Solution:**
- This is expected behavior! The verification token is single-use
- After viewing the order once, the token is invalidated
- Customers should save their order reference for support inquiries
- Admins can view any order from the admin dashboard

---

## 📊 What You Can Do After Login

### Admin Dashboard (`/admin/dashboard`)
- View all orders
- Search and filter orders
- See statistics (total orders, revenue, etc.)
- Quick access to service delivery workspace

### Order Management (`/admin/orders/:id`)
- View order details
- Update order status (pending → paid → in progress → delivered)
- Add internal notes
- Track payment and delivery

### Service Delivery (`/admin/service-delivery`)
- **Creator Audit Generator**: Create audit reports
- **Content Pack Generator**: Create content packs
- **Growth Partner Workspace**: Manage monthly clients

### How to Fulfill an Order
1. Receive order notification (check admin dashboard)
2. Go to Service Delivery workspace
3. Create report/content pack using AI tools
4. Review and approve
5. Generate PDF report
6. Email to customer
7. Update order status to "Delivered"

---

## 🔒 Security Notes

### Your Admin Credentials
- **Never share** your admin password
- **Use a strong password** (12+ characters, mixed case, numbers, symbols)
- **Enable 2FA** in Supabase if available
- **Don't commit** `.env` file to Git

### Customer Data
- Customers **cannot** access other customers' orders
- Order verification tokens are **single-use** and **expire after 24 hours**
- All customer data is protected by **Row Level Security (RLS)**
- Admin access requires **both** Supabase Auth **and** admin profile

### What's Safe to Share
- ✅ Supabase anon key (designed to be public)
- ✅ Product information (public anyway)
- ✅ Website URL

### What's NOT Safe to Share
- ❌ Supabase service_role key (never use in frontend)
- ❌ Admin passwords
- ❌ `.env` file contents
- ❌ Database credentials

---

## 📞 Need Help?

### Documentation Files
- `README.md` — Main project documentation
- `SETUP_GUIDE.md` — This file (detailed setup instructions)
- `SECURITY_AUDIT_REPORT.md` — Security audit findings
- `SERVICE_DELIVERY.md` — How to use the service delivery workspace
- `ORDER_SYSTEM.md` — Order management system details

### Common Issues
1. **"Invalid credentials"** → Check Step 3 (admin account setup)
2. **"Supabase not configured"** → Check Step 5 (environment variables)
3. **Contact form not working** → Check Step 6 (Web3Forms setup)
4. **Can't see orders** → Place a test order first, then check admin dashboard

### Getting Support
- Check the documentation files first
- Review browser console for errors (F12 → Console tab)
- Check Supabase dashboard logs
- Verify all environment variables are set correctly

---

## ✅ Setup Checklist

Use this checklist to ensure you've completed everything:

### Supabase Setup
- [ ] Created Supabase project
- [ ] Ran `schema.sql`
- [ ] Ran `service_delivery_schema.sql`
- [ ] Ran `001_add_verification_tokens.sql`
- [ ] Created admin user in Authentication
- [ ] Added admin to `admin_profiles` table
- [ ] Copied Project URL and anon key

### Environment Variables
- [ ] Set `VITE_SUPABASE_URL`
- [ ] Set `VITE_SUPABASE_ANON_KEY`
- [ ] Set `VITE_WEB3FORMS_ACCESS_KEY` (optional)

### Deployment
- [ ] Pushed code to GitHub
- [ ] Connected to hosting provider
- [ ] Configured build settings
- [ ] Added environment variables to hosting
- [ ] Deployed successfully
- [ ] Configured custom domain
- [ ] Enabled HTTPS

### Testing
- [ ] Tested public pages
- [ ] Placed test order
- [ ] Accessed admin login (from footer)
- [ ] Logged in successfully
- [ ] Viewed admin dashboard
- [ ] Verified order appears in dashboard

---

## 🎉 You're Ready!

Once you've completed all the steps above, you'll have:
- ✅ A fully functional MediasMakers website
- ✅ Secure admin access
- ✅ Order management system
- ✅ Service delivery workspace
- ✅ Contact form (if Web3Forms configured)

**To login:**
1. Go to your website
2. Scroll to the footer
3. Click "Admin Login"
4. Enter your credentials
5. Start managing orders!

---

**Questions?** Check the documentation files or review the troubleshooting section above.
