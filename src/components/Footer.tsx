import { Link } from "react-router-dom";
import { brand } from "../config/site";

const footerLinks = {
  services: [
    { to: "/creator-audit", label: "Creator Audit" },
    { to: "/creator-content-pack", label: "Content Pack" },
    { to: "/monthly-growth-partner", label: "Growth Partner" },
    { to: "/for-artists", label: "For Artists" },
  ],
  company: [
    { to: "/about", label: "About" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/contact", label: "Contact" },
    { to: "/services", label: "All Services" },
  ],
  legal: [
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/terms-of-service", label: "Terms of Service" },
    { to: "/refund-policy", label: "Refund Policy" },
    { to: "/admin/login", label: "Admin Login" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <span className="text-white font-black text-lg leading-none">M</span>
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                {brand.name}
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-4">
              AI-assisted social media marketing for creators, independent musicians,
              streamers, and small businesses. Based in Morocco, serving globally.
            </p>
            <p className="text-slate-500 text-xs">
              {brand.email}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {brand.year} {brand.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            {brand.location} · Serving creators worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
