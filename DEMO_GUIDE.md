# 🎮 MediasMakers Demo Mode Guide

## What is Demo Mode?

Demo mode allows you to explore the entire MediasMakers platform without needing to set up authentication or create real accounts. It's perfect for:
- Client demonstrations
- Testing the user interface
- Understanding the workflow
- Training team members

**⚠️ Important:** Demo mode should **NEVER** be enabled in production. It bypasses all security checks.

---

## 🚀 Quick Start (2 Minutes)

### Step 1: Enable Demo Mode

Demo mode is already enabled in your `.env` file:

```env
VITE_DEMO_MODE=true
```

### Step 2: Load Demo Data

Run the demo data SQL file in your Supabase SQL Editor:

1. Go to your Supabase dashboard
2. Click "SQL Editor"
3. Click "New Query"
4. Copy the entire contents of `supabase/demo_data.sql`
5. Paste it and click "Run"

**This will create:**
- ✅ 4 sample orders (various stages)
- ✅ 1 completed audit report
- ✅ 1 content pack in review
- ✅ 1 active growth partner client

### Step 3: Access Demo Login

1. Go to your website
2. Scroll to the footer
3. Click "Admin Login"
4. You'll see a yellow **"Enter Demo Mode"** button
5. Click it — no password needed!

---

## 📊 Demo Data Overview

### Orders (4 Total)

| Reference | Customer | Product | Status | Price |
|-----------|----------|---------|--------|-------|
| MM-DEMO0001 | Sarah Johnson | Creator Audit | ✅ Delivered | €9 |
| MM-DEMO0002 | Ahmed Benali | Content Pack | 🔄 In Progress | 209 MAD |
| MM-DEMO0003 | Emma Rodriguez | Growth Partner | ⏳ Pending Payment | €149 |
| MM-DEMO0004 | Yuki Tanaka | Creator Audit | 💰 Paid | €9 |

### Audit Report (1 Completed)

**Client:** Sarah Johnson (Fitness & Wellness)
- Platform: Instagram
- 2,500 followers → Target: 10k
- Includes: 10 content ideas, 7-day action plan, performance metrics
- Status: Delivered

### Content Pack (1 In Review)

**Client:** Ahmed Benali (Independent Music)
- Platform: TikTok
- Releasing 5-track EP in 2 months
- Includes: 10 content ideas, 3 caption drafts, 3 video hooks
- Status: In Review (ready for approval)

### Growth Partner Client (1 Active)

**Client:** Artisan Coffee Roasters
- Platform: Instagram
- Niche: Specialty Coffee & Café
- Monthly fee: €149
- Status: Active since January 2025

---

## 🎯 What You Can Demo

### 1. Admin Dashboard
- View all orders with search and filters
- See statistics (total orders, revenue, delivery rate)
- Quick access to service delivery workspace

### 2. Order Management
- Click on any order to view details
- Update order status (pending → paid → in progress → delivered)
- Add internal notes
- View customer information and requirements

### 3. Service Delivery Workspace

#### Creator Audit Generator
- View the completed audit for Sarah Johnson
- See all 9 sections (executive summary, content strategy, etc.)
- Preview the HTML report
- Download as PDF

#### Content Pack Generator
- View the content pack for Ahmed Benali
- See 10 content ideas, captions, and video hooks
- Edit and approve the content
- Generate the HTML report

#### Growth Partner Workspace
- View Artisan Coffee Roasters client profile
- See agreed deliverables and monthly fees
- Track monthly deliverables
- Add review notes

### 4. Customer Order Flow
- Place a test order (any product)
- See the order confirmation page
- View order details with verification token
- Check that order appears in admin dashboard

---

## 🔐 Demo Mode Security Notes

### What Demo Mode Does:
- ✅ Bypasses password authentication
- ✅ Creates a virtual admin session
- ✅ Allows access to all admin features
- ✅ Uses real database data (demo data)

### What Demo Mode Does NOT Do:
- ❌ Disable Row Level Security (RLS)
- ❌ Expose service_role key
- ❌ Allow unauthorized database access
- ❌ Work without Supabase connection

### Important Warnings:
- **NEVER enable demo mode in production**
- Demo mode uses sessionStorage (cleared on browser close)
- Anyone with the URL can access demo mode
- Demo data is stored in the real database

---

## 🎬 Demo Script for Clients

### Introduction (2 minutes)
"Welcome to MediasMakers! Let me show you how our platform works. We have three main products: Creator Audit, Content Pack, and Monthly Growth Partner. I'll walk you through the entire workflow from order placement to delivery."

### Part 1: Customer Experience (3 minutes)
1. **Browse Services**
   - Show the homepage
   - Navigate to Services page
   - Show pricing in EUR and MAD

2. **Place an Order**
   - Click on "Creator Audit"
   - Fill out the order form
   - Show the confirmation page
   - Explain the verification token system

3. **Order Tracking**
   - Explain that customers receive order reference (e.g., MM-ABC12345)
   - They can contact support with this reference
   - Admin manages everything from the dashboard

### Part 2: Admin Dashboard (5 minutes)
1. **Login to Admin**
   - Click "Enter Demo Mode"
   - Show the dashboard
   - Point out statistics and order overview

2. **View Orders**
   - Show the 4 demo orders
   - Demonstrate search and filters
   - Click on an order to show details

3. **Update Order Status**
   - Show how to change status
   - Add internal notes
   - Track payment and delivery

### Part 3: Service Delivery (10 minutes)

#### Creator Audit (3 minutes)
1. Go to Service Delivery → Creator Audit Generator
2. Select Sarah Johnson's completed audit
3. Show all sections:
   - Executive summary
   - Profile positioning
   - Bio suggestions
   - Content strategy
   - 10 content ideas
   - 7-day action plan
   - Performance metrics
