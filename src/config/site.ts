/**
 * MediasMakers — Centralized Site Configuration
 *
 * HOW TO EDIT CONTENT:
 * ─────────────────────
 * This file controls all visible content on the website.
 * To change pricing, descriptions, features, or copy, edit the values below.
 * No other file needs to be modified for routine content updates.
 *
 * CURRENCY:
 * ─────────
 * Set defaultCurrency to "EUR" or "MAD".
 * Prices are stored in both currencies. The toggle on the pricing
 * section lets visitors switch between them.
 *
 * PRICING:
 * ────────
 * Each product has a `priceEur` and `priceMad` field.
 * Update these values to change displayed prices.
 * The `period` field controls whether the price shows as one-time or recurring.
 *
 * FEATURES:
 * ─────────
 * Each product has a `features` array. Add or remove items to change
 * what's listed. Each item is a simple string.
 *
 * AFTER EDITING:
 * ──────────────
 * Save this file. If running locally, the dev server will hot-reload.
 * To deploy, run `npm run build` and upload the `dist` folder.
 */

// ─── BRAND ────────────────────────────────────────────────────────────────────

export const brand = {
  name: "MediasMakers",
  tagline: "AI-Assisted Creator Growth & Social Media Marketing",
  email: "hello@mediasmakers.com",
  domain: "mediasmakers.com",
  location: "Morocco",
  year: new Date().getFullYear(),
};

// ─── CURRENCY ─────────────────────────────────────────────────────────────────

export type Currency = "EUR" | "MAD";

export const currencyConfig = {
  default: "EUR" as Currency,
  symbols: { EUR: "€", MAD: "MAD" },
  // Approximate conversion reference (update as needed)
  // 1 EUR ≈ 11 MAD (verify current rate before going live)
};

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  priceEur: number;
  priceMad: number;
  period: "one-time" | "/month";
  features: string[];
  deliverables: string[];
  cta: string;
  highlighted?: boolean;
}

export const products: Product[] = [
  {
    id: "creator-audit",
    slug: "creator-audit",
    name: "Creator Audit",
    shortDescription:
      "A personalized report with profile improvement recommendations, content ideas, and a seven-day action plan.",
    longDescription:
      "Our Creator Audit is a comprehensive review of your current social media presence. We analyze your profile setup, content strategy, engagement patterns, and audience positioning. You'll receive a detailed report with specific, actionable recommendations you can implement immediately — plus a seven-day action plan to start seeing improvements fast.",
    priceEur: 9,
    priceMad: 99,
    period: "one-time",
    features: [
      "Complete profile analysis across your platforms",
      "Content strategy assessment and gap identification",
      "Audience positioning review",
      "Engagement pattern analysis",
      "Competitor landscape overview",
      "Personalized improvement recommendations",
      "Seven-day action plan with daily tasks",
      "Content ideas tailored to your niche",
    ],
    deliverables: [
      "PDF audit report (10–15 pages)",
      "Seven-day action plan checklist",
      "Content ideas list (10+ ideas)",
      "Profile optimization checklist",
    ],
    cta: "Order Your Audit",
  },
  {
    id: "creator-content-pack",
    slug: "creator-content-pack",
    name: "Creator Content Pack",
    shortDescription:
      "Thirty content ideas, caption drafts, short-video hooks, calls to action, and a content calendar tailored to your niche.",
    longDescription:
      "The Creator Content Pack gives you a full month of content direction. We research your niche, identify what resonates with your target audience, and create a comprehensive content package. You get ready-to-adapt captions, video hooks that grab attention, strategic calls to action, and a full content calendar so you always know what to post next.",
    priceEur: 19,
    priceMad: 209,
    period: "one-time",
    features: [
      "30 unique content ideas for your niche",
      "Caption drafts ready to adapt and publish",
      "Short-video hooks (Reels, TikTok, Shorts)",
      "Strategic calls to action for each post",
      "Full 30-day content calendar",
      "Hashtag strategy document",
      "Visual style recommendations",
      "Platform-specific optimization tips",
      "Posting time recommendations",
    ],
    deliverables: [
      "Content calendar (30 days, visual format)",
      "30 caption drafts (editable document)",
      "Video hooks collection (15+ hooks)",
      "Hashtag strategy document",
      "Platform-specific posting guide",
    ],
    cta: "Order Your Content Pack",
    highlighted: true,
  },
  {
    id: "monthly-growth-partner",
    slug: "monthly-growth-partner",
    name: "Monthly Growth Partner",
    shortDescription:
      "A clearly defined monthly package of content planning, ready-to-publish copy, promotional concepts, and reporting.",
    longDescription:
      "The Monthly Growth Partner is our most comprehensive offering. You get a dedicated partner who understands your brand, plans your content strategy, creates ready-to-publish copy, develops promotional concepts, and tracks your progress with monthly reports. This is for creators and businesses ready to commit to consistent, strategic growth.",
    priceEur: 149,
    priceMad: 1639,
    period: "/month",
    features: [
      "Dedicated content strategy and planning",
      "Ready-to-publish copy and captions",
      "Promotional concepts and campaign ideas",
      "Monthly performance reports",
      "Content calendar management",
      "Direct communication channel",
      "Monthly strategy review call",
      "Priority support and fast turnaround",
      "Ongoing optimization based on data",
      "Competitor monitoring and insights",
    ],
    deliverables: [
      "Monthly content calendar",
      "Ready-to-publish captions and copy",
      "Promotional campaign concepts",
      "Monthly performance report",
      "Strategy review session (recorded)",
      "Ongoing recommendations and adjustments",
    ],
    cta: "Start Growing",
  },
];

