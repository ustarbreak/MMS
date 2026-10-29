# 🚀 MediasMakers — Quick Start Guide

## ✅ Demo Mode is Ready!

Your application is now configured for demonstration with sample data and password-free login.

---

## 🎯 What You Have

### Demo Data Loaded
- **4 sample orders** in various stages (pending, paid, in progress, delivered)
- **1 completed audit report** with full content (Sarah Johnson - Fitness)
- **1 content pack** with ideas and captions (Ahmed Benali - Music)
- **1 growth partner client** (Artisan Coffee Roasters)

### Demo Login
- **No password required** — just click "Enter Demo Mode"
- **Full admin access** — view all orders, reports, and manage everything
- **Safe for demos** — uses sessionStorage, cleared on browser close

---

## 📋 Quick Setup (5 Minutes)

### Step 1: Load Demo Data

1. Go to your **Supabase dashboard**
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New Query"**
4. Open the file `supabase/demo_data.sql` in your project
5. Copy ALL the content
6. Paste it into the SQL Editor
7. Click **"Run"**

✅ You should see "Success. No rows returned"

### Step 2: Access Demo Login

1. Go to your website (e.g., `http://localhost:5173`)
2. Scroll to the **footer**
3. Click **"Admin Login"**
4. You'll see a yellow **"Enter Demo Mode"** button
5. Click it — **no password needed!**

✅ You're now in the admin dashboard!

---

## 🎬 What You Can Demo

### 1. Admin Dashboard (`/admin/dashboard`)
- View all 4 demo orders
- See statistics (total orders, revenue, delivery rate)
- Search and filter orders
- Quick access to service delivery workspace

### 2. Order Management
- Click any order to view details
- Update order status (pending → paid → in progress → delivered)
- Add internal notes
- View customer information

### 3. Service Delivery Workspace

#### Creator Audit Generator
- View Sarah Johnson's completed audit
- See all 9 sections (executive summary, content strategy, etc.)
- Preview the professional HTML report
- Download as PDF

#### Content Pack Generator
- View Ahmed Benali's content pack
- See 10 content ideas, 3 captions, 3 video hooks
- Edit and approve content
- Generate the HTML report

#### Growth Partner Workspace
- View Artisan Coffee Roasters client
- See agreed deliverables and monthly fees
- Track monthly deliverables
- Add review notes

### 4. Customer Order Flow
- Place a test order (any product)
- See the order confirmation page
- View order with verification token
- Check that order appears in admin dashboard

---

## 🔐 Demo Mode Details

### What It Does:
- ✅ Bypasses password authentication
- ✅ Creates virtual admin session
- ✅ Allows full admin access
- ✅ Uses real database (demo data)

### What It Does NOT Do:
- ❌ Disable security (RLS still active)
- ❌ Expose sensitive keys
- ❌ Work without Supabase
- ❌ Persist after browser close

### ⚠️ Important:
- **NEVER enable in production**
- Only for demonstrations and testing
- Anyone with the URL can access demo mode

---

## 📊 Demo Data Summary

| Order | Customer | Product | Status | Price |
|-------|----------|---------|--------|-------|
| MM-DEMO0001 | Sarah Johnson | Creator Audit | ✅ Delivered | €9 |
| MM-DEMO0002 | Ahmed Benali | Content Pack | 🔄 In Progress | 209 MAD |
| MM-DEMO0003 | Emma Rodriguez | Growth Partner | ⏳ Pending Payment | €149 |
| MM-DEMO0004 | Yuki Tanaka | Creator Audit | 💰 Paid | €9 |

---

## 🎯 Demo Script (15 Minutes)

### Introduction (2 min)
"Welcome to MediasMakers! Let me show you our AI-assisted social media marketing platform for creators and small businesses."

### Customer Experience (3 min)
1. Show homepage and services
2. Place a test order
3. Show confirmation page with verification token
4. Explain how customers track orders

### Admin Dashboard (5 min)
1. Login with demo mode
2. Show order overview and statistics
3. Click on an order to show details
4. Demonstrate status updates and notes

### Service Delivery (5 min)
1. **Creator Audit** — Show Sarah's completed report
2. **Content Pack** — Show Ahmed's ideas and captions
3. **Growth Partner** — Show coffee shop client management

### Conclusion (1 min)
"That's MediasMakers — secure, professional, and designed for creators. Any questions?"

---

## 🛠️ Troubleshooting

### "Enter Demo Mode" button not showing
```bash
# Check .env file has:
VITE_DEMO_MODE=true

# Restart dev server:
npm run dev
```

### Demo data not showing
- Make sure you ran `supabase/demo_data.sql`
- Check Supabase connection is working
- Refresh the admin dashboard

### Can't place test orders
- Demo mode still requires Supabase connection
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Check that products exist in database

---

## 📚 Documentation

- **`DEMO_GUIDE.md`** — Complete demo instructions and script
- **`SETUP_GUIDE.md`** — Full setup guide for production
- **`README.md`** — Project overview
- **`SECURITY_AUDIT_REPORT.md`** — Security details

---

## 🎓 Next Steps

### For Demos:
1. ✅ Demo mode is enabled
2. ✅ Demo data is ready to load
3. ✅ Login page has demo button
4. 📝 Review `DEMO_GUIDE.md` for detailed script
5. 🎬 Practice the 15-minute demo flow

### For Production:
1. 📖 Read `SETUP_GUIDE.md`
2. 🔧 Set up Supabase project
3. 👤 Create real admin account
4. 🔑 Configure environment variables
5. 🌐 Deploy to hosting provider
6. 🔒 Disable demo mode (`VITE_DEMO_MODE=false`)

---

## ✅ You're Ready!

Your MediasMakers platform is configured for demonstration with:

- ✅ Password-free admin login
- ✅ 4 sample orders
- ✅ Completed audit report
- ✅ Content pack with ideas
- ✅ Growth partner client
- ✅ Professional reports
- ✅ Complete workflow

**To start demo:**
1. Load demo data (run `demo_data.sql`)
2. Go to website → Footer → Admin Login
3. Click "Enter Demo Mode"
4. Explore the platform!

Good luck with your demonstrations! 🎉

---

## 🆘 Need Help?

### Quick Fixes:
- **Demo button missing** → Check `.env` has `VITE_DEMO_MODE=true`, restart server
- **No demo data** → Run `supabase/demo_data.sql` in Supabase
- **Can't login** → Clear browser cache, try again
- **Session lost** → Click "Enter Demo Mode" again

### Documentation:
- `DEMO_GUIDE.md` — Detailed demo instructions
- `SETUP_GUIDE.md` — Production setup
- `README.md` — Project overview

---

**Built with:** React, TypeScript, Vite, Tailwind CSS, Supabase  
**Demo Mode:** Enabled ✅  
**Status:** Ready for demonstration 🚀
