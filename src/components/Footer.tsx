import { Zap, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-surface-800 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Medias<span className="text-brand-400">Makers</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
              AI-assisted social media marketing for creators, independent musicians,
              streamers, and small businesses. Based in Morocco, serving globally.
            </p>
            <div className="flex items-center gap-4 mt-4 text-sm text-zinc-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Morocco
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" /> hello@mediasmakers.com
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="/#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><Link to="/architecture" className="hover:text-white transition-colors">Architecture</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Cookie Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} MediasMakers. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Built with open-source technologies. Zero vendor lock-in.
          </p>
        </div>
      </div>
    </footer>
  );
}