// ─── HOMEPAGE CONTENT ─────────────────────────────────────────────────────────

export const homeContent = {
  hero: {
    headline: "Grow Your Audience.\nBuild Your Brand.",
    subheadline:
      "MediasMakers helps creators, independent musicians, streamers, and small businesses grow their social media presence with AI-assisted strategies and expert guidance.",
    cta: "See Our Services",
    secondaryCta: "How It Works",
  },

  problems: {
    title: "The Problems We Solve",
    subtitle:
      "Growing on social media shouldn't require a marketing degree or an agency retainer.",
    items: [
      {
        title: "You don't know what to post",
        description:
          "Staring at a blank screen every day, wondering what content will actually resonate with your audience.",
      },
      {
        title: "Your profile isn't converting",
        description:
          "People visit your page but don't follow, buy, or engage. Something in your setup is holding you back.",
      },
      {
        title: "You're posting inconsistently",
        description:
          "Some weeks you're active, others you disappear. Without a plan, consistency is nearly impossible.",
      },
      {
        title: "Agencies are too expensive",
        description:
          "Professional marketing services cost thousands per month — out of reach for independent creators and small businesses.",
      },
    ],
  },

  howItWorks: {
    title: "How It Works",
    subtitle: "A simple process designed to deliver real value quickly.",
    steps: [
      {
        number: "01",
        title: "Tell Us About You",
        description:
          "Fill out a brief intake form about your brand, goals, platforms, and audience. The more detail you share, the more tailored your deliverables will be.",
      },
      {
        number: "02",
        title: "We Analyze & Create",
        description:
          "Using AI-assisted workflows and human expertise, we research your niche, analyze your current presence, and create your customized deliverables.",
      },
      {
        number: "03",
        title: "You Receive & Implement",
        description:
          "Get your report, content pack, or monthly plan delivered to your inbox. Start implementing the recommendations and watch your strategy come together.",
      },
    ],
  },

  benefits: {
    title: "Built for Creators, Musicians & Businesses",
    subtitle: "Whatever your creative path, we have you covered.",
    groups: [
      {
        title: "For Creators",
        items: [
          "Content ideas that match your voice",
          "Profile optimization for discoverability",
          "Posting schedules that build consistency",
          "Engagement strategies that feel authentic",
        ],
      },
      {
        title: "For Musicians",
        items: [
          "Release promotion strategies",
          "Fan engagement content plans",
          "Platform-specific music marketing",
          "Visual identity recommendations",
        ],
      },
      {
        title: "For Small Businesses",
        items: [
          "Brand-aware content frameworks",
          "Customer acquisition strategies",
          "Local and international reach tactics",
          "Budget-friendly marketing approaches",
        ],
      },
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        q: "How quickly will I receive my deliverables?",
        a: "Creator Audits are typically delivered within 3–5 business days. Content Packs within 5–7 business days. Growth Partner plans begin with an onboarding call in the first week, with ongoing deliverables throughout the month.",
      },
      {
        q: "Do you guarantee follower growth or sales?",
        a: "No. We don't make guarantees about specific growth numbers or sales results. What we do guarantee is professional-quality deliverables, actionable recommendations, and honest communication. Your results depend on many factors including your niche, consistency, and audience — we help you build the strategy and provide the tools.",
      },
      {
        q: "What platforms do you work with?",
        a: "We primarily focus on Instagram, TikTok, YouTube, and Twitter/X. We can also provide guidance for Facebook, LinkedIn, and other platforms depending on your needs. Let us know your primary platforms when you order.",
      },
      {
        q: "Can I upgrade from a Creator Audit to a Content Pack?",
        a: "Absolutely. Many clients start with an audit to understand their current position, then move to a Content Pack or Growth Partner plan. We'll apply insights from your audit to make your next package even more targeted.",
      },
      {
        q: "What information do you need from me?",
        a: "We'll ask about your brand, target audience, current platforms, goals, content preferences, and any specific challenges you're facing. The intake form covers everything — it takes about 10 minutes to complete.",
      },
      {
        q: "Do you offer refunds?",
        a: "Yes. See our Refund and Cancellation Policy for full details. In short: if you're not satisfied with the quality of our deliverables, we'll work with you to make it right or provide a refund.",
      },
      {
        q: "What currencies do you accept?",
        a: "We display prices in EUR and MAD (Moroccan Dirham). Payment processing will be set up to accept major currencies. Contact us if you need a custom arrangement.",
      },
      {
        q: "Is my information kept confidential?",
        a: "Yes. We treat all client information as confidential. We don't share your data, strategies, or content with third parties. See our Privacy Policy for full details.",
      },
    ],
  },
};

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────

