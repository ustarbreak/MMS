# MediasMakers 2.0 — Public Website

AI-assisted creator growth and social media marketing platform.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## How to Edit Content

**All editable content is in a single file: `src/config/site.ts`**

This file contains:
- Brand information (name, email, domain)
- Product pricing (EUR and MAD)
- Product descriptions and features
- Homepage copy (hero, problems, how it works, benefits, FAQ)
- Services page content
- How It Works page content
- For Artists page content
- About page content
- Contact page content
- Legal pages (Privacy, Terms, Refund Policy)

### Changing Prices

Find the `products` array in `src/config/site.ts`. Each product has:
- `priceEur` — price in Euros
- `priceMad` — price in Moroccan Dirhams
- `period` — "one-time" or "/month"

### Changing Descriptions

Each product has:
- `shortDescription` — shown on cards
- `longDescription` — shown on product detail pages
- `features` — bullet points (add/remove items)
- `deliverables` — what the client receives

### Changing Homepage Copy

Find `homeContent` in the config file. Sections include:
- `hero` — headline and subheadline
- `problems` — problems we solve
- `howItWorks` — process steps
- `benefits` — audience-specific benefits
- `faq` — frequently asked questions

### Changing Legal Pages

Find `legalContent` in the config file. Each page has:
- `title` — page title
- `lastUpdated` — date string
- `sections` — array of {heading, content} pairs

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/services` | Services overview |
| `/creator-audit` | Creator Audit product page |
| `/creator-content-pack` | Content Pack product page |
| `/monthly-growth-partner` | Growth Partner product page |
| `/for-artists` | For Artists & Musicians |
| `/how-it-works` | How It Works |
| `/about` | About MediasMakers |
| `/contact` | Contact form |
| `/privacy-policy` | Privacy Policy |
| `/terms-of-service` | Terms of Service |
| `/refund-policy` | Refund and Cancellation Policy |

## Technology Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS v4** (styling)
- **React Router** (client-side routing)
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Deployment

### Cloudflare Pages (Recommended — Free)

1. Push code to GitHub
2. Connect repo to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

### Vercel (Free)

1. Push code to GitHub
2. Import project in Vercel
3. Framework preset: Vite
4. Deploy

### Netlify (Free)

1. Push code to GitHub
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

## Important Notes

- **No payment processing** is implemented yet. Contact forms are functional but need a backend or service (Formspree, etc.) to actually send emails.
- **No fake testimonials or statistics** are used anywhere on the site.
- **Pricing is configurable** — edit `src/config/site.ts` to change.
- **Currency toggle** lets visitors switch between EUR and MAD.
- **The site is fully static** — no database or server required for the public pages.

## File Structure

```
src/
├── config/
│   └── site.ts          ← ALL EDITABLE CONTENT
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PageHero.tsx
│   ├── CTASection.tsx
│   ├── FAQSection.tsx
│   ├── ProductCard.tsx
│   ├── ProductPage.tsx
│   ├── CurrencyToggle.tsx
│   └── LegalPage.tsx
├── pages/
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── CreatorAudit.tsx
│   ├── CreatorContentPack.tsx
│   ├── MonthlyGrowthPartner.tsx
│   ├── ForArtists.tsx
│   ├── HowItWorks.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── PrivacyPolicy.tsx
│   ├── TermsOfService.tsx
│   ├── RefundPolicy.tsx
│   └── NotFound.tsx
├── App.tsx              ← Route definitions
├── main.tsx             ← Entry point
└── index.css            ← Global styles + Tailwind
```

## Known Limitations

1. Contact form doesn't actually send emails — needs Formspree or similar integration
2. No payment processing — CTAs link to contact page
3. No CMS — all content changes require editing the config file and redeploying
4. No authentication or admin panel
5. No analytics configured — add Plausible or Umami for privacy-friendly tracking

## Next Steps

- [ ] Set up Formspree or similar for contact form
- [ ] Configure payment processing (Stripe/PayPal)
- [ ] Add analytics (Plausible, Umami)
- [ ] Add multi-language support (French, Arabic)
- [ ] Set up email notifications for new orders
- [ ] Create client intake form system
- [ ] Build deliverable generation workflow
