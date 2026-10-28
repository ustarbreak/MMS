import { motion } from "framer-motion";
import {
  Server,
  Database,
  Globe,
  Shield,
  Code,
  Layers,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  FolderTree,
  Rocket,
  DollarSign,
} from "lucide-react";

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation (Week 1-2)",
    tasks: [
      "Set up project repository and CI/CD pipeline",
      "Deploy landing page to Cloudflare Pages or Vercel",
      "Configure domain mediasmakers.com DNS",
      "Implement pricing display with EUR/MAD toggle",
      "Add contact form (static → email via Formspree free tier or similar)",
      "Set up basic analytics (Plausible or Umami — privacy-friendly)",
    ],
  },
  {
    phase: "Phase 2",
    title: "Service Delivery (Week 3-4)",
    tasks: [
      "Build Creator Audit intake form and delivery template",
      "Create Content Pack delivery system (PDF/document generator)",
      "Set up client communication workflow (email or messaging)",
      "Implement order tracking (simple database or spreadsheet-based)",
      "Add payment collection (Stripe if available, or manual invoicing)",
    ],
  },
  {
    phase: "Phase 3",
    title: "Growth & Automation (Month 2+)",
    tasks: [
      "Add client dashboard for Growth Partner subscribers",
      "Implement AI content generation workflow (admin-side, manual review)",
      "Build performance tracking and reporting tools",
      "Add multi-language support (French, Arabic, English)",
      "Integrate social media analytics APIs where feasible",
    ],
  },
];

const stackItems = [
  {
    category: "Frontend",
    items: ["React 18 + TypeScript", "Vite (build tool)", "Tailwind CSS v4", "Framer Motion (animations)"],
    reasoning: "Fast, modern, excellent developer experience. Static site generation means zero server costs for the frontend.",
  },
  {
    category: "Backend (when needed)",
    items: ["Node.js + Express or Fastify", "Or: Cloudflare Workers (free tier: 100k req/day)", "Or: Supabase Edge Functions"],
    reasoning: "Start with a static site. Add serverless functions only when you need form processing, payments, or dynamic content.",
  },
  {
    category: "Database (when needed)",
    items: ["Supabase (PostgreSQL, free tier: 500MB)", "Or: Turso (SQLite, free tier: 9GB)", "Or: PlanetScale/Neon (free tiers available)"],
    reasoning: "Only add a database when you need persistent data (orders, clients, analytics). Start without one.",
  },
  {
    category: "Hosting & Deployment",
    items: ["Cloudflare Pages (unlimited bandwidth, free)", "Or: Vercel (free tier: 100GB bandwidth)", "Or: Netlify (free tier: 100GB bandwidth)"],
    reasoning: "All offer generous free tiers. Cloudflare Pages has the best bandwidth allowance. Zero cost for moderate traffic.",
  },
  {
    category: "AI Workflows",
    items: ["Admin-side content generation", "Manual review before delivery", "Template-based outputs", "No paid AI API required initially"],
    reasoning: "Generate AI content using available tools, review manually, then deliver to clients. Avoids API costs while maintaining quality.",
  },
];

const hostingComparison = [
  { name: "Cloudflare Pages", free: "Unlimited bandwidth, 500 builds/mo", limit: "Functions: 100k req/day", best: "Best overall free option" },
  { name: "Vercel", free: "100GB bandwidth, unlimited builds", limit: "Serverless: 100GB-hrs", best: "Best for Next.js projects" },
  { name: "Netlify", free: "100GB bandwidth, 300 build min/mo", limit: "Functions: 125k req/mo", best: "Good all-rounder" },
  { name: "GitHub Pages", free: "100GB bandwidth", limit: "Static only, no serverless", best: "Simplest static hosting" },
];

const risks = [
  {
    risk: "Vendor lock-in",
    mitigation: "Use standard technologies (React, TypeScript, SQL). Avoid proprietary APIs. Keep deployment configs portable.",
  },
  {
    risk: "Free tier changes",
    mitigation: "Monitor provider announcements. Keep infrastructure simple enough to migrate quickly. Never rely on a single free service.",
  },
  {
    risk: "Secrets exposure",
    mitigation: "Never put API keys in frontend code. Use environment variables on the server side. Use .env files locally, never commit them.",
  },
  {
    risk: "Data loss",
    mitigation: "Keep code in Git (GitHub free). Back up database regularly. Use version control for all content and configurations.",
  },
  {
    risk: "Performance issues",
    mitigation: "Static-first approach. Use CDN for all assets. Optimize images. Lazy-load non-critical content.",
  },
];