export const servicesContent = {
  hero: {
    title: "Our Services",
    subtitle:
      "Three focused products designed to deliver real value at every stage of your creator journey. Start small or go all-in.",
  },
};

// ─── HOW IT WORKS PAGE ────────────────────────────────────────────────────────

export const howItWorksContent = {
  hero: {
    title: "How It Works",
    subtitle:
      "Our process is simple, transparent, and designed to deliver results you can actually use.",
  },
  steps: [
    {
      number: "01",
      title: "Choose Your Package",
      description:
        "Browse our three products and select the one that matches your current needs. Not sure? Start with a Creator Audit — it's the best way to understand where you stand.",
    },
    {
      number: "02",
      title: "Complete the Intake Form",
      description:
        "After ordering, you'll receive a detailed intake form. Tell us about your brand, audience, platforms, goals, and challenges. The more context you provide, the more tailored your deliverables will be.",
    },
    {
      number: "03",
      title: "We Get to Work",
      description:
        "Our team uses AI-assisted research and human expertise to analyze your presence, identify opportunities, and create your customized deliverables. Every piece of content is reviewed by a human before delivery.",
    },
    {
      number: "04",
      title: "Receive Your Deliverables",
      description:
        "Your report, content pack, or monthly plan is delivered directly to your inbox in professional, easy-to-use formats. Everything is ready to implement.",
    },
    {
      number: "05",
      title: "Implement & Grow",
      description:
        "Start using your recommendations and content. For Growth Partner clients, we continue working with you throughout the month, adjusting strategy based on what's working.",
    },
  ],
  expectations: {
    title: "What to Expect",
    items: [
      "Clear communication at every step",
      "Professional-quality deliverables",
      "Actionable recommendations you can implement immediately",
      "Honest assessment — we'll tell you what works and what doesn't",
      "Responsive support for any questions",
    ],
  },
};

// ─── FOR ARTISTS PAGE ─────────────────────────────────────────────────────────

export const forArtistsContent = {
  hero: {
    title: "For Artists & Musicians",
    subtitle:
      "Your music deserves to be heard. We help you build the social media presence that connects your art with the audience it deserves.",
  },
  challenges: [
    {
      title: "You make great music but struggle with marketing",
      description:
        "Creating art and promoting it are completely different skills. Most musicians didn't study marketing — and that's okay. That's what we're here for.",
    },
    {
      title: "You don't know how to promote releases",
      description:
        "Dropping a track without a promotion plan is like throwing a party without sending invitations. We help you build release strategies that build anticipation and drive listens.",
    },
    {
      title: "Social media feels inauthentic",
      description:
        "You want to connect with fans, not feel like a salesperson. We help you find the balance between promotion and genuine connection.",
    },
  ],
  whatWeOffer: [
    "Release promotion strategies and timelines",
    "Content ideas that showcase your personality and music",
    "Fan engagement tactics that build community",
    "Platform-specific strategies for music discovery",
    "Visual identity and branding recommendations",
    "Collaboration and networking approaches",
    "Content calendars built around your release schedule",
    "Short-form video concepts for TikTok and Reels",
  ],
};

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────