4. Click "Preview Report"
5. Show the professional HTML report
6. Explain how to print to PDF

#### Content Pack (3 minutes)
1. Go to Content Pack Generator
2. Select Ahmed Benali's content pack
3. Show:
   - 10 content ideas
   - 3 caption drafts with hashtags
   - 3 video hooks
   - Calls to action
4. Explain the approval workflow
5. Show how to generate the report

#### Growth Partner (4 minutes)
1. Go to Growth Partner Workspace
2. Select Artisan Coffee Roasters
3. Show:
   - Client information
   - Agreed deliverables
   - Monthly fee tracking
   - Client notes
4. Explain the monthly workflow:
   - Create monthly deliverable
   - Prepare content calendar
   - Share with client
   - Track approval
   - Record review notes

### Part 4: Key Features (2 minutes)
1. **Security**
   - Cryptographic verification tokens
   - Row Level Security
   - Generic error messages

2. **Flexibility**
   - AI-assisted content generation
   - Manual review and approval
   - Professional PDF reports

3. **Scalability**
   - Handle multiple clients
   - Track all orders
   - Manage recurring services

### Conclusion (1 minute)
"That's the complete MediasMakers platform! From order placement to delivery, everything is streamlined and professional. The system is secure, scalable, and designed for creators and small businesses. Any questions?"

---

## 🛠️ Troubleshooting

### "Enter Demo Mode" button not showing
**Solution:**
1. Check that `VITE_DEMO_MODE=true` is in your `.env` file
2. Restart your dev server: `npm run dev`
3. Clear browser cache and refresh

### Demo data not showing in admin
**Solution:**
1. Make sure you ran `supabase/demo_data.sql` in Supabase SQL Editor
2. Check that you're logged in (clicked "Enter Demo Mode")
3. Refresh the admin dashboard

### Can't place test orders
**Solution:**
1. Demo mode still requires Supabase connection
2. Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
3. Verify products exist in the database (run `schema.sql` if needed)

### Demo session expires
**Solution:**
- Demo session is stored in sessionStorage
- It persists until you close the browser
- Just click "Enter Demo Mode" again to re-enter

---

## 📋 Demo Checklist

Before your demo, verify:

- [ ] Demo mode enabled (`VITE_DEMO_MODE=true`)
- [ ] Demo data loaded (ran `demo_data.sql`)
- [ ] Supabase connection working
- [ ] Can access admin login page
- [ ] "Enter Demo Mode" button visible
- [ ] Can login to demo mode
- [ ] Orders visible in dashboard
- [ ] Audit report accessible
- [ ] Content pack accessible
- [ ] Growth partner client visible
- [ ] Can place test order
- [ ] Can preview reports
- [ ] Can update order status

---

## 🎓 Demo Tips

### For Client Demos:
1. **Start with the customer experience** — Show how easy it is to order
2. **Emphasize security** — Explain verification tokens and data protection
3. **Show real deliverables** — The audit report and content pack are impressive
4. **Highlight the workflow** — Show how orders move through the system
5. **End with value** — Emphasize time savings and professional quality

### For Team Training:
1. **Walk through each product** — Audit, Content Pack, Growth Partner
2. **Explain the status flow** — pending → paid → in progress → delivered
3. **Show report generation** — Preview and PDF export
4. **Demonstrate search/filter** — How to find specific orders
5. **Cover internal notes** — How to track communication

### For Testing:
1. **Test all order statuses** — Create orders in each stage
2. **Test report generation** — Preview and download reports
3. **Test search functionality** — Find orders by customer, reference, status
4. **Test status updates** — Move orders through the workflow
5. **Test error handling** — Try invalid inputs, check error messages

---

## 🔒 Disabling Demo Mode

When you're ready for production:

1. Open `.env` file
2. Change `VITE_DEMO_MODE=true` to `VITE_DEMO_MODE=false`
3. Or delete the line entirely
4. Restart your dev server or redeploy
5. The "Enter Demo Mode" button will disappear
6. Only real authentication will work

**Important:** Also delete the demo data from your database:
```sql
DELETE FROM orders WHERE order_reference LIKE 'MM-DEMO%';
DELETE FROM audit_reports WHERE order_id IN (SELECT id FROM orders WHERE order_reference LIKE 'MM-DEMO%');
DELETE FROM content_packs WHERE order_id IN (SELECT id FROM orders WHERE order_reference LIKE 'MM-DEMO%');
DELETE FROM growth_partner_clients WHERE client_name = 'Artisan Coffee Roasters';
```

---

## 📞 Need Help?

### Documentation Files:
- `SETUP_GUIDE.md` — Complete setup instructions
- `README.md` — Project overview
- `SECURITY_AUDIT_REPORT.md` — Security details
- `SERVICE_DELIVERY.md` — Service delivery workspace guide

### Common Issues:
1. **Demo button not showing** → Check `.env` file and restart server
2. **No demo data** → Run `demo_data.sql` in Supabase
3. **Can't place orders** → Check Supabase connection
4. **Session lost** → Click "Enter Demo Mode" again

---

## ✅ You're Ready!

Your demo environment is set up and ready to showcase. The demo includes:

- ✅ 4 sample orders in various stages
- ✅ 1 completed audit report with full content
- ✅ 1 content pack with ideas, captions, and hooks
- ✅ 1 active growth partner client
- ✅ Password-free admin access
- ✅ Professional HTML reports
- ✅ Complete workflow demonstration

**To start the demo:**
1. Go to your website
2. Scroll to footer → Click "Admin Login"
3. Click "Enter Demo Mode"
4. Explore the platform!

Good luck with your demonstrations! 🎉