export default function Architecture() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-16 relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600/10 border border-brand-500/20 text-brand-300 text-sm mb-4">
              <Layers className="w-3.5 h-3.5" />
              Technical Documentation
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Architecture Proposal
            </h1>
            <p className="text-zinc-400 max-w-3xl leading-relaxed">
              This document presents the recommended technology stack, hosting strategy,
              data model, and deployment plan for MediasMakers 2.0. Every decision
              prioritizes zero initial cost, maintainability, and avoiding vendor lock-in.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-brand-400" />
              Design Principles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Zero Cost Start", desc: "Every component runs on free tiers. No paid services required to launch." },
                { title: "Static First", desc: "Frontend is a static site. Add server components only when needed." },
                { title: "No Vendor Lock-in", desc: "Standard technologies. Portable configurations. Easy to migrate." },
                { title: "Security by Default", desc: "No secrets in frontend. HTTPS everywhere. Minimal attack surface." },
                { title: "Progressive Complexity", desc: "Start simple. Add features only when revenue justifies the cost." },
                { title: "Transparent Operations", desc: "No fake testimonials. No fabricated stats. Honest communication." },
              ].map((p, i) => (
                <div key={i} className="bg-surface-700/50 border border-white/5 rounded-xl p-5">
                  <h3 className="text-white font-semibold text-sm mb-1">{p.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Code className="w-6 h-6 text-brand-400" />
              Recommended Technology Stack
            </h2>
            <div className="space-y-6">
              {stackItems.map((stack, i) => (
                <div key={i} className="bg-surface-700/50 border border-white/5 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3">{stack.category}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {stack.items.map((item, j) => (
                      <span key={j} className="px-3 py-1 bg-surface-600 text-zinc-300 text-xs rounded-lg border border-white/5">
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    <strong className="text-zinc-400">Why:</strong> {stack.reasoning}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hosting Comparison */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6 text-brand-400" />
              Hosting Comparison (Free Tiers)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Provider</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Free Tier</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Limits</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {hostingComparison.map((h, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white font-medium">{h.name}</td>
                      <td className="py-3 px-4 text-zinc-400">{h.free}</td>
                      <td className="py-3 px-4 text-zinc-500 text-xs">{h.limit}</td>
                      <td className="py-3 px-4 text-brand-300 text-xs">{h.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-zinc-500 mt-4">
              <strong>Note:</strong> Free tiers may change. These limits were verified as of the proposal date.
              Always check current pricing before committing. None of these require a credit card for the free tier.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Folder Structure */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FolderTree className="w-6 h-6 text-brand-400" />
              Proposed Folder Structure
            </h2>
            <div className="bg-surface-700/50 border border-white/5 rounded-xl p-6 font-mono text-sm">
              <pre className="text-zinc-300 overflow-x-auto">{`mediasmakers/
├── public/                  # Static assets (images, favicon)
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PricingCard.tsx
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── Home.tsx
│   │   ├── Architecture.tsx
│   │   └── ...
│   ├── lib/                 # Utility functions
│   │   ├── pricing.ts       # Price configuration
│   │   └── ...
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles + Tailwind
├── index.html               # HTML template
├── package.json
├── vite.config.ts           # Vite configuration
├── tsconfig.json
├── tailwind.config.ts       # Tailwind configuration
├── .env.example             # Environment variables template
├── .gitignore
└── README.md                # Setup & deployment instructions`}</pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Data Model */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Database className="w-6 h-6 text-brand-400" />
              Data Model (Phase 2+)
            </h2>
            <p className="text-zinc-400 text-sm mb-4">
              The initial launch does not require a database. When you need persistent
              data (orders, clients, content), here's the proposed schema:
            </p>
            <div className="bg-surface-700/50 border border-white/5 rounded-xl p-6 font-mono text-sm">
              <pre className="text-zinc-300 overflow-x-auto">{`-- Clients table
CREATE TABLE clients (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   UUID REFERENCES clients(id),
  product     TEXT NOT NULL,        -- 'audit', 'content_pack', 'growth_partner'
  amount_eur  DECIMAL(10,2),
  amount_mad  DECIMAL(10,2),
  status      TEXT DEFAULT 'pending', -- pending, paid, delivered, cancelled
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Deliverables table
CREATE TABLE deliverables (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID REFERENCES orders(id),
  type        TEXT NOT NULL,        -- 'audit_report', 'content_pack', 'monthly_report'
  content     JSONB,                -- Flexible content storage
  file_url    TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Pricing config (admin-managed)
CREATE TABLE pricing (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product     TEXT UNIQUE NOT NULL,
  price_eur   DECIMAL(10,2),
  price_mad   DECIMAL(10,2),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);`}</pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security & Risks */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              Security Risks & Mitigations
            </h2>
            <div className="space-y-4">
              {risks.map((r, i) => (
                <div key={i} className="bg-surface-700/50 border border-white/5 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">{r.risk}</h3>
                      <p className="text-zinc-400 text-xs leading-relaxed">
                        <strong className="text-zinc-300">Mitigation:</strong> {r.mitigation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Requires Payment */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              What's Free vs. What Costs Money
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-900/10 border border-green-500/20 rounded-xl p-6">
                <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Free (No Payment Required)
                </h3>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li>• Frontend hosting (Cloudflare Pages / Vercel)</li>
                  <li>• Domain DNS management</li>
                  <li>• Git repository (GitHub free)</li>
                  <li>• Build and deployment automation</li>
                  <li>• Basic analytics (Plausible self-hosted / Umami)</li>
                  <li>• Contact forms (Formspree free: 50 submissions/mo)</li>
                  <li>• Database (Supabase free: 500MB)</li>
                  <li>• AI content generation (manual workflow)</li>
                </ul>
              </div>
              <div className="bg-amber-900/10 border border-amber-500/20 rounded-xl p-6">
                <h3 className="text-amber-400 font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  May Require Payment Later
                </h3>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li>• Domain registration (~€10/year)</li>
                  <li>• Payment processing (Stripe: 2.9% + €0.30/tx)</li>
                  <li>• Email sending (Resend free: 3000/mo, then paid)</li>
                  <li>• AI API access (if automating content generation)</li>
                  <li>• Database scaling (if exceeding free tier limits)</li>
                  <li>• Custom email hosting</li>
                  <li>• Social media API access (some require business accounts)</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Implementation Phases */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Rocket className="w-6 h-6 text-brand-400" />
              Implementation Phases
            </h2>
            <div className="space-y-6">
              {phases.map((phase, i) => (
                <div key={i} className="bg-surface-700/50 border border-white/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-brand-600/20 text-brand-300 text-xs font-medium rounded-full border border-brand-500/20">
                      {phase.phase}
                    </span>
                    <h3 className="text-white font-semibold">{phase.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {phase.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-zinc-400">
                        <CheckCircle className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <ArrowRight className="w-6 h-6 text-brand-400" />
              Exact Next Steps to Start Implementation
            </h2>
            <div className="bg-surface-700/50 border border-brand-500/20 rounded-xl p-6">
              <ol className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Register domain mediasmakers.com",
                    detail: "Use any registrar (Namecheap, Cloudflare Registrar). Cost: ~€10/year. Point DNS to Cloudflare Pages.",
                    action: "You need to do this",
                  },
                  {
                    step: "2",
                    title: "Create GitHub repository",
                    detail: "Free account at github.com. Create a new repo called 'mediasmakers'. Push the project code.",
                    action: "You need to do this",
                  },
                  {
                    step: "3",
                    title: "Deploy to Cloudflare Pages",
                    detail: "Connect GitHub repo to Cloudflare Pages. Set build command to 'npm run build' and output to 'dist'. Free, automatic deploys on every push.",
                    action: "You need to do this",
                  },
                  {
                    step: "4",
                    title: "Set up contact form",
                    detail: "Create a free Formspree account (50 submissions/month free). Add form endpoint to the contact section.",
                    action: "You need to do this",
                  },
                  {
                    step: "5",
                    title: "Configure payment collection",
                    detail: "Option A: Stripe account (requires business verification). Option B: Manual PayPal invoicing. Option C: Local bank transfer for Moroccan clients.",
                    action: "You need to do this",
                  },
                  {
                    step: "6",
                    title: "Launch and iterate",
                    detail: "The website is live. Start accepting orders manually. Use revenue to justify adding automation and paid services.",
                    action: "Automatic after deployment",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-300 text-sm font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                      <p className="text-zinc-400 text-xs mt-1">{item.detail}</p>
                      <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded ${
                        item.action === "You need to do this"
                          ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                          : "bg-green-500/10 text-green-300 border border-green-500/20"
                      }`}>
                        {item.action}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 p-4 bg-surface-600/50 border border-white/5 rounded-xl">
              <p className="text-sm text-zinc-400">
                <strong className="text-white">Important:</strong> Steps 1-5 require you to create
                accounts on external services. I will guide you through each one. None of them
                require a credit card for the free tier. The domain registration (~€10/year) is
                the only upfront cost.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Without External APIs */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Server className="w-6 h-6 text-brand-400" />
              What Works Without External APIs
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Full landing page with all content",
                "Pricing display with currency toggle",
                "Contact form (via Formspree free tier)",
                "Service descriptions and documentation",
                "Client intake forms",
                "PDF/document generation for deliverables",
                "Admin-side AI content generation workflow",
                "Manual review and quality control",
                "Email-based client communication",
                "Spreadsheet-based order tracking",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