export const aboutContent = {
  hero: {
    title: "About MediasMakers",
    subtitle:
      "We're building the marketing partner we wish existed when we started out.",
  },
  story: {
    title: "Our Story",
    paragraphs: [
      "MediasMakers was born from a simple observation: creators, musicians, and small businesses need professional social media marketing, but traditional agencies are built for companies with big budgets. Independent creators were left figuring it out alone.",
      "We believe that shouldn't be the case. Quality marketing strategy and content planning should be accessible to everyone building something meaningful online — not just those who can afford €2,000/month retainers.",
      "Based in Morocco and serving clients internationally, MediasMakers combines AI-assisted workflows with human expertise to deliver professional-quality marketing support at prices that make sense for independent creators and small businesses.",
    ],
  },
  values: [
    {
      title: "Honesty First",
      description:
        "We don't promise guaranteed results or fabricated success stories. We deliver quality work and let the results speak for themselves.",
    },
    {
      title: "Accessible Pricing",
      description:
        "Professional marketing shouldn't require a corporate budget. Our pricing is designed for independent creators and small businesses.",
    },
    {
      title: "Real Expertise",
      description:
        "Every deliverable is reviewed by a human. AI helps us work faster and more efficiently, but quality control is always human.",
    },
    {
      title: "Global Perspective",
      description:
        "Based in Morocco, serving the world. We understand both local and international markets and can help you reach audiences wherever they are.",
    },
  ],
};

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────

export const contactContent = {
  hero: {
    title: "Get in Touch",
    subtitle:
      "Have a question about our services? Want to discuss a custom project? We'd love to hear from you.",
  },
  info: [
    { label: "Email", value: "hello@mediasmakers.com" },
    { label: "Location", value: "Morocco" },
    { label: "Response Time", value: "Within 24–48 hours" },
  ],
  form: {
    name: "Your Name",
    email: "Your Email",
    subject: "Subject",
    message: "Your Message",
    submit: "Send Message",
    subjects: [
      "General Inquiry",
      "Creator Audit Question",
      "Content Pack Question",
      "Growth Partner Question",
      "Custom Project",
      "Partnership Opportunity",
      "Other",
    ],
  },
};

// ─── LEGAL PAGES ──────────────────────────────────────────────────────────────

export const legalContent = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "2025-01-01",
    sections: [
      {
        heading: "Introduction",
        content:
          "MediasMakers (\"we,\" \"our,\" or \"us\") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our website and services.",
      },
      {
        heading: "Information We Collect",
        content:
          "We collect information you provide directly, including your name, email address, and any details you share through our intake forms and contact forms. We may also collect basic usage data such as pages visited and browser type through privacy-respecting analytics.",
      },
      {
        heading: "How We Use Your Information",
        content:
          "We use your information to: deliver the services you've ordered, communicate with you about your orders, respond to your inquiries, improve our services, and comply with legal obligations. We do not sell your personal data to third parties.",
      },
      {
        heading: "Data Sharing",
        content:
          "We do not share your personal data with third parties except: when necessary to deliver our services (e.g., payment processors), when required by law, or with your explicit consent. Any third-party service providers we use are bound by confidentiality agreements.",
      },
      {
        heading: "Data Security",
        content:
          "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
      },
      {
        heading: "Data Retention",
        content:
          "We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including any legal, accounting, or reporting requirements. You may request deletion of your data at any time by contacting us.",
      },
      {
        heading: "Your Rights",
        content:
          "Depending on your location, you may have rights to access, correct, delete, or port your personal data. You may also have the right to restrict or object to certain processing. To exercise these rights, contact us at hello@mediasmakers.com.",
      },
      {
        heading: "Cookies",
        content:
          "Our website uses minimal cookies necessary for basic functionality. We do not use advertising cookies or third-party tracking cookies. You can control cookie settings through your browser.",
      },
      {
        heading: "Changes to This Policy",
        content:
          "We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.",
      },
      {
        heading: "Contact Us",
        content: `If you have questions about this privacy policy or our data practices, contact us at:\n\nEmail: ${brand.email}\nDomain: ${brand.domain}`,
      },
    ],
  },

  terms: {
    title: "Terms of Service",
    lastUpdated: "2025-01-01",
    sections: [
      {
        heading: "Acceptance of Terms",
        content:
          "By accessing or using MediasMakers services, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services.",
      },
      {
        heading: "Services Description",
        content:
          "MediasMakers provides social media marketing services including profile audits, content packs, and ongoing growth partnerships. Specific deliverables are described on our website and confirmed at the time of order.",
      },
      {
        heading: "Orders and Payment",
        content:
          "All orders are subject to availability and acceptance. Prices are displayed in EUR and MAD and are subject to change without notice, though confirmed orders will be honored at the price at time of purchase. Payment terms are specified at checkout.",
      },
      {
        heading: "Delivery Timelines",
        content:
          "We strive to deliver all products within the timeframes stated on our website. Delivery times are estimates and may vary based on order volume and complexity. We will communicate any significant delays promptly.",
      },
      {
        heading: "No Guaranteed Results",
        content:
          "MediasMakers provides strategy, content, and recommendations. We do not guarantee specific results including but not limited to follower counts, engagement rates, revenue, or sales. Your results depend on many factors outside our control.",
      },
      {
        heading: "Intellectual Property",
        content:
          "Upon full payment, you receive the rights to use the deliverables created for you. MediasMakers retains the right to use general methodologies, frameworks, and approaches. We do not claim ownership of your brand, content, or business information.",
      },
      {
        heading: "Client Responsibilities",
        content:
          "You are responsible for: providing accurate information in intake forms, reviewing deliverables promptly, implementing recommendations in a timely manner, and ensuring any content you publish complies with applicable laws and platform policies.",
      },
      {
        heading: "Limitation of Liability",
        content:
          "MediasMakers shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific service in question.",
      },
      {
        heading: "Termination",
        content:
          "Either party may terminate a monthly Growth Partner agreement with 30 days written notice. One-time service orders cannot be cancelled once work has begun, subject to our Refund and Cancellation Policy.",
      },
      {
        heading: "Governing Law",
        content:
          "These terms are governed by the laws of Morocco. Any disputes shall be resolved through good-faith negotiation first, and if necessary, through the courts of competent jurisdiction in Morocco.",
      },
      {
        heading: "Changes to Terms",
        content:
          "We reserve the right to modify these terms at any time. Changes will be posted on this page. Continued use of our services after changes constitutes acceptance of the updated terms.",
      },
      {
        heading: "Contact",
        content: `For questions about these terms, contact us at:\n\nEmail: ${brand.email}\nDomain: ${brand.domain}`,
      },
    ],
  },

  refund: {
    title: "Refund and Cancellation Policy",
    lastUpdated: "2025-01-01",
    sections: [
      {
        heading: "Our Commitment",
        content:
          "We want every client to be satisfied with their purchase. If you're not happy with our deliverables, we'll work with you to make it right.",
      },
      {
        heading: "Refund Eligibility",
        content:
          "Refund requests for one-time products (Creator Audit and Creator Content Pack) may be submitted within 14 days of delivery if you are genuinely dissatisfied with the quality of the work. We review each request individually.",
      },
      {
        heading: "Refund Process",
        content:
          "To request a refund, email us at hello@mediasmakers.com with your order details and a description of the issue. We will respond within 48 hours and work toward a resolution, which may include revisions, partial refund, or full refund depending on the circumstances.",
      },
      {
        heading: "Monthly Growth Partner",
        content:
          "Monthly Growth Partner subscriptions can be cancelled with 30 days written notice. You will continue to receive services for the remainder of the paid period. Refunds for partial months are not provided, but you may discuss options with us if you have concerns about service quality.",
      },
      {
        heading: "Non-Refundable Situations",
        content:
          "Refunds are generally not provided if: the deliverables were completed as specified, you provided incomplete or inaccurate information in your intake form, or more than 14 days have passed since delivery for one-time products.",
      },
      {
        heading: "Revisions",
        content:
          "Before requesting a refund, consider asking for revisions. We're happy to adjust our deliverables to better meet your needs. One round of reasonable revisions is included with every order.",
      },
      {
        heading: "Contact",
        content: `For refund requests or questions about this policy:\n\nEmail: ${brand.email}\nWe aim to respond within 48 hours.`,
      },
    ],
  },
};

// ─── 404 PAGE ─────────────────────────────────────────────────────────────────

export const notFoundContent = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist or has been moved.",
  cta: "Go to Homepage",
};
